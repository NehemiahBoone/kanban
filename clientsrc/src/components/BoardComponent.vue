<template>
  <div class="board-component">
    <div class="col-12">
      <div class="card">
        <router-link :to="{name: 'board', params: {boardId: boardProp.id}}">
          <div @click="setActiveBoard" class="card-body">
            <h4 class="card-title">{{boardProp.title}}</h4>
            <p class="card-text">{{boardProp.description}}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "boardComponent",
  props: ["boardProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>


<style scoped>
</style>