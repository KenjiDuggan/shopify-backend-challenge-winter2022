<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-img :src="item.icon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; Shopify Image Repository {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import homeIcon from '../static/images/photo_library_black_24dp.svg'
import uploadIcon from '../static/images/add_to_photos_black_24dp.svg'
import searchIcon from '../static/images/image_search_black_24dp.svg'
import deleteIcon from '../static/images/healing_black_24dp.svg'
import shopIcon from '../static/images/receipt_long_black_24dp.svg'

export default {
  data () {
    return {
      homeIcon,
      uploadIcon,
      searchIcon,
      deleteIcon,
      shopIcon,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: homeIcon,
          title: 'Home/Instructions',
          to: '/'
        },
        {
          icon: uploadIcon,
          title: 'Upload',
          to: '/upload'
        },
        {
          icon: searchIcon,
          title: 'Search',
          to: '/search'
        },
        {
          icon: deleteIcon,
          title: 'Delete',
          to: '/delete'
        },
        {
          icon: shopIcon,
          title: 'Shop',
          to: '/shop'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  }
}
</script>
