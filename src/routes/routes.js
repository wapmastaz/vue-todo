import Home from "../view/Home.vue";
import ShowTodo from "../components/ShowTodo.vue";
export const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/todo/:id",
    component: ShowTodo,
  },
];
