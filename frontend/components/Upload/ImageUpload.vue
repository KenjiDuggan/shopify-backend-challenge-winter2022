<template>
  <v-container
    grid-list-md
    text-xs-center
    fill-height>
    <v-layout
      row
      wrap
      align-center>
      <v-flex
        xs6
        offset-xs3>
          <v-file-input
            v-model="image"
            accept="jpg"
            label="File input"
            filled
            prepend-icon="mdi-camera"
          ></v-file-input>
        <v-btn
          class="upload-button"
          color="indigo"
          @click="uploadImage">
          Upload Image
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
        image: ''
    }
  },
  methods: {
    async uploadImage() {
        const data = new FormData();
        data.append("image", this.image);
        data.append("extension", ".jpg"); // Make this dynamic later

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        await this.$axios.$post('/api/images', data, config).then(response => {
            console.log({ response });
        }).catch(error => {
            console.log({ error });
        });
    },
  }
}
</script> 

<style scoped>
.hide-input {
    display: none;
}
*{
    text-transform: none !important;
}
.upload-button {
    border-radius: 50px;
    color: white;
}
</style>