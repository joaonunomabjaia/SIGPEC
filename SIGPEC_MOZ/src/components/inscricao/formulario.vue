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
                  <div class="row q-mt-sm">
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
                  <div class="row q-mt-sm">
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
                  <div class="row q-mt-sm">
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
                  <div class="row q-mt-sm">
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
                  <div class="row q-mt-sm">
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
                <div class="q-mt-sm">
                  <div class="row items-center">
                    <q-icon name="house" size="sm" />
                    <span class="q-pl-sm text-subtitle2">Endereço:</span>
                  </div>
                  <q-separator color="grey-13" size="1px" />
                  <div class="row q-mt-md">
                    <q-input
                      outlined
                      label="Endereco"
                      dense
                      class="col"
                      ref="endereco"
                      v-model="aluno.endereco"
                    />
                  </div>
                </div>
                <div class="q-mt-md">
                  <div class="row items-center q-my-sm">
                    <q-icon name="call" size="sm" />
                    <span class="q-pl-sm text-subtitle2">Contacto:</span>
                  </div>
                  <q-separator color="grey-13" size="1px" />

                  <div class="row q-mt-md">
                    <q-input
                      outlined
                      label="Contacto Principal"
                      dense
                      class="col"
                      ref="contacto_principal"
                      v-model="aluno.contactoPrincipal"
                    />
                    <q-input
                      outlined
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
          </q-step>

          <q-step
            :name="2"
            title="INSCRICAO E PAGAMENTO"
            icon="add_home"
            :done="step > 2"
          >
            <div class="column items-center">
              <q-card align="center" style="width: 1000px; max-width: 90vw;">
                <q-card-section class="q-px-md">
                  <div class="">
                      <div class="row items-center q-mb-md">
                          <q-icon name="edit" size="sm"/>
                          <span class="q-pl-sm text-subtitle2">Dados da Inscricao</span>
                      </div>
                      <q-separator color="grey-13" size="1px"/>
                  </div>
                  <div class="q-mt-md">
                    <div class="row">
                      <q-select
                          class="col"
                          dense outlined
                          ref="categoriaRef"
                          :rules="[ val => !!val || 'Por favor indicar a categoria']"
                          v-model="selectedCategoria"
                          option-value="id"
                          option-label="descricao"
                          :options="categorias"
                          label="Categoria *" />
                      <q-input
                        outlined
                        ref="valorDefaultDaCategoriaRef"
                        type="text"
                        lazy-rules
                        dense
                        v-model="selectedCategoria.valorDefeito"
                        label="Valor da Categoria"
                        class="col q-ml-md"
                        readonly
                      />
                      <q-input
                        outlined
                        ref="descontoGeralRef"
                        type="text"
                        lazy-rules
                        v-show="discontoEmDia"
                        label="Desconto Geral"
                        dense class="col q-ml-md"
                        v-model="selectedCategoria.valorPromo"
                        readonly
                      />
                      <q-input
                        outlined
                        ref="descontoIndividualRef"
                        type="text"
                        lazy-rules
                        label="Desconto Individual"
                        dense class="col q-ml-md"
                        v-model="inscricao.valorDisconto"
                      />
                    </div>
                    <div class="row" style="height: 220px">
                      <div class="col self-center" >
                        <div class="column">
                          <q-btn dense color="primary" @click="toggleCamera" >
                              <span v-if="!isCameraOpen">Abrir Camera</span>
                              <span v-else>VALIDAR FOTO</span>
                          </q-btn>
                          <q-btn dense color="primary" v-if="isCameraOpen" @click="takePhoto" label="Capturar Foto" icon="add_a_photo" class="q-mt-sm bg-secundary"><q-tooltip >Capturar Foto</q-tooltip></q-btn>
                          <q-select
                              class="q-mt-sm"
                              @change="changeCamera"
                              :options="cameras"
                              dense outlined
                              ref="cameraRef"
                              label="SELECIONAR CAMERA"
                          />
                        </div>
                      </div>
                      <div class="col q-ml-md q-mb-sm self-center"><!--Photo Taken-->
                        <q-img
                            v-show="!isPhotoTaken"
                            :src="url"
                            :ratio="1"
                            class="q-mt-md"
                            style="width: 200px"
                        />
                        <canvas
                            id="photoTaken"
                            v-show="isPhotoTaken"
                            class="q-mt-md"
                            ref="canvas"
                            :width="350" :height="220">
                        </canvas>
                      </div>
                      <div class="col q-ml-md self-center" style="border: thick double #32a1ce;"><!--Camera Streaming-->
                          <div class=" col q-pt-sm camera-video">
                              <video
                                  :width="320" :height="210"
                                  class="camera-video"
                                  ref="cameraRef"
                                  autoplay
                                  playsinline >
                              </video>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="q-mt-md">
                    <div class="row items-center q-mb-md">
                        <q-icon name="payments" size="sm"/>
                        <span class="q-pl-sm text-subtitle2">Pagamento</span>
                    </div>
                    <q-separator color="grey-13" size="1px"/>
                    <div class="row q-mt-md">
                      <q-input outlined dense v-model="pagarPosDisconto" label="Total a pagar pos desconto" class="col " readonly />
                      <q-input outlined label="Valor a pagar (agora)" dense class="col q-ml-md" ref="enderecoRef" v-model="pagamento.valorPago"/>
                      <q-input outlined dense v-model="valorEmDivida" label="Divida" class="col q-ml-md" label-color="negative" color="pink-6" readonly />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                @click="goToNextStep"
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
import { ref, reactive, inject, computed, onMounted } from 'vue'
import moment from 'moment'
import { useRepo } from 'pinia-orm'
import Inscricao from 'src/stores/models/inscricao'
import Pagamento from 'src/stores/models/pagamento'
import CategoriaInscricao from 'src/stores/models/categoriaInscricao'
import Aluno from 'src/stores/models/aluno'
import useSharedMethods from 'src/composables/UseSharedMethods'
import useSwal from 'src/composables/dialog'

