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
import http from '../../js/http'

export default {
  data() {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Description',
          value: 'description',
        },
        {
          text: 'Created At',
          value: 'created_at',
        },
      ],
      items: [],
    }
  },
  methods: {
    async loadData() {
      const { data } = await http.get('/data/role')

      this.items = data
    },
  },
  mounted() {
    this.loadData()
  },
}
</script>

<style></style>
