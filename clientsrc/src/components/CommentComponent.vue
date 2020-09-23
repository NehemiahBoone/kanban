<template>
  <div class="comment">
    <small>
      {{commentProp.title}}
      <i @click="deleteComment" class="fas fa-minus text-danger"></i>
    </small>
  </div>
</template>


<script>
export default {
  name: "Comment",
  props: ["commentProp", "taskCom", "index"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteComment() {
      let task = { ...this.taskCom };
      task.comments.splice(this.index, 1);
      this.$store.dispatch("deleteComment", task);
    },
  },
  components: {},
};
</script>


<style scoped>
</style>