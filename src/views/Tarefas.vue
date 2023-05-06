<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa"/>
        <Box v-if="tarefas.length < 1">
        Você não está muito produtivo hoje :(
        </Box>
    </div>
    <Modal v-if="tarefaSelecionada" :tarefa-selecionada="tarefaSelecionada" @aoFecharModal="fechouModal" @altera-tarefa="alterarTarefa"/>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import ITarefa from '../interfaces/ITarefa';
import Box from '../components/Box.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo_acoes';
import Modal from '@/components/Modal.vue';

export default defineComponent({
name: 'App',
components: {
    Formulario,
    Tarefa,
    Box,
    Modal
},
setup() {
    const store = useStore()
    const tarefaSelecionada = ref(null as ITarefa | null)
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    const tarefas = computed(() => { return store.state.tarefa.tarefas })

    function salvarTarefa (tarefa : ITarefa): void {
        store.dispatch(CADASTRAR_TAREFA, tarefa)
    }
    
    function selecionarTarefa (tarefa : ITarefa): void {
        tarefaSelecionada.value = tarefa
    }

    function fechouModal (): void {
        tarefaSelecionada.value = null
    }

    function alterarTarefa (item: ITarefa): void {
        store.dispatch(ALTERAR_TAREFA, item)
            .then(fechouModal)
    }

    return {
        tarefas,
        tarefaSelecionada,

        salvarTarefa,
        selecionarTarefa,
        fechouModal,
        alterarTarefa
    }
}
});
</script>
