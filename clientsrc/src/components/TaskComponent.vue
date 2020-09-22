<template>
  <div class="task">
    <ul>
      <li>{{taskProp.title}}</li>
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
  },
  components: {},
};
</script>


<style scoped>
</style>