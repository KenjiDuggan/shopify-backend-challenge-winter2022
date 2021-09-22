<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <br/>
      <v-container>
        <div class="content">
            <p>
                <strong>Username:</strong>
                {{ getUserInfo.name }}
            </p>
            <p>
                <strong>Email:</strong>
                {{ getUserInfo.email }}
            </p>
            <p>
                <strong>ID:</strong>
                {{ getUserInfo._id }}
            </p>
        </div>
      </v-container>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  middleware: 'isAuthenticated',
  computed: {
    ...mapGetters(['getUserInfo'])
  },
}
</script>