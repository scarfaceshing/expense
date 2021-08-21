<template>
  <div>
    <PieChart :chartdata="circledata" :options="options" />
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
      circledata: {
        labels: [],
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
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  methods: {
    async loadData() {
      return await http.get('/data/expenses')
    },
  },
  created() {
    this.loadData().then((res) => {
      res.data.map((item, index) => {
        this.circledata.labels[index] = item.expenses_category
        this.circledata.datasets[0].data[index] = item.amount
      })
    })
  },
}
</script>

<style></style>
