<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/map">Map</router-link> |
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link> |
      <router-link v-if="!isLoggedIn" to="/signup">Sign Up</router-link>
      <a v-if="isLoggedIn" @click="logout" href="#">Logout</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore()

    const logout = () => {
      authStore.logout()
    }

    return {
      isLoggedIn: authStore.isLoggedIn,
      logout
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>