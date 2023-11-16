import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import App from "./App.vue";

// Aggiungi icone alla libreria
library.add(fas);

// Crea un'app Vue
const app = createApp(App);

// Registra il componente FontAwesome
app.component("font-awesome-icon", FontAwesomeIcon);

// Monta l'app sul DOM
app.mount("#app");
