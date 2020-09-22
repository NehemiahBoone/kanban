<template>
  <div class="boards">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 card">
          <form class="card-body" @submit.prevent="addBoard">
            <input type="text" placeholder="title" v-model="newBoard.title" required />
            <input type="text" placeholder="description" v-model="newBoard.description" />
            <button class="btn btn-success" type="submit">Create Board</button>
          </form>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row"></div>
      <div v-for="b in allBoards" :key="b.id">
        <board-component :boardProp="b" />
        <form class="form-inline collapse" @submit.prevent="editBoard(b.id)" :id="'board'+b.id">
          <div>
            <input
              type="text"
              class="form-control my-1"
              placeholder="Edit Title..."
              aria-describedby="helpId"
              v-model="boardData.title"
            />
            <input
              type="text"
              class="form-control my-1"
              placeholder="Edit Description..."
              aria-describedby="helpId"
              v-model="boardData.description"
            />
          </div>
          <button type="submit" class="btn btn-warning mx-1">Post</button>
        </form>
        <button
          class="btn btn-info"
          type="button"
          data-toggle="collapse"
          :data-target="'#board' + b.id"
        >Edit Board</button>
        <button class="btn btn-danger" @click="deleteBoard(b.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import boardComponent from "../components/BoardComponent.vue";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
      boardData: {},
      editToggle: false,
    };
  },
  computed: {
    allBoards() {
      return this.$store.state.boards;
    },
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId);
    },
    editBoard(boardId) {
      this.boardData.id = boardId;
      this.$store.dispatch("editBoard", this.boardData);
    },
  },
  components: {
    boardComponent,
  },
};
</script>