<template>
  <v-row justify="center" align="center">
    <ImageUpload />
  </v-row>
</template>

<script>
import ImageUpload from '../../components/Upload/ImageUpload.vue'

export default {
  components: {
    ImageUpload
  },
  middleware: "isAuthenticated"
}
</script>