<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ login_alert_msg }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_form.email') }}</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('login_form.email_placeholder')"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('login_form.password') }}</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('login_form.password_placeholder')"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      :disabled="login_in_submission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      {{ $t('login_form.submit') }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'LoginForm',
  data: () => ({
    loginSchema: {
      email: 'required|min:5|max:100|email',
      password: 'required|min:8|max:100|excluded:password'
    },
    login_in_submission: false,
    login_show_alert: false,
    login_alert_variant: 'bg-blue-500',
    login_alert_msg: 'Please wait! We are login you in'
  }),
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.login_show_alert = true
      this.login_in_submission = true
      this.login_alert_variant = 'bg-blue-500'
      this.login_alert_msg = 'Please wait! We are login you in'

      try {
        await this.authenticate(values)
      } catch (error) {
        this.login_in_submission = false
        this.login_alert_variant = 'bg-red-500'
        this.login_alert_msg = 'False! You are not logged in'
        return
      }

      this.login_alert_variant = 'bg-green-500'
      this.login_alert_msg = 'Success! Your logged in'
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped></style>
