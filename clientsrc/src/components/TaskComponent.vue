<template>
  <div class="task">
    <ul>
      <li>
        {{taskProp.title}}
        <i @click="deleteTask" class="fas fa-trash text-danger"></i>
      </li>
      <select @change="switchLists" v-model="changeList.listId">
        <option v-for="list in lists" :key="list.id" :value="list.id">{{list.title}}</option>
      </select>
    </ul>
  </div>
</template>


<script>
export default {
  name: "Task",
  props: ["taskProp"],
  data() {
    return {
      createTaskToggle: false,
      newTask: {},
      changeList: {},
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
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp);
    },
    addTask() {
      newTask.listId = this.listProp.id;
      this.$store.dispatch("createTask", this.newTask);
    },
    deleteTask() {
      console.log(this.taskProp);
      this.$store.dispatch("deleteTask", this.taskProp);
    },
    switchLists() {
      this.$store.dispatch("switchLists", {
        id: this.taskProp.id,
        oldList: this.taskProp.listId,
        listId: this.changeList.listId,
        boardId: this.$route.params.boardId,
      });
    },
  },
  components: {},
};
</script>


<style scoped>
</style>