const step = ref(1)
const enableCamera = ref(false)
const { alertSucess, alertError, alertInfo, alertWarningAction } = useSwal()
const { calculateAge, diffDatesInDays } = useSharedMethods()

const aluno = reactive(new Aluno())
const inscricao = reactive(new Inscricao())
const pagamento = reactive(new Pagamento())
const stepper = ref()
const step1Validated = ref(false)
const step2Validated = ref(false)
const switchListRegisterMode = inject('switchListRegisterMode')

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
const documentos = ['BI', 'Passaport', 'DIRE', 'Talao BI']

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
  console.log(aluno)
  return calculateAge(aluno.dataNascimento)
})

const nomeRules = [(val) => !!val || 'Por favor indicar o nome']

const apelidoRules = [(val) => !!val || 'Por favor indicar o apelido']

const dataNascimentoRules = [(val) => !!val || 'Por favor indicar a data de nascimento']

const sexoRules = [(val) => !!val || 'Por favor indicar o sexo']

const tipoDocRules = [(val) => !!val || 'Por favor indicar o tipo do documento']

const numDocRules = [(val) => !!val || 'Por favor indicar o numero do documento']

const dataEmissaoRules = [
  (val) => !!val || 'Por favor indicar a data de emissao do documento'
]

const validadeDocRules = [
  (val) => !!val || 'Por favor indicar a data de validade do documento'
]

const validacaoStep1 = async () => {
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
    step1Validated.value = true
  } else {
    step1Validated.value = false
    if (idade.value && idade.value < 18) alertError('Este(a) aluno(a) ainda é menor de idade')
    if (docExpiradoComp.value) alertError('Documento expirado.')
  }
}

const validacaoStep2 = async () => {}

const docExpiradoComp = computed(() => { // Verificar se o documento expirou ou nao
  if (diffDatesInDays(aluno.validadeDoc, moment()) != null && diffDatesInDays(aluno.validadeDoc, moment()) <= 0) {
    return true
  }
  return false
})

const goToNextStep = async () => {
  if (step.value === 1) {
    await validacaoStep1()
    const validarMenorIdade = ref(false)
    const validarDocExpirado = ref(false)

    const idadeValue = await calculateAge(aluno.dataNascimento)
    if (docExpiradoComp.value || parseInt(idadeValue) < 18) {
      if (docExpiradoComp.value) {
        alertWarningAction('Documento expirado, continuar mesmo assim?').then((result) => {
          if (result) validarDocExpirado.value = true
          if (parseInt(idadeValue) < 18) {
            alertWarningAction('Este(a) aluno(a) ainda é menor de idade, continuar mesmo assim?').then((result) => {
              if (result) validarMenorIdade.value = true
              if (step1Validated.value && validarMenorIdade.value && validarDocExpirado.value) {
                step.value++
              }
            })
          } else {
            validarMenorIdade.value = true
            if (step1Validated.value && validarMenorIdade.value && validarDocExpirado.value) {
              step.value++
            }
          }
        })
      } else {
        validarDocExpirado.value = true
        if (parseInt(idadeValue) < 18) {
          alertWarningAction('Este(a) aluno(a) ainda é menor de idade, continuar mesmo assim?').then((result) => {
            if (result) validarMenorIdade.value = true
            if (step1Validated.value && validarMenorIdade.value && validarDocExpirado.value) {
              step.value++
            }
          })
        } else {
          validarMenorIdade.value = true
          alert('AA')
          if (step1Validated.value && validarMenorIdade.value && validarDocExpirado.value) {
            step.value++
          }
        }
      }
    } else {
      if (step1Validated.value) {
        step.value++
      }
    }
  } else if (step.value === 2) {
    await validacaoStep2()
    if (step1Validated.value && step2Validated.value) {
      step.value++
      submeter()
    }
  }
}

