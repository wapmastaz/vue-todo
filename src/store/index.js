import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state() {
    return {
      todos: [],
      todo: {
        text: "",
        content: "",
        completed: false,
        subtasks: [],
      },
      buttonState: true,
      loading: true,
      message: "",
    };
  },
  mutations: {
    getTodos(state, data) {
      if (data.success) {
        state.todos = data.data;
        state.todo.text = "";
        state.todo.content = "";
        state.todo.completed = false;
        state.todo.subtasks = [];
        setTimeout(() => {
          state.loading = false;
        }, 2000);
      }
      console.log("todos", data);
    },
    addSubTask(state, payload) {
      state.todo.subtasks.push({
        title: payload.title,
        completed: state.todo.completed,
      });
      console.log("subtasks", state.todo.subtasks);
    },
    deleteSubtask(state, payload) {
      console.log(payload);
      state.todo.subtasks.splice(payload, 1);
    },
    clearSubtasks(state) {
      state.todo.subtasks = [];
    },
    updateValue(state, payload) {
      state.todo.text = payload.data.title;
      state.todo.content = payload.data.notes;
      state.todo.completed = payload.data.completed;
      state.todo.subtasks = payload.data.subtasks;
      console.log("payload", payload);
    },
    updateTodo(state, payload) {
      console.log("payload", payload);
    },
    deleteTodo(state, payload) {
      console.log("Delete Payrol", payload);
      if (payload.data.success) {
        state.loading = false;
      }
    },
    END_LOADING(state) {
      state.loading = false;
    },
    START_LOADING(state) {
      state.loading = true;
    },
    SEND_MESSAGE(state, payload) {
      state.message = payload;
      setTimeout(() => {
        state.message = "";
      }, 4000);
    },
  },

  actions: {
    getTodos({ commit }) {
      axios
        .get("/todos")
        .then((res) => {
          // console.log(res);
          // commit a mutation
          commit("getTodos", res.data);
        })
        .then((err) => {
          console.log(err);
        });
    },

    findTodo({ commit }, payload) {
      axios
        .get("todos/" + payload)
        .then((res) => {
          // console.log(res);
          if (res.data.success) {
            console.log("update value", res);
            commit("updateValue", res.data);
          }
        })
        .catch((err) => {
          console.log("find error", err);
        });
    },
    // eslint-disable-next-line no-unused-vars
    createTodo({ commit }, payload) {
      // {"title":"string","notes":"string","completed":false,"subtasks":[{"title":"string","completed":false}]}
      axios
        .post("/todos", {
          title: payload.text,
          notes: payload.content,
          completed: payload.completed,
          subtasks: payload.subtasks,
        })
        .then((res) => {
          commit("SEND_MESSAGE", "Todo Created Successfully");
          this.dispatch("getTodos");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateValue({ commit }, payload) {
      commit("updateValue", payload);
    },
    // eslint-disable-next-line no-unused-vars
    updateTodo({ commit }, payload) {
      axios
        .put("/todos/" + payload.id, {
          title: payload.text,
          notes: payload.content,
          completed: payload.completed,
          subtasks: payload.subtasks,
        })
        .then((res) => {
          // setTimeout(() => {
          commit("END_LOADING");
          // }, 2000);
          commit("SEND_MESSAGE", "Todo updated");
          console.log("update respond", res);
        })
        .catch((err) => {
          console.log("update error", err);
        });
      // commit("getTodos");
    },
    // eslint-disable-next-line no-unused-vars
    deleteTodo({ commit }, payload) {
      axios
        .delete("/todos/" + payload.id, {
          id: payload.id,
        })
        .then((res) => {
          commit("SEND_MESSAGE", "Todo deleted Successfully");
          commit("deleteTodo", res);
          console.log("delete respond", res);
        })
        .catch((err) => {
          console.log("delete error", err);
        });
    },
  },

  getters: {
    getAllTodos: (state) => {
      return state.todos;
    },
    loading: (state) => {
      return state.loading;
    },
    message: (state) => {
      return state.message;
    },
  },
});
