import { Estado } from "@/store";
import http from "@/http"
import { Module } from "vuex";
import ITarefa from "@/interfaces/ITarefa";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, EXCLUIR_TAREFA } from "@/store/tipo_mutacoes";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo_acoes";

export interface EstadoTarefa {
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    state: {
        tarefas: []
    },
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(proj => proj.id === tarefa.id)
            state.tarefas[index] = tarefa
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [EXCLUIR_TAREFA](state, idTarefa: number) {
            state.tarefas = state.tarefas.filter(proj => proj.id !== idTarefa)
        },
    },
    actions: {
        [OBTER_TAREFAS] ({ commit }) {
            http.get('tarefas')
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa)
                .then(resposta => commit(ADICIONA_TAREFA, resposta.data))
        },
        [ALTERAR_TAREFA] ({ commit }, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa)
                .then(() => commit(ALTERAR_TAREFA, tarefa))
        }
    }
}