// Inscricao e Pgamento
const url = ref('assets/photo')
const selectedCategoria = ref(null)

const categorias = ref([])

const discontoEmDia = computed(() => { // Verificar se o disconto geral ainda esta dentro do prazo e se ha promocao nessa categoria
  return true && selectedCategoria.value.emPromo // substituir true com comparacao de datas
})

const pagarPosDisconto = computed(() => {
  const discontoGeral = ref(0)
  if (discontoEmDia.value) { discontoGeral.value = selectedCategoria.value.valorPromo }

  const result = selectedCategoria.value.valorDefeito - discontoGeral.value - inscricao.valorDisconto
  return result
})

const valorEmDivida = computed(() => {
  return pagarPosDisconto.value - pagamento.valorPago
})

const submeter = async () => {
  const discontoGeral = ref(0)
  const inscricoes = ref([])
  const pagamentos = ref([])
  if (discontoEmDia.value) { discontoGeral.value = selectedCategoria.value.valorPromo }
  inscricao.discontoGeral = discontoGeral.value
  inscricao.valorPagarPosDisconto = pagarPosDisconto
  inscricao.alunoId = aluno.id
  aluno.docExpirado = docExpiradoComp

  pagamento.referentA = 'Prestacao: ' + selectedCategoria.value.descricao
  pagamentos.value.push(pagamento.value) // A lista de pagamentos ja devera estar preenchida com pagamentos anteriores antes deste passo
  inscricao.pagamentos = pagamentos.value
  inscricoes.value.push(inscricao) // A lista de inscricoes ja devera estar preenchida com inscricoes anteriores antes deste passo
  aluno.inscricaos = inscricoes.value
  // Saving
  //   await useRepo(alunoRepository).save(aluno)
  // After Saving On PiniaStore, save on localStore
  await localStorage.setItem('aluno', JSON.stringify(aluno.value))
  // Now save on sessonStorage
  await sessionStorage.setItem('selectedAluno', JSON.stringify(aluno.value))
}

// Camera Attributes
const cameraRef = ref(null)
const canvas = ref(null)
const isCameraOpen = ref(false)
const isPhotoTaken = ref(false)

function toggleCamera () {
  if (isCameraOpen.value) {
    isCameraOpen.value = false
    stopCameraStream()
  } else {
    isCameraOpen.value = true
    createCameraElement()
  }
}
function takePhoto () {
  isPhotoTaken.value = true

  const canvas1 = canvas.value
  const context = canvas.value.getContext('2d')
  const photoFromVideo = cameraRef.value

  context.drawImage(photoFromVideo, 0, 0, 150, 130)

  // Converte o canvas para um blob
  canvas1.toBlob(function (blob) {
    if (blob) {
      const date = moment()
      const filename = `foto_${date.toISOString()}.png`
      const url = URL.createObjectURL(blob)

      // Cria um link para o arquivo e simula um clique para iniciar o download
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Limpa a URL temporária
      URL.revokeObjectURL(url)
    }
  }, 'image/png')
}
function createCameraElement () {
  const constraints = (window.constraints = {
    audio: false,
    video: true
  })

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      cameraRef.value.srcObject = stream
    })
    .catch(error => {
      alertError(error, "May the browser didn't support or there is some errors.")
    })
}
function stopCameraStream () {
  const tracks = cameraRef.value.srcObject.getTracks()

  tracks.forEach(track => {
    track.stop()
  })
}

// Inscricao e Pgamento FIM

onMounted(() => {
  if (navigator.mediaDevices.getUserMedia) {
    enableCamera.value = true
  }
  const cat1 = new CategoriaInscricao()
  cat1.descricao = 'Ligeiros e Pesados'
  cat1.valorDefeito = 8900
  cat1.valorPromo = 1000
  cat1.emPromo = true
  cat1.inicioPromo = moment().format('DD-MM-YYYY')
  cat1.fimPromo = moment().format('DD-MM-YYYY')

  const cat2 = new CategoriaInscricao()
  cat2.descricao = 'Ligeiros'
  cat2.valorDefeito = 6900
  cat2.valorPromo = 0
  cat2.emPromo = false

  const cat3 = new CategoriaInscricao()
  cat3.descricao = 'Profissional'
  cat3.valorDefeito = 5000
  cat3.valorPromo = 0
  cat3.emPromo = false

  console.log(categorias.value)
  categorias.value.push(cat1)
  categorias.value.push(cat2)
  categorias.value.push(cat3)
  selectedCategoria.value = categorias.value[0]
})

const videoplayRef = ref(null)
const useCam = () => {
  const constraints = (window.constraints = {
    audio: false,
    video: true
  })

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      cameraRef.value.srcObject = stream
    })
    .catch(error => {
      alertInfo(error, "May the browser didn't support or there is some errors.")
    })
}

</script>

<style scoped>
</style>
