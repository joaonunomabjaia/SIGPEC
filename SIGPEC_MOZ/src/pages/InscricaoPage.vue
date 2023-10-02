<template>
  <q-page-container>
    <q-page>
      <ListaInscricoes v-if="listing">
      </ListaInscricoes>
      <RegistoInscricao v-if="registing" />
    </q-page>
  </q-page-container>
</template>

<script setup>
// import axios from 'axios'
import { ref, onMounted, provide } from 'vue'
import ListaInscricoes from 'src/components/inscricao/lista.vue'
import RegistoInscricao from 'src/components/inscricao/formulario.vue'

const listing = ref(true)
const registing = ref(false)

// lifecycle hooks
onMounted(() => {
  // ---
})

const switchListRegisterMode = () => {
  listing.value = !listing.value
  registing.value = !registing.value
}

provide('listing', listing)
provide('registing', registing)
provide('switchListRegisterMode', switchListRegisterMode)
</script>
