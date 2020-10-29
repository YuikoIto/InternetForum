<template>
  <div>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input type="checkbox" @checked="todo.done" @change="toggle(todo)">
        {{ todo.done }} {{ todo.name }}
        <button @click="remove(todo.id)">X</button>
      </li>
    </ul>
    <div class="form">
      <form @submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      done: false
    }
  },
  created: function() {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add() {
      this.$store.dispatch('todos/add', this.name)
      this.name = ''
    },
    remove(id) {
      this.$store.dispatch('todos/remove', id)
    },
    toggle(todo) {
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    todos() {
      //これはtodos.jsのstateの中のtodosという配列を取得している
      return this.$store.state.todos.todos
    }
  }
}
</script>