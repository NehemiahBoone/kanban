<template>
  <div class="home bgImg container-fluid">
    <div class="row justify-content-center">
      <div class="card mt-5 cardGlow customCard">
        <div class="card-body">
          <h1 class="card-title">Welcome To Kanban!</h1>
          <h5 class="card-text">Sign in to view your boards!</h5>
        </div>
      </div>
    </div>
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
.cardGlow {
  border-color: solid 5px black;
  border-radius: 2%;
}
.card {
  box-shadow: 0px 0px 60px 0 #a7d49b;
  transition: 0.25s;
}
/* .card:hover { */
/* box-shadow: 0 23px 16px 0 rgba(99, 89, 243, 0.212); */
/* } */
.container {
  padding: 16px 16px;
}
.customCard {
  background-color: #a7d49b;
}
</style>