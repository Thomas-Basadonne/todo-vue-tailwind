<script setup>
// Importa le funzioni di Vue necessarie
import { ref, onMounted, computed, watch } from "vue";

// Dichiarazione di variabili reattive
const todos = ref([]); // Array contenente i todo
const input_content = ref(""); // Contenuto del nuovo todo
const input_category = ref(null); // Categoria del nuovo todo (inizializzata a null)

// Computed property per ordinare i todo in ordine decrescente di data di creazione
const todos_asc = computed(() =>
  todos.value.sort((a, b) => {
    return b.createdAt - a.createdAt;
  })
);

// Computed property per filtrare i todo in base alla categoria selezionata
const filteredTodos = computed(() => {
  if (!input_category.value) {
    return todos_asc.value;
  }

  return todos_asc.value.filter(
    (todo) => todo.category === input_category.value
  );
});

// Funzione per aggiungere un nuovo todo
const addTodo = () => {
  const inputValue = input_content.value.trim();
  if (inputValue === "" || input_category.value === null) {
    return;
  }

  // Aggiunge un nuovo todo all'array
  todos.value.push({
    content: inputValue,
    category: input_category.value,
    done: false,
    createdAt: new Date().getTime(),
  });

  // Resetta il contenuto dell'input e la categoria
  input_content.value = "";
  // input_category.value = null;
};

// Funzione per azzerare il filtro di categoria
const resetFilter = () => {
  input_category.value = "";
};

// Funzione per rimuovere un todo
const removeTodo = (todo) => {
  todos.value = todos.value.filter((t) => t !== todo);
};

// Watcher per monitorare i cambiamenti negli array dei todo e salvare nel localStorage
watch(
  todos,
  (newVal) => {
    localStorage.setItem("todos", JSON.stringify(newVal));
  },
  { deep: true } // Opzione "deep" per monitorare le modifiche nei sotto-oggetti
);

// Hook onMounted che viene eseguito dopo la creazione del componente
onMounted(() => {
  // Inizializza l'array dei todo con i dati memorizzati nel localStorage, se disponibili
  todos.value = JSON.parse(localStorage.getItem("todos")) || [];
});
</script>

<template>
  <!-- CREATE A TODO -->
  <section class="create-todo w-full">
    <h3>Crea la task</h3>
    <form @submit.prevent="addTodo">
      <div class="flex justify-start gap-1 my-2">
        <h4>Aggiungi una nuova <span class="font-semibold">Task</span></h4>
        <input type="text" placeholder="Scrivi qui" v-model="input_content" />
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
      </div>

      <input class="btn add" type="submit" value="Add Task" />
    </form>
  </section>

  <!-- TODO LIST -->

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
        <input type="checkbox" v-model="todo.done" />

        <div class="todo-content grow">
          <input
            type="text"
            v-model="todo.content"
            :class="{ 'done-text': todo.done }"
          />
        </div>

        <div class="flex justify-end w-full">
          <button
            class="btn delete transition-transform transform-gpu ease-out duration-300 flex items-center"
            @click="removeTodo(todo)"
            :class="{ 'done-btn': todo.done }"
          >
            <span class="hidden md:inline-block mr-1">Cancella</span>
            <font-awesome-icon
              :icon="['far', 'trash-can']"
              class="p-1 md:px-0"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
