import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import 'tailwindcss/tailwind.css';

// cargamos las notas del archivo json

// import notes from '@/seed.json';
// store.commit('setNotes', notes);

// comprobamos si hay usuario autentificado
store.dispatch('checkAuth');

createApp(App)
  .use(store)
  .mount('#app');
