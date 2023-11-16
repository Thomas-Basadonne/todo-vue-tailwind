<script>
//libreria VueUse
import { useDark, useToggle } from "@vueuse/core";

export default {
  data() {
    return {
      title: "Toggle",
    };
  },

  setup() {
    const isDark = useDark();
    const toggleDark = useToggle(isDark);

    return { isDark, toggleDark };
  },
};
</script>

<template>
  <button @click="toggleDark()" class="transition duration-1000 ease-in-out">
    <font-awesome-icon
      :icon="isDark ? ['fas', 'sun'] : ['fas', 'moon']"
      class="text-2xl"
    />
  </button>
</template>
