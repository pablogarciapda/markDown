<template>
  <div
    class="h-full w-full | absolute top-0 left-0 | opacity-90 bg-gray-700 | flex justify-center items-center"
  >
    <article class="w-3/4 p-3 | bg-gray-200 rounded-xl shadow-md">
      <h6 class="text-center text-2xl">
        Estás seguro de borrar: {{ $store.getters.getNoteTitle() }}
      </h6>
      <nav class="flex justify-end">
        <a
          class="underline mr-3 text-red-700"
          @click.prevent="$store.commit('deleteNote')"
          href=""
          >SI</a
        >
        <a
          class="underline mr-3"
          @click.prevent="$store.state.borrando = false"
          href=""
          >NO</a
        >
      </nav>
    </article>
  </div>
</template>

<script>
export default {
  name: 'BorrarNota'
};
</script>
