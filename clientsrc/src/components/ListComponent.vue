<template>
  <div class="list col-4 mb-2">
    <div class="card">
      <div class="card-body">
        <h4 class="card-header">
          {{listProp.title}} -
          {{listProp.description}}
          <br />
          <button class="btn btn-info" @click="createTaskToggle = !createTaskToggle">
            <i class="fas fa-plus"></i>
          </button>
          <button class="customButton btn" @click="deleteList">
            <i class="fas fa-trash mx-1 text-light"></i>
          </button>
        </h4>
        <form class="card-body" @submit.prevent="addTask" v-if="createTaskToggle">
          <input type="text" placeholder="title" v-model="newTask.title" />
          <button class="btn customBtnPost" type="submit">Post Task</button>
        </form>
        <div>
          <task-component v-for="task in tasks" :key="task.id" :taskProp="task" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TaskComponent from "./TaskComponent.vue";
export default {
  name: "List",
  mounted() {
    this.$store.dispatch("getAllTasksByListId", this.listProp.id);
  },
  props: ["listProp"],
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
    tasks() {
      return this.$store.state.tasks[this.listProp.id];
    },
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp);
    },
    addTask() {
      this.createTaskToggle = false;
      this.newTask.listId = this.listProp.id;
      this.$store.dispatch("createTask", this.newTask);
    },
  },
  components: {
    TaskComponent,
  },
};
</script>


<style scoped>
.customBtnPost {
  background-color: #a7d49b;
}
.customButton {
  background-color: #ef6f6c;
}
</style>