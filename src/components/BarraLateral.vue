<template>
  <header>
    <h1>
        <img src="../assets/logo.png" alt="">
    </h1>
    <Button class="button" :texto="texto" @clicado="alterarTema()">
    </Button>
    <nav class="panel mt-5">
        <ul>
            <li>
                <router-link :to="'/'" class="link">
                    <i class="fas fa-tasks"></i>
                    <span>Tarefas</span>
                </router-link>
            </li>
            <li>
                <router-link :to="'/projetos'" class="link">
                    <i class="fas fa-project-diagram"></i>
                    <span>Projetos</span>
                </router-link>
            </li>
        </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Button from './Button.vue';
export default defineComponent({
    components: { Button },
    name: 'BarraLateral',
    emit: ['aoTemaAlterado'],
    setup (_, { emit }) {
        let modoEscuroAtivo = false
        const texto = ref('Ativar modo escuro')

        function alterarTema() {
            modoEscuroAtivo = !modoEscuroAtivo
            if (modoEscuroAtivo) {
                texto.value = 'Desativar modo escuro'
            } else {
                texto.value = 'Ativar modo escuro'
            }

            emit('aoTemaAlterado', modoEscuroAtivo)
        }

        return {
            texto,

            alterarTema
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    text-align: center;
}
@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}

.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
    display: flex;
    justify-content: flex-start;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>