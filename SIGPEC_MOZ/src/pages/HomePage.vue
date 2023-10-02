<template>
  <q-page-container>
    <q-page>
      <H1>Home Page</H1>
    </q-page>
  </q-page-container>
</template>
<script setup>
import { onMounted } from 'vue'
// import { useRepo } from 'pinia-orm'

onMounted(async () => {
  // Futura sincronizacao
  // Pegar dados do firebase
})
</script>

<style scoped>
#camera-container {
  width: 300px;
  height: 300px;
}
</style>
