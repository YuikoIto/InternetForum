<template>
  <div class="w-full h-full">
    <Header/>
    <div class="mt-10 container mx-auto">
      <div class="md:flex md:items-center mb-6" v-for="comment in comments" :key="comment.id">
        <span class="block uppercase tracking-wide text-gray-700 text-ms font-bold mb-2" v-if="comment.created">
          <span>
           名前:{{ comment.name }}<br>
           内容:{{ comment.index}}<br>
           投稿時間:{{ comment.created.toDate() | dateFilter}}
          </span>
          <!-- <button @click="remove(comment.id)">X</button> -->
        </span>
      </div>
      <form @submit.prevent="add" class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
              名前
            </label>
          </div>
          <input v-model="name" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
          <div class="w-full md:w-1/2 px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
              内容
            </label>
          </div>
          <input v-model="index" class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
        </div>
        <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">投稿する</button> 
      </form>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
import moment from 'moment'
export default {
  data: function() {
    return {
      name: '',
      index: '',
      done: false
    }
  },
  created: function() {
    this.$store.dispatch('comments/init')
  },
  methods: {
    add() {
      this.$store.dispatch('comments/add', {index: this.index, name: this.name})
      this.name = ''
      this.index = ''
    },
    remove(id) {
      this.$store.dispatch('comments/remove', id)
    },
  },
  computed: {
    comments() {
      //これはcomments.jsのstateの中のcommentsという配列を取得している
      return this.$store.getters['comments/orderdComments']
    }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format('YYYY/MM/DD HH:mm:ss')
    }
  }
}
</script>