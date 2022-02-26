<template>
  <v-container class="">
    <todo-form></todo-form>
    <v-spacer></v-spacer>
    <h4 class="text-h5 mt-8 pb-1 font-weight-bold text-md-h3">
      Current To-dos
    </h4>
    <hr />
    <todo-item></todo-item>
  </v-container>
</template>

<script>
import TodoForm from "../components/TodoForm.vue";
import TodoItem from "../components/TodoItem.vue";
export default {
  components: {
    TodoForm,
    TodoItem,
  },
};
</script>
<style scoped></style>
