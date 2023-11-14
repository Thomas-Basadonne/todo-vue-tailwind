<script setup>
import { ref, onMounted, computed, watch } from "vue";

//libreria VueUse
import { useDark, useToggle } from "@vueuse/core";

//gestione del tema
const isDark = useDark();
const toggleDark = useToggle(isDark);

const todos = ref([]);
const name = ref([""]);

const input_content = ref([""]);
const input_category = ref(null);

const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

const filteredTodos = computed(() => {
  if (!input_category.value) {
    return todos_asc.value;
  }

  return todos_asc.value.filter(
    (todo) => todo.category === input_category.value
  );
});

const addTodo = () => {
  // Ottieni il valore come stringa e quindi rimuovi gli spazi vuoti
  const inputValue = input_content.value[0].trim();
  if (inputValue === "" || input_category.value === null) {
    return;
  }

  todos.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  });

  input_content.value = "";
  // input_category.value = "";
};

const resetFilter = () => {
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
  <div class="relative jumbo h-96">
    <h1>
      Il tuo
      <span class="text-lightmode-100">Task Manager</span>
    </h1>
    <button @click="toggleDark()">{{ isDark ? "Light" : "Dark" }} mode</button>
    <div class="absolute bottom-0 left-0 w-full dark:invisible">
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        style="width: 100%; height: 85px; transform: rotate(180deg)"
      >
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #3c82f6" />
            <stop offset="100%" style="stop-color: #16b6d4" />
          </linearGradient>
        </defs>
        <path
          d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z"
          fill="url(#grad)"
        />
      </svg>
    </div>
    <div class="absolute bottom-0 left-0 w-full invisible dark:visible">
      <svg
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
        style="width: 100%; height: 85px; transform: rotate(180deg)"
      >
        <defs>
          <linearGradient id="dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color: #7752fe" />
            <stop offset="100%" style="stop-color: #190482" />
          </linearGradient>
        </defs>
        <path
          d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z"
          fill="url(#dark)"
        />
      </svg>
    </div>
  </div>
  <main class="app mt-[-220px]">
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
        <div class="options grid grid-cols-2 lg:grid-cols-4 gap-4 my-2">
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
      <div class="flex justify-between items-center">
        <h3>Todo List:</h3>
        <button
          class="btn reset bg-lightmode-400 dark:bg-darkmode-300"
          @click="resetFilter"
        >
          Vedi tutti
        </button>
      </div>
      <div class="list">
        <div
          v-for="todo in filteredTodos"
          :class="['todo-item', todo.category, { done: todo.done }]"
        >
          <input
            class="checked:bg-red-500"
            type="checkbox"
            v-model="todo.done"
          />

          <div class="todo-content grow">
            <input
              type="text"
              v-model="todo.content"
              :class="{ 'done-text': todo.done }"
            />
          </div>

          <div class="flex justify-end w-full">
            <button
              class="btn delete transition-transform transform-gpu ease-out duration-300"
              @click="removeTodo(todo)"
              :class="{ 'done-btn': todo.done }"
            >
              Cancella
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped></style>
