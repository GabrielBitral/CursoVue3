<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <div class="field">
            <p class="control has-icons-left">
                <input v-model="filtro" class="input" type="text" placeholder="Digite para filtrar">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Box v-if="tarefas.length < 1">
            Você não está muito produtivo hoje :(
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    </div>
    <Modal v-if="tarefaSelecionada" :mostrar="tarefaSelecionada ? true : false">
        <template v-slot:cabecalho>
            <p class="modal-card-title">Editando uma tarefa</p>
            <button class="delete" aria-label="close" @click="fechouModal"></button>
        </template>
        <template v-slot:corpo>
            <div class="field">
                <label for="descricaoDaTarefa" class="label">
                    Descrição
                </label>
                <input 
                    v-model="tarefaSelecionada.descricao"
                    type="text"
                    class="input" 
                    id="descricaoDaTarefa"
                />
            </div>
        </template>
        <template v-slot:rodape>
            <button class="button is-success" @click="alterarTarefa">Salvar Alterações</button>
            <button class="button" @click="fechouModal">Cancelar</button>
        </template>
    </Modal>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
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
        const filtro = ref('')
        store.dispatch(OBTER_TAREFAS)
        store.dispatch(OBTER_PROJETOS)
        const tarefas = computed(() => store.state.tarefa.tarefas)
        // filter(t => !filtro.value || t.descricao.includes(filtro.value))

        watchEffect(() => {
            store.dispatch(OBTER_TAREFAS, filtro.value)
        })

        function salvarTarefa(tarefa: ITarefa): void {
            store.dispatch(CADASTRAR_TAREFA, tarefa)
        }

        function selecionarTarefa(tarefa: ITarefa): void {
            tarefaSelecionada.value = tarefa
        }

        function fechouModal(): void {
            tarefaSelecionada.value = null
        }

        function alterarTarefa(): void {
            store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
                .then(fechouModal)
        }

        return {
            tarefas,
            tarefaSelecionada,
            filtro,

            salvarTarefa,
            selecionarTarefa,
            fechouModal,
            alterarTarefa
        }
    }
});
</script>
