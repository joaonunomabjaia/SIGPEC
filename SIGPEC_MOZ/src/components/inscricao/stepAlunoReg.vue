<template>
  <div class="column items-center">
    <q-card align="center" style="width: 1000px; max-width: 90vw">
      <q-card-section class="q-px-md">
        <div class="">
          <div class="row items-center q-mb-md">
            <q-icon name="person_outline" size="sm" />
            <span class="q-pl-sm text-subtitle2">Dados Pessoais</span>
            <q-space></q-space>

            <q-input
              v-model="search"
              debounce="500"
              bg-color="white"
              outlined
              rounded
              dense
              placeholder="Nome do Aluno"
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
          </div>
          <q-separator color="grey-13" size="1px" />
        </div>
        <div class="q-mt-md">
          <div class="row">
            <q-input
              label="Nome *"
              :rules="nomeRules"
              dense
              class="col"
              ref="nome"
              v-model="aluno.nome"
              outlined
              type="text"
              lazy-rules
            />
            <q-input
              label="Sobre Nome"
              dense
              class="col q-ml-md"
              ref="sobre_nome"
              v-model="aluno.sobrenome"
              outlined
              type="text"
              lazy-rules
            />

            <q-input
              label="Apelido *"
              dense
              class="col q-ml-md"
              ref="apelido"
              v-model="aluno.apelido"
              outlined
              :rules="apelidoRules"
              type="text"
              lazy-rules
            />
          </div>
          <div class="row q-mt-md">
            <q-input
              dense
              outlined
              class="col"
              v-model="aluno.dataNascimento"
              :rules="dataNascimentoRules"
              ref="birthDate"
              label="Data de Nascimento *"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="aluno.dataNascimento"
                      :options="optionsNonFutureDate"
                      mask="DD-MM-YYYY"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              v-model="idade"
              @update:model-value="verificarMaiorIdade()"
              outlined
              readonly
              ref="idadeRef"
              label="Idade"
              class="col q-ml-md"
              dense
              suffix="[anos de idade]"
              type="number"
              lazy-rules
            >
            </q-input>

            <q-select
              class="col q-ml-md"
              dense
              outlined
              ref="sexoRef"
              :rules="sexoRules"
              v-model="aluno.sexo"
              :options="genders"
              label="Sexo *"
            />
          </div>
          <div class="row">
            <q-input
              label="Nome do Pai"
              dense
              class="col"
              ref="nome_pai"
              v-model="aluno.pai"
              outlined
              type="text"
              lazy-rules
            />

            <q-input
              outlined
              type="text"
              lazy-rules
              label="Nome da Mae"
              dense
              class="col q-ml-md"
              v-model="aluno.mae"
            />
            <q-input
              outlined
              type="text"
              lazy-rules
              label="NUIT"
              dense
              class="col q-ml-md"
              v-model="aluno.nuit"
            />
          </div>
          <div class="row">
            <q-select
              class="col q-mt-md"
              dense
              outlined
              ref="tipoDoc"
              :rules="tipoDocRules"
              v-model="aluno.tipoDoc"
              :options="documentos"
              label="Tipo de Documento *"
            />

            <q-input
              outlined
              type="text"
              lazy-rules
              label="Numero do documento *"
              dense
              class="col q-mt-md q-ml-md"
              ref="numeroDoc"
              :rules="numDocRules"
              v-model="aluno.numeroDoc"
            />
            <q-input
              label="Emitido por"
              dense
              class="col q-mt-md q-ml-md"
              ref="emissor_doc"
              v-model="aluno.emissorDoc"
              outlined
              type="text"
              lazy-rules
            />
          </div>
          <div class="row">
            <q-input
              dense
              outlined
              class="col"
              v-model="aluno.dataEmissaoDoc"
              ref="dataEmissao"
              label="Data de Emissao *"
              :rules="dataEmissaoRules"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="aluno.dataEmissaoDoc"
                      :options="optionsNonFutureDate"
                      mask="DD-MM-YYYY"
                    >
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-input
              dense
              outlined
              class="col q-ml-md"
              v-model="aluno.validadeDoc"
              ref="dataValidade"
              label="Data de Validade *"
              :rules="validadeDocRules"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="aluno.validadeDoc" mask="DD-MM-YYYY">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="q-mt-md">
          <div class="row items-center q-mb-md">
            <q-icon name="house" size="sm" />
            <span class="q-pl-sm text-subtitle2">Endereço</span>
          </div>
          <q-separator color="grey-13" size="1px" />
          <div class="row q-mt-md">
            <TextInput
              label="Endereco"
              dense
              class="col"
              ref="endereco"
              v-model="aluno.endereco"
            />
          </div>
        </div>
        <div class="q-mt-md">
          <div class="row items-center q-mb-md">
            <q-icon name="call" size="sm" />
            <span class="q-pl-sm text-subtitle2">Contacto</span>
          </div>
          <q-separator color="grey-13" size="1px" />

          <div class="row q-mt-md">
            <TextInput
              label="Contacto Principal"
              dense
              class="col"
              ref="contacto_principal"
              v-model="aluno.contactoPrincipal"
            />
            <TextInput
              label="Contacto Alternativo"
              dense
              class="col q-ml-md"
              ref="contacto_alternativo"
              v-model="aluno.contactoAlternativo"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import TextInput from 'src/components/shared/input/TextField.vue'
