<template>
  <div class="signup">
    <h2>Sign Up</h2>
    <button @click="signUpWithGoogle" class="google-btn">Sign Up with Google</button>
    <div v-if="step === 'email_confirmation'">
      <p>Please check your email and enter the confirmation code:</p>
      <input v-model="emailConfirmationCode" placeholder="Confirmation Code" />
      <button @click="confirmEmail">Confirm Email</button>
    </div>
    <div v-if="step === 'complete_registration'">
      <input v-model="name" placeholder="Full Name" />
      <input v-model="mobile" placeholder="Mobile Number" />
      <button @click="completeRegistration">Complete Registration</button>
    </div>
    <div v-if="step === 'mobile_otp'">
      <p>Enter the OTP sent to your mobile:</p>
      <input v-model="mobileOTP" placeholder="OTP" />
      <button @click="verifyMobileOTP">Verify OTP</button>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export default {
  name: 'Signup',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const step = ref('initial')
    const emailConfirmationCode = ref('')
    const name = ref('')
    const mobile = ref('')
    const mobileOTP = ref('')
    const error = ref('')

    const signUpWithGoogle = async () => {
      try {
        // Simulate Google sign up
        await authStore.signUpWithGoogle()
        step.value = 'email_confirmation'
      } catch (err) {
        error.value = 'Failed to sign up with Google'
      }
    }

    const confirmEmail = async () => {
      try {
        await authStore.confirmEmail(emailConfirmationCode.value)
        step.value = 'complete_registration'
      } catch (err) {
        error.value = 'Invalid confirmation code'
      }
    }

    const completeRegistration = async () => {
      try {
        await authStore.completeRegistration(name.value, mobile.value)
        step.value = 'mobile_otp'
      } catch (err) {
        error.value = 'Failed to complete registration'
      }
    }

    const verifyMobileOTP = async () => {
      try {
        await authStore.verifyMobileOTP(mobileOTP.value)
        router.push('/') // Redirect to home page after successful registration
      } catch (err) {
        error.value = 'Invalid OTP'
      }
    }

    return {
      step,
      emailConfirmationCode,
      name,
      mobile,
      mobileOTP,
      error,
      signUpWithGoogle,
      confirmEmail,
      completeRegistration,
      verifyMobileOTP
    }
  }
}
</script>

<style scoped>
.signup {
  max-width: 300px;
  margin: 0 auto;
}

input, button {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
}

.google-btn {
  background-color: #4285F4;
  color: white;
}

.error {
  color: red;
}
</style>