<template>
  <div class="board-component" id="boardComp">
    <div class="card mb-2">
      <div class="card-body bBackground">
        <router-link :to="{name: 'board', params: {boardId: boardProp.id}}">
          <p class="card-header hBackground text-dark">
            <b>{{boardProp.title}}</b>
          </p>
          <p class="card-text text-dark">{{boardProp.description}}</p>
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
          <button type="submit" class="btn btn-info mx-1">Update</button>
        </form>
        <div class="card-footer d-flex flex-row-reverse">
          <button class="btn btn-info" type="button" @click="editToggle = !editToggle">Edit Board</button>
          <button class="btn customDelete text-light" @click="deleteBoard">Delete</button>
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
#boardComp {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
.bBackground {
  background-color: #0496591c;
}
.hBackground {
  background-color: #0a503f36;
}
.customDelete {
  background-color: #ef6f6c;
}
</style>