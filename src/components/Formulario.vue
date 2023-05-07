<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa.">
                <input v-model="descricao" type="text" class="input" placeholder="Qual tarefa você deseja iniciar?" />
            </div>
            <div class="column is-3">
                <div class="select">
                  <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                      :value="projeto.id"
                      v-for="projeto in projetos"
                      :key="projeto.id"
                    >
                      {{ projeto.nome }}
                    </option>
                  </select>
                </div>
              </div>
            <div class="column">
                <Temporizador @ao-temporizador-finalizado="finalizarTarefa" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store'

export default defineComponent({
    name: 'FormulárioTracker',
    components: {
        Temporizador
    },
    emits: ['aoSalvarTarefa'],
    setup(_, { emit }) {
        const descricao = ref('')
        const idProjeto = ref(0)
        const store = useStore(key)
        const projetos = computed(() => store.state.projeto.projetos)

        const finalizarTarefa = (tempoDecorrido: number): void => {
            // const projeto = projetos.value.find((p) => p.id == idProjeto.value); // primeiro, buscamos pelo projeto
            // if(!projeto) { // se o projeto não existe...
            //     store.commit(NOTIFICAR, {
            //         titulo: 'Ops!',
            //         texto: "Selecione um projeto antes de finalizar a tarefa!",
            //         tipo: TipoNotificacao.FALHA,
            //     }); // notificamos o usuário
            //     return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
            // }
            emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: descricao.value,
                projeto: projetos.value.find(proj => proj.id === idProjeto.value)
            })
            descricao.value = ''
        }

        return {
            descricao,
            idProjeto,
            projetos,

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