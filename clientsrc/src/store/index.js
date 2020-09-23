import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { api } from "./AxiosService"

Vue.use(Vuex)



export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    tasks: {},
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setActiveBoard(state, board) {
      state.activeBoard = board
    },
    removeBoard(state, boardId) {
      state.boards.filter(b => b.id != boardId)
    },
    editBoard(state, board) {
      let oldIndex = state.boards.findIndex(b => b.id == board.id)
      state.boards.splice(oldIndex, 1, board)
    },
    addList(state, list) {
      state.lists.push(list)
    },
    setLists(state, lists) {
      state.lists = lists
    },
    addTask(state, task) {
      state.tasks.push(task)
    },
    setTasks(state, payload) {
      // NOTE This doesnt work because javascript doesnt see addition of properties to objects as a change
      // state.tasks[payload.listId] = payload.tasks
      Vue.set(state.tasks, payload.listId, payload.tasks)
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile")
        commit("setUser", res.data)
      } catch (err) {
        console.error(err)
      }
    },
    async getActiveBoard({ commit }, boardId) {
      try {
        let res = await api.get("boards/" + boardId)
        commit("setActiveBoard", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBoard({ commit, dispatch }, boardId) {
      try {
        await api.delete("boards/" + boardId)
        commit("removeBoard", boardId)
        dispatch("getBoards")
      } catch (error) {
        console.error(error);
      }
    },
    async editBoard({ commit, dispatch }, boardData) {
      try {
        let res = await api.put("boards/" + boardData.id, boardData)
        commit("editBoard", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async createList({ commit }, newList) {
      try {
        let res = await api.post("/lists", newList)
        commit("addList", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async getAllListsByBoardId({ commit }, boardId) {
      try {
        let res = await api.get(`boards/${boardId}/lists`)
        console.log();
        commit("setLists", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async deleteList({ dispatch }, listProp) {
      try {
        let res = await api.delete("/lists/" + listProp.id)
        dispatch("getAllListsByBoardId", listProp.boardId)
      } catch (error) {
        console.error(error);
      }
    },
    async createTask({ dispatch }, task) {
      try {
        let res = await api.post("/tasks", task)
        dispatch("getAllTasksByListId", task.listId)
      } catch (error) {
        console.error(error);
      }
    },
    async getAllTasksByListId({ commit }, id) {
      try {
        let res = await api.get(`lists/${id}/tasks`)
        commit("setTasks", { listId: id, tasks: res.data })
      } catch (error) {
        console.error(error);
      }
    },
    async deleteTask({ dispatch }, task) {
      try {
        console.log(task);
        await api.delete("tasks/" + task.id)
        dispatch("getAllTasksByListId", task.listId)
      } catch (error) {
        console.error(error);
      }
    },
    async switchLists({ dispatch }, payload) {
      try {
        let res = await api.put("tasks/" + payload.id, payload)
        dispatch("getAllListsByBoardId", payload.boardId)
      } catch (error) {
        console.error(error);
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    }
    //#endregion


    //#region -- LISTS --



    //#endregion
  }
})
