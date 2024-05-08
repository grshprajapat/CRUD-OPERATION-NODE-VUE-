<template>
  <div class="p-4">
    <ul>
      <li class="mb-4">
        <Item :items="items" />
      </li>
    </ul>
  </div>
</template>

<script>
import Item from './ItemV.vue';

export default {
  components: {
    Item,
  },
  props: {
    items: Array,
  },
};
</script>

<style scoped>
.mb-4 {
  margin-bottom: 1rem; /* You can adjust the value as needed */
}
</style>
