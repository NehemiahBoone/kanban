<template>
  <div class="task">
    <ul>
      <li>
        {{taskProp.title}}
        <comment-component
          v-for="(comment,index) in comments"
          :key="comment._id"
          :index="index"
          :commentProp="comment"
          :taskCom="taskProp"
        />
        <i @click="deleteTask" class="fas fa-trash text-danger"></i>
        <i @click="commentToggle = !commentToggle" class="fas fa-pencil-alt text-info"></i>
        <select @change="switchLists" v-model="changeList.listId">
          <option v-for="list in lists" :key="list.id" :value="list.id">{{list.title}}</option>
        </select>
        <form class="card-body" @submit.prevent="addComment" v-if="commentToggle">
          <input type="text" placeholder="Comment..." v-model="newComment.title" />
          <button class="btn btn-success" type="submit">Post Comment</button>
        </form>
      </li>
    </ul>
  </div>
</template>


<script>
import commentComponent from "./CommentComponent.vue";
export default {
  name: "Task",
  props: ["taskProp"],
  data() {
    return {
      createTaskToggle: false,
      newTask: {},
      newComment: {},
      changeList: {},
      commentToggle: false,
    };
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
    comments() {
      return this.taskProp.comments;
      // return this.$store.state.tasks[taskId: this.taskProp.listId]
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
    addComment() {
      let taskData = {
        ...this.taskProp,
      };
      taskData.comments.push(this.newComment);
      this.$store.dispatch("addComment", taskData);
      this.newComment = {};
    },
  },
  components: {
    commentComponent,
  },
};
</script>


<style scoped>
</style>