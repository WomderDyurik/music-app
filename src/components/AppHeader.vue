<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
        >{{ $t('header.label') }}</router-link
      >
      <div class="flex flex-grow items-center">
        <ul class="flex flex-row mt-1">
          <li v-if="!userStore.userLoggedIn">
            <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">{{
              $t('header.logreg')
            }}</a>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">{{
                $t('header.manage')
              }}</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">{{
                $t('header.logout')
              }}</a>
            </li>
          </template>
        </ul>
        <ul class="ml-auto">
          <h2 class="text-white">{{ $t('header.lang') }}</h2>
          <select
            v-model="lang"
            @change="changeLocale"
            class="block mt-4 py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          >
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapStores } from 'pinia'
import useModalStore from '@/stores/modal'
import useUserStore from '@/stores/user'

export default {
  name: 'AppHeader',
  data: () => ({
    lang: 'en'
  }),
  computed: {
    ...mapStores(useModalStore, useUserStore)
  },
  methods: {
    toggleAuthModal() {
      this.modalStore.isOpen = !this.modalStore.isOpen
    },
    signOut() {
      this.userStore.signOut()

      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'home' })
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'ru' ? 'en' : 'ru'
    }
  }
}
</script>

<style lang="scss" scoped></style>
