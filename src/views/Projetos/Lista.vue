<template>
    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.nome }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="excluirProjeto(projeto.id)">
                            <span class="icon is-small">
                            <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo_acoes';
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'ListaTracker',
    setup() {
        const store = useStore()
        const projetos = computed(() => store.state.projeto.projetos)
        store.dispatch(OBTER_PROJETOS)
    
        function excluirProjeto(id: number) {
            store.dispatch(REMOVER_PROJETO, id)
        }

        return {
            projetos,

            excluirProjeto
        }
    }
})
</script>
