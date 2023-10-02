<template>
  <div>
    <div class="q-pa-md">
      <div class="row no-wrap items-center q-pa-sm bg-grey-3 rounded-borders">
        DETALHES DO ALUNO

        <q-space></q-space>

        <q-btn
          dense
          label="Nova Inscricao"
          color="primary"
          icon="add"
          class=""
          @click="novaInscricao"
        >
          <q-tooltip class="bg-secundary">Registar Inscricao</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-separator color="green" inset></q-separator>

    <div class="q-pa-md d-flex justify-content-center">
      <div class="row q-mt-md" v-if="alunoExists">
        <div class="col-3 q-pa-md q-pl-lg q-ml-lg q-mr-lg panel" style="max-width: 500px">
          <!-- <PatientInfo /> -->
        </div>
        <div class="col q-mx-lg">
          <q-scroll-area
            :thumb-style="thumbStyle"
            :content-style="contentStyle"
            :content-active-style="contentActiveStyle"
            style="height: 700px"
            class="q-pr-md"
          >
            <InscricaInfo class="q-mb-lg" />
            <!-- <PrescriptionInfo class="q-mb-lg"/>
                    <PharmaceuticalAtentionInfo /> -->
          </q-scroll-area>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
// import { useRepo } from 'pinia-orm'
import InscricaInfo from 'src/components/inscricao/inscricaoInfo.vue'

/*
            Declarations
        */
const alunoExists = computed(() => {
  const alunoAux = JSON.parse(sessionStorage.getItem('selectedAluno'))
  const res = ref(false)
  if (alunoAux.id !== null || alunoAux.id !== undefined) res.value = true
  return res
})

/*
            Methods
        */
const novaInscricao = () => {
  console.log('nova inscricao')
}

/*
            Provides
        */

/*
            Hooks
        */
onMounted(async () => {
  //
})
</script>

<style></style>
