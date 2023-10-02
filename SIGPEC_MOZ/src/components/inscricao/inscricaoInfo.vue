<template>
  <div>
    <ListHeader :addVisible="true" :mainContainer="true" bgColor="bg-primary">
      Inscrições do Aluno
    </ListHeader>
    <span v-show="selectedAluno !== undefined">
      <EmptyList v-if="inscricaos.length <= 0"
        >Nenhuma Inscricao registada Adicionado</EmptyList
      >
    </span>
    <div>
      <span v-for="inscricaoSelec in inscricaos" :key="inscricaoSelec.id">
        <!-- <InfoContainer /> -->
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import EmptyList from 'src/components/shared/ListEmpty.vue'
import { useRepo } from 'pinia-orm'
import Aluno from 'src/stores/models/aluno'
import Inscricao from 'src/stores/models/inscricao'
// import Pagamento from 'src/stores/models/pagamento'

const alunoRepo = useRepo(Aluno)
const inscricaoRepo = useRepo(Inscricao)
// const pagamentoRepo = useRepo(Pagamento)

const selectedAluno = computed(() => {
  const res = alunoRepo
    .query()
    .where('id', JSON.parse(sessionStorage.getItem('selectedAluno')).id)
    .with('inscricaos')
    .get()
  console.log(res)
  return res
})

const inscricaos = computed(() => {
  const res = inscricaoRepo
    .query()
    .where('alunoId', 'Q1uBH7VazV9-bKDlRB_yx')
    .withAll('pagamentos')
    .get()
  console.log(res.value)
  // if (res.value !== undefined) {
  //   console.log(res.value);
  //   res.value.pagamentos = pagamentoRepo
  //     .withAll((query) => {
  //       query.where("inscricaoId", res.value.id);
  //     })
  //     .get();
  // }

  return res.value
})

// provide("inscricaoSelec", selectedAluno.value.inscricaos[0]);

onMounted(() => {
  // console.log(inscricaos.value);
})
</script>

<style></style>
