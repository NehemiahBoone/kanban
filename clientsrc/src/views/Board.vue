<template>
  <div class="board container-fluid bg-white" id="activeBoard">
    <div class="row">
      <div class="col-12">
        <h1>{{board.title}}</h1>
        <i @click="formToggle = !formToggle" class="fas fa-bars mb-3"></i>
        <form class="card-body" @submit.prevent="addList" v-if="formToggle">
          <input type="text" placeholder="title" v-model="newList.title" />
          <input type="text" placeholder="description" v-model="newList.description" />
          <button class="btn customBtnPost" type="submit">Create {{board.title}}</button>
        </form>
      </div>
    </div>
    <div class="row" v-if="board.title">
      <list-component v-for="list in lists" :key="list.id" :listProp="list" />
    </div>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
import listComponent from "../components/ListComponent.vue";
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getAllListsByBoardId", this.$route.params.boardId);
  },
  data() {
    return {
      newList: {},
      formToggle: false,
    };
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  props: ["boardId"],
  components: {
    listComponent,
  },
  methods: {
    addList() {
      let listData = {
        boardId: this.$route.params.boardId,
        title: this.newList.title,
        description: this.newList.description,
        creatorEmail: this.$store.state.user.creatorEmail,
      };
      this.$store.dispatch("createList", listData);
      this.newList = {};
      this.formToggle = false;
    },
  },
};
</script>

<style scoped>
#activeBoard {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.customBtnPost {
  background-color: #a7d49b;
}
</style>
