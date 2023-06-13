<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div>
      <h4 class="inline-block text-2xl font-bold">{{ song.modified_name }}</h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="deleteSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showEdit = !showEdit"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div>
      <div
        class="text-white text-center font-bold p-4 mb-4"
        v-if="show_alert"
        :class="alert_variant"
      >
        {{ alert_message }}
      </div>
      <vee-form v-show="showEdit" :validation-schema="songEditSchema" @submit="edit">
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('app_song.song') }}</label>
          <vee-field
            name="modified_name"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('app_song.song_placeholder')"
            :value="song.modified_name"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="modified_name" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">{{ $t('app_song.genre') }}</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            :placeholder="$t('app_song.genre_placeholder')"
            @input="updateUnsavedFlag(true)"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600"
          :disabled="in_submission"
        >
          {{ $t('app_song.submit') }}
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-gray-600"
          :disabled="in_submission"
        >
          {{ $t('app_song.back') }}
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { songsCollection, storage } from '@/includes/firebase'

export default {
  name: 'AppSong',
  props: {
    song: {
      type: Object,
      required: true
    },
    updateSong: {
      type: Function,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    removeSong: {
      type: Function,
      required: true
    },
    updateUnsavedFlag: {
      type: Function
    }
  },
  data: () => ({
    showEdit: false,
    songEditSchema: {
      modified_name: 'required|min:1|max:100',
      genre: 'required|min:3|max:20'
    },
    in_submission: false,
    show_alert: false,
    alert_variant: 'bg-blue-500',
    alert_message: 'Please wait! Updating song info.'
  }),
  methods: {
    async edit(values) {
      this.in_submission = true
      this.show_alert = true
      this.alert_variant = 'bg-blue-500'
      this.alert_message = 'Please wait! Updating song info.'

      try {
        await songsCollection.doc(this.song.docId).update(values)
      } catch (error) {
        this.in_submission = false
        this.alert_variant = 'bg-red-500'
        this.alert_message = 'Something went wrong! Try again later.'
        return
      }

      this.updateSong(this.index, values)
      this.updateUnsavedFlag(false)

      this.in_submission = false
      this.alert_variant = 'bg-green-500'
      this.alert_message = 'Success!'
      setTimeout(() => {
        this.showEdit = false
        this.show_alert = false
      }, 1000);
    },
    async deleteSong() {
      const storageRef = storage.ref()
      const songRef = storageRef.child(`songs/${this.song.original_name}`)

      await songRef.delete()

      await songsCollection.doc(this.song.docId).delete()

      this.removeSong(this.index)
    }
  }
}
</script>
