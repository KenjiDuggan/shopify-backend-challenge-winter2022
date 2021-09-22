<template>
  <v-container
    grid-list-md
    text-xs-center
    fill-height>
    <h1>
      Add Images
    </h1>
    <v-row>
      <v-col cols="12">
        <v-switch
          v-model="pub"
          :label="pub ? 'Public Upload' : 'Private Upload'"
        ></v-switch>
      </v-col>
      <v-col cols="12">
        <v-file-input 
            id="file"
            ref="file"
            v-model="currFiles" 
            small-chips 
            show-size 
            multiple 
            clearable 
            label="Add files"
            @change="loadingImages">
          <template #selection="{ text, index }">
            <v-chip small text-color="white" color="#295671" close @click:close="remove(index)">
                {{ text }}
            </v-chip>
          </template>
        </v-file-input>
      </v-col>
      <v-col cols="12">
        <div v-if="files.length" >
            <h5>All files</h5>
            <v-chip v-for="f in files" :key="f" class="mr-1">
                {{ f.name }}
            </v-chip>
            <div class="py-3">
                <v-btn @click="uploadImage">Upload</v-btn>
            </div>
        </div>
      </v-col>
    </v-row>
 
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      image: '',
      currFiles: [],
      files: [],
      urls: [],
      pub: true
    }
  },
  methods: {
    remove(index) {
      this.files.splice(index, 1)
    },
    loadingImages() {
      this.files = [
          ...this.currFiles,
          ...this.files
      ]
      const urls = []
      this.files.forEach((e, i) => {
        urls[i] = URL.createObjectURL(e)
      })
      this.urls = urls
    },
    async uploadImage() {
      if(this.currFiles.length > 1) {
        const formData = new FormData();

        // files
        for (const file of this.currFiles) {
            formData.append("files", file, file.name);
        }
        formData.append("extension", ".jpg"); // Make this dynamic later

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
 
        await this.$axios.$post('/api/images/post/multi/public', formData, config).then(response => {
            console.log({ response });
        }).catch(error => {
            console.log({ error });
        });

      } else if(this.currFiles.length === 1) {
          const formData = new FormData();
          const file = this.currFiles[0]
          const extension = file.name.split('.')[1]
          const pub = this.pub

          formData.append('file', file)
          formData.append('extension', extension)
          formData.append('public', pub)
          
          const config = {
              headers: {
                  'content-type': 'multipart/form-data'
              }
          }

          await this.$axios.$post('/api/images/post/single/public', formData, config).then(response => {
              console.log({ response });
          }).catch(error => {
              console.log({ error });
          });

        } else {
          console.log('There are no images to upload.')
        }
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