import moment from 'moment'
import { inject, computed, ref } from 'vue'

const validacaoInputsAlunoErrors = ref(false)
const aluno = inject('alunoInstance')
const goToNextStep = inject('goToNextStep')

// Refs do form
const nome = ref('')
const birthDate = ref('')
const idadeRef = ref('')
const sexoRef = ref('')
const tipoDoc = ref('')
const numeroDoc = ref('')
const dataEmissao = ref('')
const dataValidade = ref('')
const apelido = ref('')

const genders = ['Masculino', 'Feminino']
const documentos = ['BI', 'Passaport', 'DIRE']

const optionsNonFutureDate = (dateOfBirth) => {
  return dateOfBirth <= moment().format('YYYY/MM/DD')
}

const idadeVal = ref('Idade')
const verificarMaiorIdade = () => {
  if (idade.value < 18) {
    idadeVal.value = 'Menor de idade'
  } else if (idade.value >= 35) {
    idadeVal.value = 'Nao Precisa tratar declaracao militar'
  } else {
    idadeVal.value = 'Deve tratar declaracao militar'
  }
}

const idade = computed(() => {
  if (aluno.dataNascimento !== undefined && aluno.dataNascimento !== null) {
    return moment().diff(moment(aluno.dataNascimento, 'DD-MM-YYYY'), 'years')
  } else {
    return null
  }
})

const nomeRules = [(val) => !!val || 'Por favor indicar o nome']

const apelidoRules = [(val) => !!val || 'Por favor indicar o apelido']

const dataNascimentoRules = [(val) => !!val || 'Por favor indicar a data de nascimento']

const idadeRules = [(val) => parseInt(val) >= 18 || 'Menor de Idade']

const sexoRules = [(val) => !!val || 'Por favor indicar o sexo']

const tipoDocRules = [(val) => !!val || 'Por favor indicar o tipo do documento']

const numDocRules = [(val) => !!val || 'Por favor indicar o numero do documento']

const dataEmissaoRules = [
  (val) => !!val || 'Por favor indicar a data de emissao do documento'
]

const validadeDocRules = [
  (val) => !!val || 'Por favor indicar a data de validade do documento'
]

const validacao = () => {
  nome.value.validate()
  apelido.value.validate()
  birthDate.value.validate()
  idadeRef.value.validate()
  sexoRef.value.validate()
  tipoDoc.value.validate()
  numeroDoc.value.validate()
  dataEmissao.value.validate()
  dataValidade.value.validate()

  if (
    !nome.value.hasError &&
    !apelido.value.hasError &&
    !birthDate.value.hasError &&
    !idadeRef.value.hasError &&
    !sexoRef.value.hasError &&
    !tipoDoc.value.hasError &&
    !numeroDoc.value.hasError &&
    !dataEmissao.value.hasError &&
    !dataValidade.value.hasError
  ) {
    goToNextStep()
    return true
  } else {
    if (idade.value < 18) alert("Este(a) aluno(a) inda e' menor de idade")
    console.log('Campos inválidos!')
    return false
  }
}

defineExpose({ validacaoInputsAlunoErrors, validacao })
</script>
