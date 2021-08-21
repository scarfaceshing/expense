<template>
  <MainLayout>
    <template v-slot:default>
      <router-view />
    </template>
  </MainLayout>
</template>

<script>
import MainLayout from '../layout/Main.vue'

export default {
  components: {
    MainLayout,
  },
}
</script>

<style></style>
