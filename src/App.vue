<script setup>
import { ref, onMounted, computed, watch } from "vue";

const todos = ref([]);
const name = ref([""]);

const input_content = ref([""]);
const input_category = ref(null);

const categories = ref(["coding", "personal", "workout", "film"]);
const selectedCategory = ref(null);

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

const filteredTodos = computed(() => {
  if (!selectedCategory) {
    return todos_asc.value;
  } else {
    return todos_asc.value.filter((todo) => todo.category === selectedCategory);
  }
});

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
  <h1>Dai Vita alla Tua Produttività con il Task Manager Personalizzato</h1>
  <!-- <select v-model="selectedCategory" class="my-2">
    <option value="" disabled>Seleziona una categoria</option>
    <option v-for="category in categories" :key="category" :value="category">
      {{ category }}
    </option>
  </select> -->
  <main class="app">
    <section class="greeting">
      <h2>
        What's up,
        <input type="text" placeholder="Inserisci il Nome" v-model="name" />
      </h2>
    </section>

    <section class="create-todo w-full">
      <h3>Crea la task</h3>
      <form @submit.prevent="addTodo">
        <div class="flex justify-start gap-1 my-2">
          <h4>Aggiungi una nuova <span class="font-semibold">Task</span></h4>
          <input type="text" placeholder="Scrivi qui" v-model="input_content" />
          <!-- {{ input_content }} -->
        </div>
        <h4 class="my-2">
          Scegli la <span class="font-semibold">categoria:</span>
        </h4>
        <div class="options grid grid-cols-4 gap-4 my-2">
          <label class="flex items-center gap-1 category coding">
            <input
              type="radio"
              name="category"
              value="coding"
              v-model="input_category"
            />
            <div>Coding</div>
          </label>
          <label class="flex items-center gap-1 category personal">
            <input
              type="radio"
              name="category"
              value="personal"
              v-model="input_category"
            />
            <div>Personal</div>
          </label>
          <label class="flex items-center gap-1 category workout">
            <input
              type="radio"
              name="category"
              value="workout"
              v-model="input_category"
            />
            <div>Workout</div>
          </label>
          <label class="flex items-center gap-1 category film">
            <input
              type="radio"
              name="category"
              value="film"
              v-model="input_category"
            />
            <div>Film</div>
          </label>
          <!-- {{ input_category }} -->
        </div>

        <input class="btn add" type="submit" value="Add Task" />
      </form>
    </section>

    <section class="todo-list w-full">
      <h3>Todo List</h3>
      <div class="list">
        <div
          v-for="todo in todos_asc"
          :class="['todo-item', todo.category, { done: todo.done }]"
        >
          <input type="checkbox" v-model="todo.done" />

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>

          <div class="flex justify-end w-full">
            <button class="btn delete" @click="removeTodo(todo)">
              Cancella
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
