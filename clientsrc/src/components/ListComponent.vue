<template>
  <div class="list">
    <div class="card">
      <div class="card-body">
        <h4 class="card-header">
          {{listProp.title}} -
          {{listProp.description}}
          <button
            class="btn btn-info"
            @click="createTaskToggle = !createTaskToggle"
          >
            <i class="fas fa-pencil-alt"></i>
          </button>
          <button class="btn btn-danger" @click="deleteList">
            <i class="fas fa-trash mx-1"></i>
          </button>
        </h4>
        <form class="card-body" @submit.prevent="addTask" v-if="createTaskToggle">
          <input type="text" placeholder="title" v-model="newTask.title" />
          <button class="btn btn-success" type="submit">Post Task</button>
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
      return this.$store.state.tasks;
    },
  },
  methods: {
    deleteList() {
      this.$store.dispatch("deleteList", this.listProp);
    },
    addTask() {
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
</style>