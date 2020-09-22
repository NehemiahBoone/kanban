<template>
  <div class="board-component">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <router-link :to="{name: 'board', params: {boardId: boardProp.id}}">
            <h4 class="card-title">{{boardProp.title}}</h4>
            <p class="card-text">{{boardProp.description}}</p>
          </router-link>
          <form class="form-inline" @submit.prevent="editBoard" v-if="editToggle">
            <div>
              <input
                type="text"
                class="form-control my-1"
                placeholder="Edit Title..."
                aria-describedby="helpId"
                v-model="boardProp.title"
              />
              <input
                type="text"
                class="form-control my-1"
                placeholder="Edit Description..."
                aria-describedby="helpId"
                v-model="boardProp.description"
              />
            </div>
            <button type="submit" class="btn btn-warning mx-1">Post</button>
          </form>
          <button class="btn btn-info" type="button" @click="editToggle = !editToggle">Edit Board</button>
          <button class="btn btn-danger" @click="deleteBoard">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "boardComponent",
  props: ["boardProp"],
  data() {
    return {
      editToggle: false,
    };
  },
  computed: {},
  methods: {
    deleteBoard() {
      this.$store.dispatch("deleteBoard", this.boardProp.id);
    },
    editBoard() {
      this.$store.dispatch("editBoard", this.boardProp);
      this.editToggle = !this.editToggle;
    },
  },
  components: {},
};
</script>


<style scoped>
</style>