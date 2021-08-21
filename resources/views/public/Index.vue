<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col sm="6" xl="4">
          <v-sheet elevation="6" class="pa-5" rounded>
            <v-form @submit.prevent="login">
              <v-row>
                <v-col>
                  <v-row>
                    <v-col>
                      <div class="text-h4">Login</div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Username"
                        v-model="username"
                        outlined
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mt-n5">
                    <v-col>
                      <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        outlined
                      />
                    </v-col>
                  </v-row>
                  <v-row class="mt-n5">
                    <v-btn type="submit" color="primary" block>
                      Sign in
                    </v-btn>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import auth from '../../js/auth'
import session from '../../js/session'

export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    login() {
      auth
        .login(this.username, this.password)
        .then((res) => {
          if (res.status === 200 && res.statusText === 'OK') {
            session.setToken(res.data.access_token)
            this.$router.push({ name: 'dashboard' })
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {})
    },
  },
  beforeCreate() {
    if (session.getAuth()) {
      this.$router.push({ name: 'dashboard' })
    }
  },
}
</script>

<style></style>
