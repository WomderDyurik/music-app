<template>
  <main>
    <section class="mb-8 py-20 text-white text-center relative">
      <div
        class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">{{ $t('home.listen') }}</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis,
            congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet,
            venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img
        class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full"
        src="/assets/img/introduction-music.png"
      />
    </section>
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="card-title px-6 pt-6 pb-5 font-bold border-b border-gray-200">{{ $t('home.songs') }}
          <div
          class="px-6 font-bold "
          v-icon-secondary="{ icon: 'headphones-alt', right: true }"
        ></div>
        </div>
        <ol id="playlist">
          <song-item
            v-for="(song, i) in songs"
            :key="song.docId"
            :index="i"
            :song="song"
          ></song-item>
        </ol>
      </div>
    </section>
  </main>
</template>

<script>
import { songsCollection } from '@/includes/firebase'
import SongItem from '@/components/SongItem.vue'
import IconSecondary from '@/directives/icon-secondary'

export default {
  name: 'HomePage',
  components: {
    SongItem
  },
  directives: {
    'icon-secondary': IconSecondary
  },
  data: () => ({
    songs: []
  }),
  async created() {
    await this.getSongs()

    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    async getSongs() {
      const snapshots = await songsCollection.get()

      snapshots.forEach((document) => {
        this.songs.push({
          docId: document.id,
          ...document.data()
        })
      })
    }
  }
}
</script>
