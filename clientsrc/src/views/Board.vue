<template>
  <div class="board container-fluid">
    <div class="row" v-if="board.title">
      <div class="card col-12">
        <div class="card-body">
          <h4 class="card-title">{{board.title}}</h4>
          <p class="card-text">{{board.description}}</p>
        </div>
      </div>
    </div>
    <h1 v-else>Loading...</h1>
  </div>
</template>

<script>
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
  },
  props: ["boardId"],
};
</script>
