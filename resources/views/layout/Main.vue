<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ session.name }} ({{ session.role }})
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item link :to="{ name: 'dashboard' }">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-group :value="false" no-action prepend-icon="mdi-account">
          <template v-slot:activator>
            <v-list-item-title>Users Management</v-list-item-title>
          </template>

          <v-list-item
            v-if="session.role === 'User'"
            link
            :to="{ name: 'userchangepassword' }"
          >
            <v-list-item-content>
              <v-list-item-title>Change Password</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="session.role === 'Administrator'"
            link
            :to="{ name: 'user' }"
          >
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-if="session.role === 'Administrator'"
            link
            :to="{ name: 'roles' }"
          >
            <v-list-item-content>
              <v-list-item-title>Roles</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-group :value="false" no-action prepend-icon="mdi-file-table">
          <template v-slot:activator>
            <v-list-item-title>Expenses Management</v-list-item-title>
          </template>

          <v-list-item
            v-if="session.role === 'Administrator'"
            link
            :to="{ name: 'expensecategory' }"
          >
            <v-list-item-content>
              <v-list-item-title>Expense Category</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            link
            v-if="session.role === 'Administrator' || session.role === 'User'"
            :to="{ name: 'expense' }"
          >
            <v-list-item-content>
              <v-list-item-title>Expenses</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-spacer />
      <span class="pr-5">Welcome to Expense Manager</span>
      <v-icon v-text="`mdi-logout`" @click="logout" />
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col class="pt-7 pl-7">
          <h1>{{ $route.meta.text }}</h1>
        </v-col>
        <v-col class="d-flex align-end flex-column">
          <v-breadcrumbs :items="breadcrumbList" divider=">"></v-breadcrumbs>
        </v-col>
      </v-row>
      <v-container fluid>
        <slot></slot>
      </v-container>
    </v-main>

    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import auth from '../../js/auth'
import session from '../../js/session'

export default {
  data() {
    return {
      breadcrumbList: [],
      session: {},
    }
  },
  watch: {
    $route() {
      this.breadcrumbList = this.$route.meta.breadcrumb
    },
  },
  mounted() {
    this.breadcrumbList = this.$route.meta.breadcrumb

    session.getSession().then((res) => {
      this.session = {
        name: res.data.name,
        role: res.data.role,
      }
    })
  },
  methods: {
    logout() {
      auth
        .logout()
        .then((res) => {})
        .catch((err) => {})
        .finally(() => {
          this.$router.push({ name: 'login' })
          session.removeToken()
        })
    },
  },
}
</script>

<style></style>
