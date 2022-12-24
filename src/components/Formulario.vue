<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa.">
                <input v-model="descricao" type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" />
            </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
export default defineComponent({
    name: 'FormulárioTracker',
    components: {
        Temporizador
    },
    emits: ['aoSalvarTarefa'],
    setup(_, { emit }) {
        const descricao = ref('')
        function finalizarTarefa(tempoDecorrido: number): void {
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value
            })
            descricao.value = ''
        }

        return {
            descricao,

            finalizarTarefa
        }
    },
})
</script>

<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>