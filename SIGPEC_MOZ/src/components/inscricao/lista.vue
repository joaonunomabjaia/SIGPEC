<template>
  <div>
    <div class="q-pa-md">
      <div class="row no-wrap items-center q-pa-sm bg-grey-3 rounded-borders">
        INSCRICOES

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
    </div>

    <q-separator color="green" inset></q-separator>

    <div class="q-pa-md">
      <q-table
        :grid="$q.screen.xs"
        :dense="$q.screen.lt.md"
        title="Lista de Inscricoes"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :rows-per-page-options="[10, 5, 8, 9, 15, 20, 25, 50, 0]"
      >
        <template v-slot:top-right>
          <q-input
            style="width: 200px"
            class="q-mr-lg"
            outline
            v-model="dataInicio"
            mask="date"
            :rules="['date']"
            label="Inscritos De:"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="dataInicio">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="primary"
                        flat
                      ></q-btn>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            style="width: 200px"
            class="q-mr-lg"
            outline
            v-model="dataFim"
            mask="date"
            :rules="['date']"
            label="Ate:"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="dataFim">
                    <div class="row items-center justify-end">
                      <q-btn
                        v-close-popup
                        label="Close"
                        color="primary"
                        flat
                      ></q-btn>
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select
            style="width: 250px"
            class="q-mr-sm"
            dense
            outlined
            v-model="categoriaSelec"
            :options="categories"
            label="Categoria"
          ></q-select>

          <q-btn
            class="q-mr-sm"
            color="white"
            text-color="primary"
            icon="search"
          ></q-btn>
          <q-btn color="white" text-color="red" icon="close"></q-btn>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="add"
        color="primary"
        @click="switchListRegisterMode"
      ></q-btn>
    </q-page-sticky>
  </div>
</template>

<script setup>
// import axios from 'axios'
import { ref, onMounted, inject } from 'vue'
// import { useRepo } from 'pinia-orm'
// import { useQuasar } from 'quasar'

const switchListRegisterMode = inject('switchListRegisterMode')
// const dataInicio = ref()
// const dataFim = ref()
// const categoriaSelec = ref(null)
// const $q = useQuasar()
// const timer = ref()
const inscricoes = ref([])
// const rows  = ref([])

// const categories = [
//   'Ligeiros e Pesados',
//   'Ligeiros',
//   'Profissional',
//   'Publico',
//   'Cargas Perigosas',
//   'Motociclos'
// ]

// const columns = [
//   {
//     name: 'desc',
//     required: true,
//     label: 'Nome do Aluno',
//     align: 'left',
//     field: (row) => row.name,
//     format: (val) => `${val}`,
//     sortable: true
//   },
//   {
//     name: 'sexo',
//     align: 'center',
//     label: 'Sexo',
//     field: 'sexo',
//     sortable: true
//   },
//   {
//     name: 'categoria',
//     label: 'Categoria',
//     field: 'categoria',
//     sortable: true
//   },
//   {
//     name: 'contacto',
//     label: 'Contacto(s)',
//     field: 'contacto'
//   },
//   {
//     name: 'activa',
//     label: 'Activa',
//     field: 'activa'
//   },
//   {
//     name: 'disconto',
//     label: 'Desconto',
//     field: 'disconto'
//   },
//   {
//     name: 'valor_inscricao',
//     label: 'Valor da Inscricao',
//     field: 'valor_inscricao'
//   },
//   {
//     name: 'valor_pago',
//     label: 'Valor Pago',
//     field: 'valor_pago'
//   },
//   {
//     name: 'divida',
//     label: 'Divida',
//     field: 'divida'
//   },
//   {
//     name: 'func_reg',
//     label: 'Registo por',
//     field: 'func_reg'
//   },
//   {
//     name: 'data_inscricao',
//     label: 'Data da Inscricao',
//     field: 'data_inscricao'
//   },
//   {
//     name: 'acoes',
//     label: 'Accoes',
//     field: 'acoes'
//   }
// ]

// inscricoes.value = [
//     {
//         name: 'Antonio Zeferino Laranja',
//         sexo: 'Masculino',
//         categoria: 'Ligeiros e Pesados',
//         contacto: '875362534/843423123',
//         activa: 'SIM',
//         disconto: 'NAO',
//         valor_inscricao: '8900',
//         valor_pago: '7900',
//         divida: '1000',
//         func_reg: 'Sebastiao',
//         data_inscricao: '22-08-2021'
//     },
//     {
//         name: 'Santos Tunecas Branco',
//         sexo: 'Masculino',
//         categoria: 'Ligeiros',
//         contacto: '875362009',
//         activa: 'NAO',
//         disconto: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Eunice Juliana Santiago',
//         sexo: 'Feminino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Elton Judiao Limao',
//         sexo: 'Masculino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Stella Stefania',
//         sexo: 'Feminino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Ercilio Julio Nhanave',
//         sexo: 'Masculino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Delcio Pedro Chirindza',
//         sexo: 'Masculino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Quito Feraz dos Santos',
//         sexo: 'Masculino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Paulo Elias Zacarias',
//         sexo: 'Masculino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     },
//     {
//         name: 'Salomao Bernardo Cinquenta',
//         sexo: 'Masculino',
//         categoria: 'Profissional',
//         contacto: '875362009',
//         disconto: 'NAO',
//         activa: 'NAO',
//         valor_inscricao: '6900',
//         valor_pago: '3000',
//         divida: '3900',
//         func_reg: 'Ofelia',
//         data_inscricao: '04-01-2023'
//     }
// ]

// const getCategoria = (inscId) => {
//   return inscId + 1
// }

// lifecycle hooks
onMounted(() => {
  // $q.loading.show({
  //   message: 'Carregando, aguarde...'
  // })
  inscricoes.value = [] // recuperar inscricoes activas
  // hiding in 2s
  // timer.value = setTimeout(() => {
  //   $q.loading.hide()
  //   timer.value = void 0
  // }, 1000)
})
// getData()
</script>

<style></style>
