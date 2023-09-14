import { todos } from './App.vue';

export const deleteTodo = function (index) {
todos.splice(index, 1);
};
