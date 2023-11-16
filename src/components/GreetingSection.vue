<script>
import DarkModeToggle from "./DarkModeToggle.vue";
import { ref, watch, onMounted } from "vue";

export default {
  data() {
    return {
      title: "Hello world",
    };
  },

  components: {
    DarkModeToggle,
  },

  setup() {
    const name = ref(localStorage.getItem("name") || "");

    watch(name, (newVal) => {
      localStorage.setItem("name", newVal);
    });

    // Non è necessario, poiché è già inizializzato in ref()
    // onMounted(() => {
    //   // name.value = localStorage.getItem("name") || "";
    // });

    return { name };
  },
};
</script>

<template>
  <section class="greeting w-full flex justify-between items-center">
    <h2>
      What's up,
      <input type="text" placeholder="Inserisci il Nome" v-model="name" />
    </h2>
    <DarkModeToggle />
  </section>
</template>

<style lang="scss" scoped></style>
