<template>
  <div id="app" class="p-4">
    <h1 class="text-3xl mb-4">CRUD App with Vue.js and Tailwind CSS</h1>

    <!-- Modal for editing an item -->
    <div
      v-if="editingItem"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded w-1/2">
        <h2 class="text-2xl font-semibold mb-4">Edit Item</h2>
        <ItemForm :initialItem="editingItem" />
        <button
          @click="closeEditModal"
          class="mt-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
    <ItemForm :editingItem="editingItem" v-else />
    <ItemList :items="items" />
  </div>
</template>

<script>
import ItemForm from './components/ItemForm.vue';
import ItemList from './components/ItemList.vue';

export default {
  components: {
    ItemForm,
    ItemList,
  },
  data() {
    return {
      items: [], // Store the items here
      editingItem: null, // Item being edited (null if no editing)
    };
  },

  async created() {
    this.$socket.on('connect', () => {
      console.log('Socket connected');

      this.$socket.on('getRealTimeData', (item) => {
        this.getRealTimeData(item); // Call the updateItem method when 'itemUpdated' event is received
      });

      this.$socket.on('itemUpdated', (item) => {
        this.updateItem(item); // Call the updateItem method when 'itemUpdated' event is received
      });

      this.$socket.on('itemDeleted', (id) => {
        this.itemDeleted(id); // Call the itemDeleted method when 'itemDeleted' event is received
      });
    });

    this.$root.$on('edit-item', this.editItem);
    this.$root.$on('deleteItem', this.deleteItem);

    await this.getList();
  },

  methods: {
    deleteItem(id) {
      this.$socket.emit('delete-item', id);
    },
    itemDeleted(id) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1); // Remove the item from the array
      }
    },
    updateItem(item) {
      const index = this.items.findIndex((item) => item.id === item.id);

      if (index !== -1) {
        this.$set(this.items, index, item);
      }
    },
    async getList() {
      const response = await this.$axios.get(`/items`);
      this.items = response.data;
    },
    getRealTimeData(newItem) {
      this.items.push(newItem);
    },
    editItem(item) {
      // Show the edit modal and set the editingItem data
      this.editingItem = item;
    },
    closeEditModal() {
      // Close the edit modal and clear the editingItem data
      this.editingItem = null;
    },
  },
};
</script>
