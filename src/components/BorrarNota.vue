<template>
  <div
    class="h-full w-full | absolute top-0 left-0 | opacity-90 bg-gray-700 | flex justify-center items-center"
  >
    <article class="w-3/4 p-3 | bg-gray-200 rounded-xl shadow-md">
      <h6 class="text-center text-2xl">
        Estás seguro de borrarla: {{ $store.getters.getNoteTitle() }}
      </h6>
      <nav class="flex justify-end">
        <a @click.prevent="borrando" class="underline m-3 text-red-700" href=""
          >SI</a
        >
        <a @click.prevent="anular" class="underline m-3" href="">NO</a>
      </nav>
    </article>
  </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
  name: 'BorrarNota',
  setup() {
    const store = useStore();
    return {
      borrando: () => {
        store.dispatch('deleteNote');
        // store.commit('setBorrando', false);
      },
      anular: () => store.commit('setBorrando', false)
    };
  }
};
</script>
