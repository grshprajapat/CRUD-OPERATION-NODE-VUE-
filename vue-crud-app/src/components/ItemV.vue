<template>
  <div class="p-4">
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="py-3 px-4 font-semibold bg-blue-200 text-blue-700">
            Name
          </th>
          <th class="py-3 px-4 font-semibold bg-green-200 text-green-700">
            Age
          </th>
          <th class="py-3 px-4 font-semibold bg-yellow-200 text-yellow-700">
            Contact
          </th>
          <th class="py-3 px-4 font-semibold bg-purple-200 text-purple-700">
            Occupation
          </th>
          <th class="py-3 px-4 text-center font-semibold bg-gray-200">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t border-gray-200">
          <td class="py-3 px-4">{{ item.name }}</td>
          <td class="py-3 px-4">{{ item.age }}</td>
          <td class="py-3 px-4">{{ item.contact }}</td>
          <td class="py-3 px-4">{{ item.occupation }}</td>
          <td class="py-3 px-4 text-center">
            <button
              @click="editItem(item)"
              class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-full focus:outline-none"
            >
              Edit
            </button>
            {{''}}
            <button
              @click="deleteItem(item.id)"
              class="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-full focus:outline-none"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  methods: {
    editItem(item) {
      this.$root.$emit('edit-item', item)
    },
    deleteItem(id) {
      this.$root.$emit('deleteItem', id)
    },
  },
};
</script>

<style scoped>
/* Tailwind classes or custom styles */

/* Style for the header row */
.bg-gray-100 {
  background-color: #f7fafc;
}

/* Style for table cells */
td {
  border-color: #cbd5e0;
  transition: background-color 0.3s;
}

/*
