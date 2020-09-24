<template>
  <div class="home bgImg text-light">
    <h1 class="pt-5">Welcome to KanBan!</h1>
    <h5>Sign in to view your boards!</h5>
  </div>
</template>


<script>
export default {
  name: "home",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
.bgImg {
  background-image: url("../assets/Kanban_Image.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}
</style>