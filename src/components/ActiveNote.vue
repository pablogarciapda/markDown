<template>
  <transition name="fade" mode="out-in">
    <div v-if="activeNote" class="h-full | flex flex-col">
      <!-- Zona de edicion notas -->
      <div class="flex-1 | md:flex">
        <section class="flex-1">
          <ActiveNoteMD
            v-model:body="activeNote.body"
            @blur-note="blurNote"
            @update:body="updateNote"
            class="min-h-1/4 w-full h-full | bg-gray-200"
          />
        </section>

        <!-- componente -->
        <ActiveNoteHTML
          :body="activeNote.body"
          class="min-h-1/4 p-3 | bg-gray-900 text-white | flex-1"
        />
      </div>
      <!-- zona de acciones sobre notas -->
      <section
        class="mt-3 mr-3 | flex flex-col md:flex-row justify-between items-center"
      >
        <div class="text-sm mb-3 sm:mb-0">
          Creada el {{ creada }} contiene {{ contiene }} palabras
        </div>
        <div>
          <a
            @click.prevent="borraNota"
            href=""
            class=" py-1 px-3 mr-2 text-red-700 rounded-md"
            >Borra nota</a
          >
          <a
            @click.prevent="cierraNota"
            href=""
            class="bg-gray-200 py-1 px-3 rounded-md"
            >Cerrar nota</a
          >
        </div>
      </section>
    </div>
    <div v-else class="h-full | flex justify-center items-center">
      Por favor selecciona una nota o &nbsp;
      <a @click.prevent="createNote" class="underline font-bold" href=""
        >crea una nueva</a
      >&nbsp; 😁
    </div>
  </transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { debounce } from 'lodash';
import ActiveNoteHTML from './ActiveNoteHTML.vue';
import ActiveNoteMD from './ActiveNoteMD.vue';
export default {
  components: {
    ActiveNoteHTML,
    ActiveNoteMD
  },
  name: 'ActiveNote',
  setup() {
    const store = useStore();
    const activeNote = computed(() =>
      store.state.activeNote
        ? store.getters.getNoteById(store.state.activeNote)
        : null
    );
    const updateNote = debounce(
      value =>
        store.dispatch('updateNote', {
          id: activeNote.value.id,
          body: value
        }),
      1000
    );
    const cierraNota = () => store.commit('setActiveNote');
    //const borraNota = () => store.commit('deleteNote');
    const createNote = () => store.dispatch('createNote');
    const borraNota = () => store.commit('setBorrando', true);
    const blurNote = value => !value.length && store.dispatch('deleteNote');

    return {
      activeNote,
      updateNote,
      cierraNota,
      createNote,
      borraNota,
      blurNote,
      creada: computed(() =>
        new Date(activeNote.value.createdAt).toLocaleString()
      ),
      contiene: computed(() => activeNote.value.body.split(/\W+/).length)
    };
  }
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, 
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
