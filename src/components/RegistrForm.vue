<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form :validation-schema="schema" @submit="register">
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.name') }}</label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register_form.name_placeholder')"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.email') }}</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register_form.email_placeholder')"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.age') }}</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register_form.age_placeholder')"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.password') }}</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          :placeholder="$t('register_form.password_placeholder')"
          v-bind="field"
        />
        <div class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.confirm_password') }}</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register_form.confirm_password_placeholder')"
      />
      <ErrorMessage class="text-red-600" name="confirm_password" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.country') }}</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option :value="$t('register_form.country_values.usa')">
          {{ $t('register_form.country_values.usa') }}
        </option>
        <option :value="$t('register_form.country_values.mexico')">
          {{ $t('register_form.country_values.mexico') }}
        </option>
        <option :value="$t('register_form.country_values.germany')">
          {{ $t('register_form.country_values.germany') }}
        </option>
        <option :value="$t('register_form.country_values.antarctica')">
          {{ $t('register_form.country_values.antarctica') }}
        </option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register_form.role') }}</label>
      <vee-field
        as="select"
        name="role"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option :value="$t('register_form.role_options.listener')">
          {{ $t('register_form.role_options.listener') }}
        </option>
        <option :value="$t('register_form.role_options.artist')">
          {{ $t('register_form.role_options.artist') }}
        </option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="role" />
    </div>
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t class="inline-block" keypath="register.accept" tag="label" scope="global">
        <a href="#">{{ $t('register.tos') }}</a>
      </i18n-t>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      {{ $t('register_form.submit') }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '@/stores/user'

export default {
  name: 'RegistrForm',
  data: () => ({
    tab: 'login',
    schema: {
      name: 'required|min:3|max:100|alpha_spaces',
      email: 'required|min:5|max:100|email',
      age: 'required|numeric|min_value:18|max_value:100',
      password: 'required|min:8|max:100|excluded:password',
      confirm_password: 'required|passwords_mismatch:@password',
      country: 'required|country_excluded:Antarctica',
      role: 'required',
      tos: 'tos'
    },
    reg_in_submission: false,
    reg_show_alert: false,
    reg_alert_variant: 'bg-blue-500',
    reg_alert_msg: 'Please wait! Your account is being created'
  }),
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'registr'
    }),
    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_msg = 'Please wait! Your account is being created'

      try {
        await this.createUser(values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = 'False! Please try again later!'
        return
      }

      this.reg_alert_variant = 'bg-green-500'
      this.reg_alert_msg = 'Success! Your account has been created'

      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped></style>
