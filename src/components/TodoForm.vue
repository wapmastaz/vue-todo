<template>
  <v-row>
    <v-col cols="12" class="pb-0">
      <v-text-field
        label="Add A Todo *"
        outlined
        placeholder="What would you like to get done?"
        v-model="todo.text"
      ></v-text-field>
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
      class="d-flex py-0 justify-space-between align-center"
      v-if="todo.text != ''"
    >
      <v-checkbox
        label="Mark as completed"
        v-model="todo.completed"
      ></v-checkbox>
      <v-btn
        v-if="todo.subtasks.length == 0"
        depressed
        plain
        color="error"
        @click="addSubtask"
        >ADD SUBTASK</v-btn
      >
      <v-btn v-else depressed plain color="error" @click="clearSubtasks()"
        >REMOVE SUBTASK</v-btn
      >
    </v-col>
    <v-col cols="12" v-if="todo.subtasks.length">
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
    <v-col cols="12" class="pt-0">
      <v-btn
        depressed
        block
        color="error"
        @click="createTodo()"
        :disabled="buttonState"
        >Save <v-icon class="pl-2" icon>mdi-send</v-icon></v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      buttonState: true,
    };
  },
  watch: {
    "todo.text"(value) {
      if (value) {
        this.buttonState = false;
      } else {
        this.buttonState = true;
      }
    },
  },
  computed: {
    todo: {
      get() {
        return this.$store.state.todo;
      },
      // set(data) {},
    },
  },
  methods: {
    createTodo() {
      this.$store.state.loading = true;
      this.$store.dispatch("createTodo", this.todo);
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

<style scoped></style>
