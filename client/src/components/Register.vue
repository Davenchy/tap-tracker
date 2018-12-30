<template>

  <v-layout align-center justify-center text-align-center>
    <v-flex xs12 sm8 md6>
      <v-card class="white elevation-2">
        <v-form @submit.prevent="register">
          <v-toolbar color="blue" flat dark>
            <v-toolbar-title>Register</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              <v-text-field label="User Name" prepend-icon="person" v-model="username" type="name"></v-text-field>
              <v-text-field label="Email" prepend-icon="email" v-model="email" type="email"></v-text-field>
              <v-text-field label="Password" prepend-icon="lock" type="password" v-model="password"></v-text-field>
              <v-alert
                class="pa-1 px-3"
                :value="msg !== ''"
                transition="scale-transition"
                outline
                :type="isError ? 'error' : 'success'"
                :color="isError ? 'error' : 'success'"
              >{{ msg }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue" float-right dark type="submit">Register</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import auth from '@/utils/auth'

export default {
  data: function () {
    return {
      username: '',
      email: '',
      password: '',
      msg: '',
      isError: false
    }
  },
  methods: {
    register () {
      this.msg = ''
      auth.register({
        username: this.username,
        email: this.email,
        password: this.password
      }).then(res => {
        this.isError = false
        this.msg = res.data.msg || 'done!'
      }).catch(err => {
        this.isError = true
        this.msg = err.response.data.error || 'cannot connect to server'
      })
    }
  }
}
</script>

<style scoped>
</style>
