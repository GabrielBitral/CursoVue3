<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="tarefas.length < 1">
        Você não está muito produtivo hoje :(
        </Box>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';

export default defineComponent({
name: 'App',
components: {
    Formulario,
    Tarefa,
    Box
},
setup() {
    const tarefas = ref([] as ITarefa[])

    function salvarTarefa (tarefa : ITarefa) {
        tarefas.value.push(tarefa)
    }
    

    return {
        tarefas,

        salvarTarefa
    }
}
});
</script>
