<template>
  <div class="task">
    <ul>
      <li>
        {{taskProp.title}}
        <i @click="deleteTask" class="fas fa-trash text-danger"></i>
      </li>
      <select>
        <option
          @click="switchLists"
          v-for="list in lists"
          :key="list.id"
          :value="list.id"
        >{{list.title}}</option>
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
  },
  components: {},
};
</script>


<style scoped>
</style>