<template>
  <div
    class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 20vh">404</div>

      <div class="text-h2" style="opacity: 0.6">
        {{ $t('Oops, this page cannot be found') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        :label="$t('Go back home')"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
}
</script>
