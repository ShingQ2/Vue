<template>
  <div class="todo-app">
    <h1>Todo</h1>

    <div class="todo-input">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="What needs to be done"
      />
      <button @click="addTodo">添加</button>
    </div>

    <div class="filter-options">
      <label> <input type="radio" v-model="filter" value="all" /> All </label>
      <label>
        <input type="radio" v-model="filter" value="active" /> Active
      </label>
      <label>
        <input type="radio" v-model="filter" value="completed" /> Completed
      </label>
    </div>

    <ul class="todo-list">
      <li v-for="(todo, index) in filteredTodos" :key="index" class="todo-item">
        <label>
          <input
            type="checkbox"
            v-model="todo.completed"
            @change="updateTodo"
          />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        </label>
        <button class="delete-button" @click="deleteTodo(index)">×</button>
      </li>
    </ul>
    <button class="clear-button" @click="clearCompleted">
      Clear completed
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue"

type TodoType = {
  text: string;
  completed: boolean;
}

const todos = reactive<TodoType[]>([]);
const newTodo = ref<string>("");
const filter = ref<string>("all");

const addTodo = (): void => {
  if (newTodo.value.trim() !== "") {
    todos.push({ text: newTodo.value, completed: false });
    newTodo.value = "";
  }
};

const deleteTodo = (index: number): void => {
  todos.splice(index, 1);
};

function clearCompleted(): void {
  todos.splice(0, todos.length, ...todos.filter((todo) => !todo.completed));
}

const filteredTodos = computed<TodoType[]>(() => {
  if (filter.value === "all") {
    return todos;
  } else if (filter.value === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (filter.value === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
});
</script>

<style scoped>
.todo-app {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #363636;
  font-family: Arial, sans-serif;
}

.todo-input {
  display: flex;
  margin-bottom: 10px;
}

.todo-input input {
  flex-grow: 1;
  padding: 5px;
  border: 1px solid #ccc;
}

.todo-input button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.todo-input button:hover {
  background-color: #0069d9;
}

.filter-options {
  margin-bottom: 10px;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.completed {
  text-decoration: line-through;
}

.delete-button {
  margin-left: 10px;
  padding: 2px 5px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>
