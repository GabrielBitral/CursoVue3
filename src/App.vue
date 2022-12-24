<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <barra-lateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="tarefas.length < 1">
          Você não está muito produtivo hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import ITarefa from './interfaces/ITarefa';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  setup() {
    const tarefas = ref([] as ITarefa[])
    const modoEscuroAtivo = ref(false)

    function salvarTarefa (tarefa : ITarefa) {
      tarefas.value.push(tarefa)
    }
    
    function trocarTema (modoEscuroAtivoTrocar : boolean) {
      modoEscuroAtivo.value = modoEscuroAtivoTrocar
    }

    return {
      tarefas,
      modoEscuroAtivo,

      salvarTarefa,
      trocarTema
    }
  }
});
</script>

<style scoped>
.lista{
    padding: 1rem;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>
