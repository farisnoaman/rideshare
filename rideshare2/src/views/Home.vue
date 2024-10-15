<template>
  <div class="home">
    <h1>Welcome to Rideshare App</h1>
    <p v-if="isLoggedIn">Hello, {{ username }}!</p>
    <p v-else>Please log in to use the app.</p>
    <div class="registration-options">
      <button @click="register('driver')" class="register-btn driver">Register as Driver</button>
      <button @click="register('passenger')" class="register-btn passenger">Register as Passenger</button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const authStore = useAuthStore()
    const registrationStatus = ref('')

    const register = async (userType) => {
      if (!authStore.isLoggedIn) {
        alert('Please log in first to register.')
        return
      }

      try {
        const response = await fetch('/api/method/rideshare_app.api.register_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: authStore.user.username,
            user_type: userType,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          registrationStatus.value = `Successfully registered as ${userType}`
          alert(registrationStatus.value)
        } else {
          throw new Error('Registration failed')
        }
      } catch (error) {
        console.error('Error during registration:', error)
        alert('Registration failed. Please try again.')
      }
    }

    return {
      isLoggedIn: authStore.isLoggedIn,
      username: authStore.user?.username,
      register,
      registrationStatus,
    }
  }
}
</script>

<style scoped>
.registration-options {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.register-btn {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: white;
}

.driver {
  background-color: #4CAF50;
}

.passenger {
  background-color: #008CBA;
}
</style>