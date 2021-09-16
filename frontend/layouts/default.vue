<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list v-if="isAuthenticated">
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
        <v-list-item
          to="/"
          router
          exact
          @click="logout"
        >
          <v-list-item-action>
            <v-img :src="logoutIcon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Logout'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-else>
        <v-list-item
          to="/login"
          router
          exact
        >
          <v-list-item-action>
            <v-img :src="loginIcon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Login'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/register"
          router
          exact
        >
          <v-list-item-action>
            <v-img :src="registerIcon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Register'" />
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
import loginIcon from '../static/images/login_black_24dp.svg'
import registerIcon from '../static/images/fact_check_black_24dp.svg'
import profileIcon from '../static/images/account_circle_black_24dp.svg'
import homeIcon from '../static/images/photo_library_black_24dp.svg'
import uploadIcon from '../static/images/add_to_photos_black_24dp.svg'
import searchIcon from '../static/images/image_search_black_24dp.svg'
import deleteIcon from '../static/images/healing_black_24dp.svg'
import shopIcon from '../static/images/receipt_long_black_24dp.svg'
import logoutIcon from '../static/images/logout_black_24dp.svg'

export default {
  data () {
    return {
      loginIcon,
      registerIcon,
      profileIcon,
      homeIcon,
      uploadIcon,
      searchIcon,
      deleteIcon,
      shopIcon,
      logoutIcon,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: profileIcon,
          title: 'Profile',
          to: '/profile'
        },
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
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;  // it check if user isAuthenticated 
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout();  // this method will logout the user and make token to false on the local storage of the user browser
    }
  },
}
</script>
