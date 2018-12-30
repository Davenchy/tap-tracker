<template>
  <v-toolbar dark  color="blue">
    <router-link to="/" tag="v-toolbar-title" class="title">Tap Tracker</router-link>
    <v-toolbar-items>
      <v-btn flat>Browse</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
      <v-btn flat to="/login">Login</v-btn>
      <v-btn flat to="/register">Register</v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="$store.state.isUserLoggedIn">
      <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.commit('logout')
    }
  }
}
</script>

<style>
  .title {
    cursor: pointer;
  }
</style>
