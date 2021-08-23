<template>
  <v-app>
    <v-container>
      <v-row justify="center">
        <v-col sm="6" xl="4">
          <v-sheet elevation="6" class="pa-5" rounded>
            <v-form @submit.prevent="login">
              <v-row>
                <v-col>
                  <v-alert
                    v-if="invalid"
                    color="red"
                    dense
                    dismissible
                    type="error"
                  >
                    Invalid Login
                  </v-alert>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="text-h4">Login</div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
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
              <v-row>
                <v-col>
                  <div class="text-h4">
                    <v-alert
                      border="left"
                      colored-border
                      color="deep-purple accent-4"
                      elevation="2"
                    >
                      Please hack my site by shingha on working palang... hehehe
                      <div>Top 1</div>
                      <div>hacker Koko</div>
                    </v-alert>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-sheet>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-container>
  </v-app>
</template>

<script>
import auth from '../../js/auth'
import session from '../../js/session'

export default {
  data() {
    return {
      invalid: false,
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
          this.invalid = true

          this.username = ''
          this.password = ''
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
