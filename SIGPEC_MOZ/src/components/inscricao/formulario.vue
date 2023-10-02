<template>
  <div>
    <div class="q-pa-md">
      <div class="row no-wrap items-center q-pa-sm bg-grey-3 rounded-borders">
        <q-btn
          dense
          color="primary"
          icon="arrow_back"
          class="q-mr-md"
          @click="switchListRegisterMode()"
        >
          <q-tooltip class="bg-secundary">Voltar</q-tooltip>
        </q-btn>
        NOVA INSCRICAO

        <q-space></q-space>

        <q-icon size="sm" name="edit" color="orange"></q-icon>
      </div>
    </div>

    <q-separator color="green" inset></q-separator>

    <div class="q-pa-md d-flex justify-content-center">
      <q-form @submit.prevent="submeter" @reset="onReset" class="q-gutter-md">
        <q-stepper
          :grid="$q.screen.xs"
          v-model="step"
          ref="stepper"
          animated
          done-color="deep-orange"
          active-color="primary"
          inactive-color="secondary"
        >
          <q-step
            :name="1"
            title="DADOS PESSOAIS DO ALUNO"
            icon="person_outline"
            :done="step > 1"
          >
            <StepAlunoReg ref="stepAlunoRegRef" />
          </q-step>

          <q-step
            :name="2"
            title="INSCRICAO E PAGAMENTO"
            icon="add_home"
            :done="step > 2"
          >
            <!-- <StepInscricaoReg ref="stepInscrRegRef" /> -->
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="submeter"
                type="submit"
                color="green"
                v-show="step === 2"
                label="Submeter"
              ></q-btn>
              <q-btn
                @click="goToNextStep"
                color="primary"
                v-show="step < 2 && step > 0"
                label="Continuar"
              ></q-btn>
              <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="$refs.stepper.previous()"
                label="Anterior"
                class="q-ml-sm"
              ></q-btn>
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </q-form>
    </div>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { ref, provide, reactive, onMounted, inject } from 'vue'
import StepAlunoReg from 'src/components/inscricao/stepAlunoReg.vue'
// import StepInscricaoReg from 'src/components/inscricao/StepInscricaoReg.vue'
import { useRepo } from 'pinia-orm'
import Inscricao from 'src/stores/models/inscricao'
import Pagamento from 'src/stores/models/pagamento'
import Aluno from 'src/stores/models/aluno'

const step = ref(1)
const AlunoRepo = useRepo(Aluno)
const InscricaoRepo = useRepo(Inscricao)
const PagamentoRepo = useRepo(Pagamento)

const aluno = reactive(AlunoRepo)
const inscricao = reactive(InscricaoRepo)
const pagamento = reactive(PagamentoRepo)
const stepInscrRegRef = ref()
const stepAlunoRegRef = ref()
const stepper = ref()
const switchListRegisterMode = inject('switchListRegisterMode')

// Função para chamar o método "submeter" do componente filho
const submeter = () => {
  if (step.value === 2) {
    stepInscrRegRef.value.submeter()
  }
}

const goToNextStep = () => {
  if (step.value === 1) {
    stepper.value.next()
  }
}

provide('alunoInstance', aluno)
provide('inscricaoInstance', inscricao)
provide('pagamentoInstance', pagamento)
provide('step', step)
provide('goToNextStep', goToNextStep)

onMounted(() => {
  // --
})
</script>

<style></style>
