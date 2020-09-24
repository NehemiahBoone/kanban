<template>
  <div class="boards" id="boards">
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 card">
            <form class="card-body" @submit.prevent="addBoard">
              <input type="text" placeholder="title" v-model="newBoard.title" required />
              <input type="text" placeholder="description" v-model="newBoard.description" />
              <button class="btn customBtnPost" type="submit">Create Board</button>
            </form>
          </div>
        </div>
      </div>
      <div class="container-fluid bg-white">
        <div class="row">
          <board-component class="col-4" v-for="b in allBoards" :key="b.id" :boardProp="b" />
        </div>
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
  },
  components: {
    boardComponent,
  },
};
</script>

<style scoped>
#boards {
  background-color: white;
  height: 100vh;
  overflow-y: hidden;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.customBtnPost {
  background-color: #a7d49b;
}
</style>