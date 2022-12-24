<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempo-em-segundos="tempoEmSegundos" />
        <Button :icon="'fas fa-play'" :texto="'Iniciar'" @clicado="iniciar" :disabled="cronometroRodando" />
        <Button :icon="'fas fa-stop'" :texto="'Parar'" @clicado="finalizar" :disabled="!cronometroRodando" />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Cronometro from './Cronometro.vue'
import Button from './Button.vue';
export default defineComponent({
    name: 'TemporizadorTracker',
    emits: ['aoTemporizadorFinalizado'],
    components: {
        Cronometro,
        Button
    },
    setup (_, { emit }) {
        const tempoEmSegundos = ref(0)
        const cronometroRodando = ref(false)
        let cronometro = 0
        const tempoDecorrido = computed(() => {
            return new Date(tempoEmSegundos.value * 1000).toISOString().substr(11,8)
        })
        function iniciar() {
            cronometroRodando.value = true
            cronometro = setInterval(() => {
                tempoEmSegundos.value += 1
            }, 1000)
        }

        function finalizar() {
            cronometroRodando.value  = false
            clearInterval(cronometro)
            emit('aoTemporizadorFinalizado', tempoEmSegundos.value)
            tempoEmSegundos.value = 0
        }

        return {
            tempoEmSegundos,
            tempoDecorrido,
            cronometro,
            cronometroRodando,

            iniciar,
            finalizar
        }
    }
})
</script>
