<template>
  <v-container class="mt-16">
    <v-row>
      <v-col cols="12" v-if="edit">
        <!-- <div>Hello: {{ todoId }}</div> -->
        <v-text-field label="title" outlined v-model="todo.text">
          <template slot="append-outer">
            <v-btn
              depressed
              plain
              color="info"
              :disabled="todo.text ? false : true"
              @click="updateTodo(todo)"
            >
              <v-icon> mdi-send</v-icon></v-btn
            >
          </template>
        </v-text-field>
      </v-col>
      <v-col v-else cols="12" class="d-flex justify-space-between">
        <div class="d-flex">
          <v-btn color="success" plain to="/"
            ><v-icon>mdi-arrow-left</v-icon></v-btn
          >
          <v-spacer></v-spacer>
          <h4 @click="editTodo()" class="text-h4 text-decoration-line-through">
            {{ todo.text }}
          </h4>
        </div>

        <v-spacer></v-spacer>
        <v-btn plain color="dark" @click="editTodo()"
          ><v-icon> mdi-pencil</v-icon></v-btn
        >
      </v-col>
      <v-col cols="12" class="py-0" v-if="todo.text != ''">
        <v-textarea
          outlined
          label="Notes"
          placeholder="Add note to"
          v-model="todo.content"
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        class="d-flex py-0 justify-end align-center"
        v-if="todo.text != ''"
      >
        <v-checkbox
          label="Mark as completed"
          v-model="todo.completed"
        ></v-checkbox>
      </v-col>
      <v-col
        cols="12"
        class="d-flex py-0 mb-4 justify-space-between align-center"
        style="border-bottom: 1px solid #eee"
      >
        <h4 class="text-h5 font-weight-bold">Subtasks</h4>
        <v-btn
          v-if="todo.subtasks.length == 0"
          color="error"
          @click="addSubtask"
          >ADD SUBTASK</v-btn
        >
        <v-btn v-else color="error" @click="clearSubtasks()"
          >REMOVE SUBTASK</v-btn
        >
      </v-col>
      <v-col cols="12" v-if="todo.subtasks.length == 0">
        <v-alert type="info">
          <p class="mb-1">
            This todo has no subtask
            <strong>— Let's make one 📝</strong>
          </p></v-alert
        >
      </v-col>
      <v-col cols="12" v-if="todo.subtasks.length > 0">
        <v-text-field
          v-for="(subtask, i) in todo.subtasks"
          :key="i"
          label="Hello"
          placeholder="Title"
          v-model="subtask.title"
          ><template slot="append-outer">
            <v-btn
              depressed
              plain
              color="info"
              :disabled="subtask.title ? false : true"
              @click="addSubtask"
            >
              <v-icon> mdi-plus</v-icon></v-btn
            >

            <v-btn
              depressed
              plain
              color="error"
              v-if="subtask.title ? true : false"
              @click="deleteSubtask(i)"
            >
              <v-icon> mdi-minus</v-icon></v-btn
            >
          </template></v-text-field
        >
      </v-col>
      <v-col cols="12" class="d-flex justify-space-between">
        <v-btn color="dark" to="/"><v-icon>mdi-arrow-left</v-icon> Back</v-btn>
        <v-btn color="success" @click="updateTodo(todo)"
          ><v-icon>mdi-send</v-icon> Save</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      todoId: this.$route.params.id,
      edit: false,
    };
  },
  created() {
    this.$store.dispatch("findTodo", this.todoId);
    setTimeout(() => {
      this.$store.state.loading = false;
    }, 3000);
  },
  computed: {
    todo: {
      get() {
        return this.$store.state.todo;
      },
      set(data) {
        this.$store.dispatch("updateValue", data);
      },
    },
  },
  methods: {
    goToHome() {
      this.$router.push({ path: "/" });
    },
    editTodo() {
      this.edit = true;
    },
    updateTodo(payload) {
      this.$store.state.loading = true;
      payload.id = this.todoId;
      this.$store.dispatch("updateTodo", payload);
    },
    addSubtask() {
      this.$store.commit("addSubTask", this.todo);
    },
    deleteSubtask(payload) {
      this.$store.commit("deleteSubtask", payload);
    },
    clearSubtasks() {
      this.$store.commit("clearSubtasks");
    },
  },
};
</script>
