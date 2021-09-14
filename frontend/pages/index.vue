<template>
  <v-row justify="center" align="center">
    <v-container>
      <h1 class="title">Shopify Backend Challenge Winter 2022 - Explanations</h1>
      <br />
      <div v-for="service in services" :key="service.toString()">
        <h3 class="subtitle">{{ service.subtitle }}</h3>
        <ul v-for="item in service.items" :key="item.toString()">
          <li>{{ item }}</li>
        </ul>
      </div>
    </v-container>
    <v-btn @click="getLoginPage">Login Here</v-btn>
    <br />
  </v-row>
</template>

<script>
export default {
  // async asyncData({ $axios }) {
  //   const images = await $axios.$get('/api/public')
  //   console.log(images)
  //   return { images }
  // },
  data() {
    return {
      services: [
        {
          subtitle: "ADD image(s) to the repository",
          items: [
            "one / bulk / enormous amount of images",
            "private or public (permissions)",
            "secure uploading and stored images"
          ]
        },
        {
          subtitle: "DELETE image(s)",
          items: [
            "one / bulk / selected / all images",
            "Prevent a user deleting images from another user (access control)",
            "secure deletion of images"
          ]
        },
        {
          subtitle: "SEARCH function",
          items: [
            "from characteristics of the images",
            "from text",
            "from an image (search for similar images)"
          ]
        },
        {
          subtitle: "SELL/BUY images",
          items: [
            "ability to manage inventory",
            "set price",
            "discounts",
            "handle money"
          ]
        }
      ]
    }
  },
  methods: {
    getLoginPage() {
      console.log("Clicking Button It seems")
      this.$axios.$get('/api/login')
    }
  }
}
</script>

<style>
.title {
  text-align: center;
  font-size: 2rem;
  margin-top: 2rem;
}
</style>