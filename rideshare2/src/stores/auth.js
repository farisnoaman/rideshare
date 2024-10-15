import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    tempUserData: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    async signUpWithGoogle() {
      // Simulate Google sign up
      this.tempUserData = { email: 'user@example.com' }
      // In a real app, you'd integrate with Google's OAuth API here
    },
    async confirmEmail(code) {
      // Simulate email confirmation
      if (code === '123456') { // In a real app, validate against a server-generated code
        return true
      }
      throw new Error('Invalid confirmation code')
    },
    async completeRegistration(name, mobile) {
      // Simulate completing registration
      this.tempUserData = { ...this.tempUserData, name, mobile }
      // In a real app, you'd send this data to your server
    },
    async verifyMobileOTP(otp) {
      // Simulate OTP verification
      if (otp === '123456') { // In a real app, validate against a server-generated OTP
        this.user = this.tempUserData
        this.tempUserData = null
        return true
      }
      throw new Error('Invalid OTP')
    },
    async login(username, password) {
      try {
        const response = await fetch('/api/method/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usr: username,
            pwd: password,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          this.user = { username: data.full_name }
          return true
        } else {
          return false
        }
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    async logout() {
      try {
        await fetch('/api/method/logout', { method: 'POST' })
        this.user = null
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
  }
})