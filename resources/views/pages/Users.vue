<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Display Name',
          value: 'name',
        },
        {
          text: 'Description',
          value: 'description',
        },
      ],
      items: [],
    }
  },
  mounted() {},
}
</script>

<style></style>
