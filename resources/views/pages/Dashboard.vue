<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-row>
          <v-col>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>Expense Category</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in displayData" :key="index">
                    <td>
                      <strong>{{ item.expense_cat_relation.name }}</strong>
                    </td>
                    <td>$ {{ item.total }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <PieChart v-if="showChart" :chartdata="circledata" :options="options" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import http from '../../js/http'
// import Chart from '../component/Chart.vue'

export default {
  components: {
    PieChart: () => import('../component/Chart.vue'),
  },
  data() {
    return {
      showChart: false,
      circledata: {
        labels: ['A', 'B'],
        datasets: [
          {
            backgroundColor: [
              '#50826a',
              '#1e6937',
              '#435473',
              '#2aaeb2',
              '#814e35',
              '#92f037',
              '#173f8',
              '#6e1445',
              '#dd162e',
              '#5c1095',
              '#ee8cdf',
              '#16af51',
              '#ac65df',
              '#3c19aa',
            ],
            data: [1, 2],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      displayData: [],
    }
  },
  methods: {
    async loadData() {
      return await http.get('/data/dashboard')
    },
  },
  beforeDestroy() {
    this.showChart = false
  },
  created() {
    this.loadData().then((res) => {
      if (res.status === 200 && res.statusText === 'OK') {
        this.displayData = res.data

        this.displayData.map((item, index) => {
          this.circledata.labels[index] = item.expense_cat_relation.name
          this.circledata.datasets[0].data[index] = item.total
        })

        this.showChart = true
      }
    })
  },
}
</script>

<style></style>
