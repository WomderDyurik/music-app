<template>
  <router-link :to="{ name: 'song', params: { id: song.docId } }">
    <li
      class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
    >
      <div class="flex justify-between items-center">
        <button
          @click.prevent="newSong(song)"
          type="button"
          class="z-50 h-10 w-10 bg-black text-white rounded-full focus:outline-none"
        >
          <i class="fas fa-play"></i>
        </button>
        <router-link
          :to="{ name: 'song', params: { id: song.docId } }"
          class="font-bold block text-gray-600 ml-5 flex flex-col"
          >{{ song.modified_name }}
          <span class="text-gray-500 text-sm">{{ song.display_name }}</span></router-link
        >
      </div>

      <div class="text-gray-600 text-lg flex">
        <button type="button" @click.prevent="addLike" class="mr-5" >
          <span
            ><i class="fa fa-regular fa-heart"></i
            >{{ song.likes_count }}</span
          >
        </button>
        <router-link
          custom
          :to="{ name: 'song', params: { id: song.docId }, hash: '#comments' }"
          v-slot="{ navigate }"
        >
          <span class="comments" @click="navigate">
            <i class="fa fa-comments text-gray-600"></i>
            {{ song.comment_count }}
          </span>
        </router-link>
      </div>
    </li>
  </router-link>
</template>

<script>
import usePlayerStore from '@/stores/player'
import { mapActions } from 'pinia'
export default {
  name: 'songItem',
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions(usePlayerStore, ['newSong'])
  }
}
</script>
