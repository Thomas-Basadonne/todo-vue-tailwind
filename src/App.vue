<script setup>
import Header from "./components/Header.vue";
import GreetingSection from "./components/GreetingSection.vue";
import TodoSection from "./components/TodoSection.vue";
</script>

<template>
  <Header />

  <main class="app mt-[-220px]">
    <GreetingSection />
    <TodoSection />
  </main>
</template>

<style scoped></style>
