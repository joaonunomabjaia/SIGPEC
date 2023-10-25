<template>
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
                            ref="categoria"
                            :rules="[ val => !!val || 'Por favor indicar a categoria']"
                            v-model="selectedCategoria"
                            option-value="id"
                            option-label="descricao"
                            :options="categorias"
                            label="Categoria *" />
                        <TextInput dense v-model="selectedCategoria.valorDefeito" label="Valor da Categoria" class="col q-ml-md" readonly />
                        <TextInput v-show="discontoEmDia" label="Desconto Geral" dense class="col q-ml-md" ref="desconto" v-model="selectedCategoria.valorPromo" readonly/>
                        <TextInput label="Desconto Individual" dense class="col q-ml-md" ref="desconto" v-model="inscricao.valorDisconto"/>
                    </div>
                    <div class="row" style="height: 220px">
                        <!-- <div class="col"></div> -->
                        <div class="col self-center" >
                            <!-- <q-btn dense color="primary" label="Capturar Foto" icon="add_a_photo">
                                <q-tooltip class="bg-secundary">Abrir/Seleccionar Camera</q-tooltip>
                            </q-btn> -->
                            <div class="column">
                                <q-btn dense color="primary" @click="toggleCamera" >
                                    <span v-if="!isCameraOpen">Abrir Camera</span>
                                    <span v-else>VALIDAR FOTO</span>
                                </q-btn>
                                <!-- <q-btn dense color="primary" label="Fechar Camera" @click="stop"  class="q-mt-sm bg-secundary"><q-tooltip>Fechar Camera</q-tooltip></q-btn>                -->
                                <q-btn dense color="primary" v-if="isCameraOpen" @click="takePhoto" label="Capturar Foto" icon="add_a_photo" class="q-mt-sm bg-secundary"><q-tooltip >Capturar Foto</q-tooltip></q-btn>
                                <q-select
                                    class="q-mt-sm"
                                    @change="changeCamera"
                                    :options="cameras"
                                    dense outlined
                                    ref="camera"
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
                                    ref="camera"
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
                        <TextInput dense v-model="pagarPosDisconto" label="Total a pagar pos desconto" class="col " readonly />
                        <TextInput label="Valor a pagar (agora)" dense class="col  q-ml-md" ref="endereco" v-model="pagamento.valorPago"/>
                    </div>
                </div>
            </q-card-section>
        </q-card>
        </div>
</template>
<script setup>
import TextInput from 'src/components/shared/input/TextField.vue'
// import { useRepo } from 'pinia-orm'
import { ref, inject, computed, onMounted, reactive } from 'vue'
import Categoria from 'src/stores/models/categoriaInscricao'
import moment from 'moment'

const url = ref('assets/photo')

const aluno = inject('alunoInstance')
const inscricao = inject('inscricaoInstance')
const pagamento = inject('pagamentoInstance')
const selectedCategoria = ref(new Categoria())

const cat1 = reactive(new Categoria())
cat1.descricao = 'Ligeiros e Pesados'
cat1.valorDefeito = 8900
cat1.valorPromo = 1000
cat1.emPromo = true
cat1.inicioPromo = moment(new Date()).format('DD-MM-YYYY')
cat1.fimPromo = moment(new Date()).format('DD-MM-YYYY')
const cat2 = reactive(new Categoria())
cat2.descricao = 'Ligeiros'
cat2.valorDefeito = 6900
cat2.valorPromo = 0
cat2.emPromo = false
const cat3 = reactive(new Categoria())
cat3.descricao = 'Profissional'
cat3.valorDefeito = 5000
cat3.valorPromo = 0
cat3.emPromo = false

const categorias = ref(null)

// Camera Attributes
const camera = ref(null)
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

  const context = canvas.value.getContext('2d')
  const photoFromVideo = camera.value

  context.drawImage(photoFromVideo, 0, 0, 150, 130)
}
function createCameraElement () {
  const constraints = (window.constraints = {
    audio: false,
    video: true
  })

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      camera.value.srcObject = stream
    })
    .catch(error => {
      alert(error, "May the browser didn't support or there is some errors.")
    })
}
function stopCameraStream () {
  const tracks = camera.value.srcObject.getTracks()

  tracks.forEach(track => {
    track.stop()
  })
}

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
  pagamentos.value.push(pagamento) // A lista de pagamentos ja devera estar preenchida com pagamentos anteriores antes deste passo
  inscricao.pagamentos = pagamentos.value
  inscricoes.value.push(inscricao) // A lista de inscricoes ja devera estar preenchida com inscricoes anteriores antes deste passo
  aluno.inscricaos = inscricoes.value
  // Saving
  //   await useRepo(alunoRepository).save(aluno)
  // After Saving On PiniaStore, save on localStore
  await localStorage.setItem('aluno', JSON.stringify(aluno))
  // Now save on sessonStorage
  await sessionStorage.setItem('selectedAluno', JSON.stringify(aluno))
}

defineExpose({
  submeter
})

//   function downloadImage() {
//     const download = document.getElementById("downloadPhoto")
//     const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
//       .replace("image/jpeg", "image/octet-stream")
//     download.setAttribute("href", canvas)
//   }

const pagarPosDisconto = computed(() => {
  const discontoGeral = ref(0)
  if (discontoEmDia.value) { discontoGeral.value = selectedCategoria.value.valorPromo }

  const result = selectedCategoria.value.valorDefeito - discontoGeral.value - inscricao.valorDisconto
  return result
})

const discontoEmDia = computed(() => { // Verificar se o disconto geral ainda esta dentro do prazo e se ha promocao nessa categoria
  return true && selectedCategoria.value.emPromo // substituir true com comparacao de datas
}
)

</script>
