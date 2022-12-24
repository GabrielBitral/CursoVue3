<template>
    <button class="button" @click="clicado">
        <span v-if="icon" class="icon">
            <i :class="icon"></i>
        </span>
        <span>{{ texto }}</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ButtonTracker',
    emits: ['clicado'],
    props: {
        icon: {
            type: String,
            default: ''
        },
        texto: {
            type: String,
            default: 'Parar'
        }
    },
    setup(_, { emit }) {
        function clicado() : void {
            emit('clicado')
        }

        return {
            clicado
        }
    }
})
</script>