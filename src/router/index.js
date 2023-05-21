import { route } from 'quasar/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useLayoutStore } from 'stores/layout'

// The middleware for every page of the application.
const globalMiddleware = ['check-auth']

// Load middleware modules dynamically.
const routeMiddleware = resolveMiddleware(
  require.context('../middleware', false, /.*\.js$/)
)

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach(beforeEach)
  Router.afterEach(afterEach)

  async function beforeEach(to, from, next) {
    let components = await resolveComponents(
      to.matched.flatMap((record) => {
        return Object.values(record.components)
      })
    )
    components = components.flatMap((component) => {
      return component.default ? component.default : component
    })

    if (components.length === 0) {
      return next()
    }

    /*
    // Start the loading bar.
    if (components[components.length - 1].loading !== false) {
      console.log(Router.app.component.$loading);
      setTimeout(() => Router.app.$loading.start())
      Router.app.$nextTick(() => Router.app.$loading.start())
    }
    */

    const middleware = getMiddleware(components)

    // Call each middleware.
    await callMiddleware(middleware, to, from, (...args) => {
      // Set the application layout only if "next()" was called with no args.
      if (args.length === 0) {
        const layoutStore = useLayoutStore()
        layoutStore.setLayout(components[0].layout || '')
      }
      if (components[0].title) {
        document.title = $t(components[0].title) + ' · ' + window.appName
      } else {
        document.title = window.appName
      }

      next(...args)
    })
  }

  async function afterEach(to, from, next) {}

  async function callMiddleware(middleware, to, from, next) {
    const stack = middleware.reverse()

    const _next = async (...args) => {
      // Stop if "_next" was called with an argument or the stack is empty.
      if (args.length > 0 || stack.length === 0) {
        if (args.length > 0) {
          //Router.app.$loading.finish()
        }

        return next(...args)
      }

      const middleware = stack.pop()

      if (typeof middleware === 'function') {
        await middleware(to, from, _next)
      } else if (routeMiddleware[middleware]) {
        await routeMiddleware[middleware](to, from, _next)
      } else {
        throw Error(`Undefined middleware [${middleware}]`)
      }
    }

    await _next()
  }

  function resolveComponents(components) {
    return Promise.all(
      components.map((component) => {
        return typeof component === 'function' ? component() : component
      })
    )
  }

  function getMiddleware(components) {
    const middleware = [...globalMiddleware]
    components
      .filter((c) => c.middleware)
      .forEach((component) => {
        if (Array.isArray(component.middleware)) {
          middleware.push(...component.middleware)
        } else {
          middleware.push(component.middleware)
        }
      })
    return middleware
  }

  return Router
})

function resolveMiddleware(requireContext) {
  return requireContext
    .keys()
    .map((file) => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
    .reduce(
      (guards, [name, guard]) => ({ ...guards, [name]: guard.default }),
      {}
    )
}
