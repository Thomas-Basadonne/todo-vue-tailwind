<script>
// import MyComponent from "./components/MyComponent.vue";

export default {
  data() {
    return {
      title: "Header",
    };
  },
};
</script>

<template>
  <div class="relative jumbo h-96">
    <h1>
      Il tuo
      <span class="text-lightmode-100">Task Manager</span>
    </h1>

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
</template>

<style lang="scss" scoped></style>
