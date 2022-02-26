<template>
  <div class="mt-6">
    <v-row v-if="$store.getters.loading">
      <v-col cols="12">
        <div class="text-center">
          <v-progress-circular
            :size="70"
            :width="7"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-row class="mt-6" v-else>
      <v-col cols="12" v-if="getAllTodos.length == 0">
        <v-alert type="info"
          ><div class="d-flex justify-space-between align-center">
            <span>No Todo</span>
            <v-btn plain> <v-icon icon>mdi-delete</v-icon></v-btn>
          </div>
          <p class="mb-1">Looks like You don't have any todos</p>
          <strong>— Let's make one 📝</strong>
        </v-alert>
      </v-col>
      <v-col
        cols="12"
        md="4"
        class="mb-5"
        v-else
        v-for="todo in getAllTodos"
        :key="todo.id"
      >
        <v-card elevation="1" class="jss24 mb-5">
          <router-link :to="`/todo/${todo.id}`">
            <v-card-title
              :class="{ 'text-decoration-line-through': todo.completed }"
              >{{ todo.title }}</v-card-title
            >
            <v-card-subtitle>{{ todo.createdAt }}</v-card-subtitle>
            <v-card-text class="font-weight-500">{{ todo.notes }}</v-card-text>
          </router-link>
          <v-card-actions class="d-flex justify-space-between align-center">
            <v-checkbox
              label="Completed"
              v-model="todo.completed"
              @change="UpdateTodo(todo)"
            ></v-checkbox>
            <small
              class="m-0 text-sm p-0"
              :class="{
                'text-decoration-line-through':
                  todo.subtasks.length == 0 ? true : false,
              }"
              >No Subtask</small
            >
            <v-btn plain color="red" @click="deleteTodo(todo)">
              <v-icon icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      // loading: true,
    };
  },
  created() {
    this.$store.dispatch("getTodos");
  },
  computed: {
    ...mapGetters(["getAllTodos"]),
    todo: {
      get() {
        return this.$store.state.todo;
      },
      set(data) {
        this.$store.dispatch("updateValue", data);
      },
    },
    isLoading() {
      return this.$store.getters.loading;
    },
  },

  methods: {
    UpdateTodo(payload) {
      this.$store.dispatch("updateTodo", payload);
    },
    deleteTodo(payload) {
      this.$store.state.loading = true;
      this.$store.dispatch("deleteTodo", payload);
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.jss24 {
  background: linear-gradient(
    to right top,
    rgb(230, 230, 230),
    rgb(245, 245, 245)
  );
}
</style>
