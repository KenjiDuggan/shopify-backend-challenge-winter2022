<template>
  <v-container
    grid-list-md
    text-xs-center
    fill-height>
    <v-file-input v-model="currFiles" 
        small-chips 
        show-size 
        multiple 
        clearable 
        label="Add files"
        @input="inputChanged">
      <template #selection="{ text, index }">
        <v-chip small text-color="white" color="#295671" close @click:close="remove(index)">
            {{ text }}
        </v-chip>
      </template>
    </v-file-input>
    <!-- <v-img :src="url"></v-img> -->
    <div v-if="files.length" :key="files">
        <h5>All files</h5>
        <v-chip v-for="f in files" :key="f" class="mr-1">
            {{ f.name }}
        </v-chip>
        <div class="py-3">
            <v-btn>Upload all</v-btn>
        </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      currFiles: [],
      files: [],
      urls: []
    }
  },
  methods: {
    async uploadImage() {
          const data = new FormData();
          console.log("This is the complete image Object: " + this.image)
          data.append("image", this.image.files[0], this.image + ".jpg");
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
    },
    remove(index) {
      this.files.splice(index, 1)
    },
    inputChanged() {
      console.log("Input has changed " + this.files)

      this.files = [
          ...this.currFiles,
          ...this.files
      ]
      const urls = []
      this.files.forEach((e, i) => {
        urls[i] = URL.createObjectURL(e)
      })
      this.urls = urls
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