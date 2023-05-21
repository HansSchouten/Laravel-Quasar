<template>
  <div
    v-if="form.errors.has(field)"
    class="invalid-feedback d-block"
    v-html="errorHtml"
  />
</template>

<script>
export default {
  name: 'HasError',

  props: {
    form: {
      type: Object,
      required: true,
    },

    field: {
      type: String,
      required: true,
    },
  },

  computed: {
    errorHtml() {
      let serverMessage = this.form.errors.get(this.field)
      let fieldNameCapitalized = this.field.charAt(0).toUpperCase() + this.field.slice(1)
      let fieldNameTranslation = this.$t(fieldNameCapitalized).toLowerCase()
      if (fieldNameTranslation.indexOf(' ') >= 0) {
        fieldNameTranslation = '"' + fieldNameTranslation + '"'
      }
      return serverMessage.replace(this.field, fieldNameTranslation)
    },
  },
}
</script>
