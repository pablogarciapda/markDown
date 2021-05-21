<template>
  <!-- Modal para confirmar borrado de nota -->
  <borrar-nota v-if="borrando" />
  <div
    v-if="$store.state.user"
    class="container | min-h-1/2 p-3 my-3 | bg-white rounded-xl shadow-2xl | md:flex"
  >
    <!-- parte izquierda -->
    <section class="md:w-1/4 p-3 mr-3| bg-gray-100">
      <a
        @click.prevent="$store.dispatch('userLogout')"
        class="underline text-center block font-bold mb-3"
        href=""
        >Logout</a
      >
      <!-- busqueda de notas -->

      <search-note />

      <!-- lista de notas -->

      <note-list />
    </section>

    <!-- parte derecha -->

    <section class="p-3 | flex-grow">
      <!-- nota activa -->
      <active-note />
    </section>
  </div>
  <div v-else>
    <a
      @click.prevent="$store.dispatch('userLogin')"
      class="w-full h-screen | flex justify-center items-center | underline"
      href=""
      >Login please</a
    >
  </div>
</template>

<script>
import ActiveNote from './components/ActiveNote.vue';
import BorrarNota from './components/BorrarNota.vue';
import NoteList from './components/NoteList.vue';
import SearchNote from './components/SearchNote.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: { NoteList, ActiveNote, BorrarNota, SearchNote },
  name: 'App',
  setup() {
    const store = useStore();
    return {
      borrando: computed(() => store.state.borrando)
    };
  }
};
</script>

<style>
.dev {
  border: 1px solid red;
}
</style>
