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
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from '@/store/tipo_acoes';

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
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                })
                    .then(() => casoSucesso())
            } else {
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(() => casoSucesso())
            }
        }

        function casoSucesso () {
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
