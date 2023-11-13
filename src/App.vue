<script setup>
import { ref, onMounted, computed, watch } from "vue";

const todos = ref([]);
const name = ref([""]);

const input_content = ref([""]);
const input_category = ref(null);

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const addTodo = () => {
  if (input_content.value.trim() === "" || input_category.value === null) {
    return;
  }

  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  });

  input_content.value = "";
  input_category.value = "";
};

const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true }
);

watch(name, (newVal) => {
  localStorage.setItem("name", newVal);
});

onMounted(() => {
  name.value = localStorage.getItem("name") || "";
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
  <h1 class="text-3xl font-bold underline">ciaooo</h1>

  <main class="app">
    <section class="greeting">
      <h2 class="title">
        Come va
        <input type="text" placeholder="Inserisci il Nome" v-model="name" />?
        Pronto ad essere produttivo?
      </h2>
    </section>

    <section class="create-todo">
      <h3>Crea la task</h3>
      <form @submit.prevent="addTodo">
        <h4>Aggiungi i tuoi task</h4>
        <input
          type="text"
          placeholder="Studia Tailwind"
          v-model="input_content"
        />
        <!-- {{ input_content }} -->
        <h4>Scegli la categoria</h4>
        <div class="options">
          <label for="">
            <input
              type="radio"
              name="category"
              value="coding"
              v-model="input_category"
            />
            <div>Coding</div>
          </label>
          <label for="">
            <input
              type="radio"
              name="category"
              value="personal"
              v-model="input_category"
            />
            <div>Personal</div>
          </label>
          <!-- {{ input_category }} -->
        </div>

        <input type="submit" value="Add Task" />
      </form>
    </section>

    <section class="todo-list">
      <h3>Todo List</h3>
      <div class="list">
        <div
          v-for="todo in todos_asc"
          :class="['todo-item', { done: todo.done }]"
        >
          <label
            ><input type="checkbox" v-model="todo.done" />
            <span :class="['bubble', todo.category]"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">cancella</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
