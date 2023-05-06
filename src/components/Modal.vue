<template>
    <div class="modal" :class="{ 'is-active': tarefaMudar }" v-if="tarefaMudar">
        <div class="modal-background"></div>
        <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">Editando uma tarefa</p>
            <button class="delete" aria-label="close" @click="fecharModal"></button>
        </header>
        <section class="modal-card-body">
            <div class="field">
                <label for="descricaoDaTarefa" class="label">
                    Descrição
                </label>
                <input 
                    v-model="tarefaMudar.descricao"
                    type="text"
                    class="input" 
                    id="descricaoDaTarefa"
                />
            </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button is-success" @click="alterarTarefa">Salvar Alterações</button>
            <button class="button" @click="fecharModal">Cancelar</button>
        </footer>
        </div>
    </div>
</template>

<script lang="ts">
import ITarefa from "@/interfaces/ITarefa";
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "Modal-card",
    emits: ['aoFecharModal', 'alteraTarefa'],
    props: {
        tarefaSelecionada: {
            type: Object,
            required: true,
            default: null
        }
    },
    setup(props, { emit }) {
        const tarefaMudar = ref(props.tarefaSelecionada as ITarefa | null)

        function fecharModal () {
            emit('aoFecharModal')
            tarefaMudar.value = null
        }

        function alterarTarefa () {
            emit('alteraTarefa', tarefaMudar.value)	
        }

        return {
            tarefaMudar,

            alterarTarefa,
            fecharModal
        }
    }
})
</script>
