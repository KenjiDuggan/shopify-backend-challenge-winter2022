<template>
    <div>
        <v-row>
            <v-container>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email address</label>
                        <input
                            id="email"
                            v-model="loginData.email"
                            type="email"
                            class="form-control"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input
                            id="password"
                            v-model="loginData.password"
                            type="password"
                            class="form-control"
                        />
                    </div>
                    <v-btn type="submit">Login</v-btn>
                </form>
            </v-container>
        </v-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
        loginData: {
            email: '',
            password: ''
        }
    }
  },
  methods: {
    async login() {
        try {
            const response = await this.$auth.loginWith('local', {
                data: this.loginData
            })
            this.$router.push('/')
            if(response.status === 200 || response.status === 201) {
                this.$store.commit("SET_AUTH_STATE", true);
            } 
        } catch (err) {
            console.log(err)
        }
    }
  }
};
</script>
<style>
#email {
    background-color: white;
    color: black;
}

#password {
    background-color: white;
    color: black;
}
</style>