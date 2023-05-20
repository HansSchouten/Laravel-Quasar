<template>
  <div>
    <general/>
    <password/>
  </div>
</template>

<script>
import General from './General.vue'
import Password from './Password.vue'

export default {
  components: { Password, General },
  middleware: 'auth',
  title: 'Settings'
}
</script>
