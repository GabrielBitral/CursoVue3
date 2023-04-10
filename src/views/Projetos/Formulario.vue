<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input 
                    v-model="nomeDoProjeto"
                    type="text"
                    class="input" 
                    name="nomeDoProjeto" 
                    id="nomeDoProjeto"
                />
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { TipoNotificacao } from '@/interfaces/INotificacao';
import { useStore } from '@/store';
import { ALTERA_PROJETO, ADICIONA_PROJETO } from '@/store/tipo_mutacoes';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useNotificador from '@/hooks/notificador'

export default defineComponent({
    name: 'FormularioTracker',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const store = useStore()
        const router = useRouter()
        const { notificar } = useNotificador()
        const nomeDoProjeto = ref('')

        onMounted(() => {
            if (props.id) {
                const projeto = store.state.projetos.find(proj => proj.id === props.id)
                nomeDoProjeto.value = projeto?.nome || ''
            }
        })
    
        function salvar () {
            if (props.id) {
                store.commit(ALTERA_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                })
            } else {
                store.commit(ADICIONA_PROJETO, nomeDoProjeto.value)
            }
            nomeDoProjeto.value = ''
            notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi salvo com sucesso!')
            router.push('/projetos')
        }
    
        return {
            nomeDoProjeto,
            store,

            salvar
        }
    }
})
</script>
