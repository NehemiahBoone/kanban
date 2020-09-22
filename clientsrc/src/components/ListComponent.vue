<template>
  <div class="list">
    <div class="row">
      <div class="card col-3">
        <div class="card-body">
          <h4 class="card-title">{{listProp.title}}</h4>
          <div class="card-text">
            <p>{{listProp.description}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "List",
  props: ["listProp"],
  data() {
    return {};
  },
  computed: {
    board() {
      return this.$store.state.activeBoard;
    },
    lists() {
      return this.$store.state.lists;
    },
  },
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>