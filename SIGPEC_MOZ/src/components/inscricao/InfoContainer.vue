<template>
  <div>
    <ListHeader :addVisible="true" @expandLess="expandLess" :bgColor="grey - 6"
      >{{
        inscricaoSelec.categoriaInscricaoId === null ||
        inscricaoSelec.categoriaInscricaoId === undefined
          ? "Sem Info"
          : inscricaoSelec.categoriaInscricaoId
      }}
    </ListHeader>
    <q-card v-show="inscricaoInfoAvailable" class="noRadius q-mt-xs">
      <q-card-section class="row q-pa-none">
        <div class="col-5 bg-white q-pa-md">
          <div class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Categoria:</div>
            <div class="col text-grey-8">
              {{
                inscricaoSelec.categoriaInscricaoId === null ||
                inscricaoSelec.categoriaInscricaoId === undefined
                  ? "Sem Info"
                  : inscricaoSelec.categoriaInscricaoId
              }}
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Data de Registo:</div>
            <div class="col text-grey-8">
              {{ inscricaoSelec.dataRegisto }}
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Estado da Inscricao:</div>
            <div class="col text-grey-8">
              {{ inscricaoSelec.isActivo ? "Activa" : "Inactiva" }}
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Total Pela Carta:</div>
            <div class="col text-grey-8">
              {{ inscricaoSelec.valorPagarPosDisconto }}
            </div>
          </div>
          <div v-show="inscricaoSelec.discontoGeral > 0" class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Disconto Geral:</div>
            <div class="col text-grey-8">
              {{ inscricaoSelec.discontoGeral }}
            </div>
          </div>
          <div v-show="inscricaoSelec.valorDisconto > 0" class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Disconto Individual:</div>
            <div class="col text-grey-8">
              {{ inscricaoSelec.valorDisconto }}
            </div>
          </div>
          <div v-show="inscricaoSelec.totalJaPago > 0" class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Total Ja pago:</div>
            <div class="col text-grey-8">
              {{ inscricaoSelec.totalJaPago }}
            </div>
          </div>
          <div class="row">
            <div class="col-4 text-grey-9 text-weight-medium">Remanescente:</div>
            <div class="col text-grey-8">
              {{
                inscricaoSelec.valorPagarPosDisconto - inscricaoSelec.totalJaPago > 0
                  ? inscricaoSelec.valorPagarPosDisconto - inscricaoSelec.totalJaPago
                  : "Pagou na totalidade"
              }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import ListHeader from "src/components/shared/ListHeader.vue";
import { inject, computed, ref } from "vue";

const inscricaoSelec = inject("inscricaoSelec");

const inscricaoInfoAvailable = computed(() => {
  const res = ref(false);
  if (inscricaoSelec !== null || inscricaoSelec !== undefined) res.value = true;

  return res;
});
</script>

<style>
.noRadius {
  border-radius: 0px;
}
</style>
