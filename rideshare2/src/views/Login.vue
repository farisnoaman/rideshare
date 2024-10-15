<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Login',
  setup() {
    const username = ref('')
    const password = ref('')
    const error = ref('')
    const router = useRouter()
    const authStore = useAuthStore()

    const handleSubmit = () => {
      if (authStore.login(username.value, password.value)) {
        router.push('/map')
      } else {
        error.value = 'Invalid credentials'
      }
    }

    return {
      username,
      password,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}

.error {
  color: red;
}
</style>