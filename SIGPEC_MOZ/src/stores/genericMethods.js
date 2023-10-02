// import moment from 'moment'
// import { defineStore } from 'pinia'
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "src/js/firebase";
// import { collection, query, getDocs } from "firebase/firestore";
// import { useRepo } from 'pinia-orm'
// import alunoRepository from 'src/stores/repositories/alunoRepo.js'
// import inscricaoRepository from 'src/stores/repositories/inscricaoRepo.js'
// import pagamentoRepository from 'src/stores/repositories/pagamentoRepo.js'

// export const useGenericMethodStore = defineStore('genericMethod', () => {

//   const idadeCalculadora = (dateOfBirth) => {
//     if (dateOfBirth !== undefined && dateOfBirth !== null) {
//       return moment().diff(moment(dateOfBirth, 'DD-MM-YYYY'), 'years')
//     } else {
//       return null
//     }
//   }

//   const addDataToFirestore = async (collectionName, jSONData) => {
//     console.log(jSONData)
//     await setDoc(doc(db, collectionName, jSONData.id), jSONData);
//   }

//   const getDataFromFireStoreToPinia = async () => {
//     // Alunos
//     const q = query(collection(db, "alunos"));
//     const alunos = await getDocs(q);
//     console.log(alunos)
//     alunos.forEach(async (aluno) => {
//       console.log(aluno.data())
//       // Salvar no Pinia
//       await useRepo(alunoRepository).save(aluno.data())
//     });

//     // inscricoes
//     const q1 = query(collection(db, "inscricaos"));
//     const inscricoes = await getDocs(q1);
//     inscricoes.forEach(async (inscricao) => {
//       console.log(inscricao.data())
//       // Salvar no Pinia
//       await useRepo(inscricaoRepository).save(inscricao.data())
//     });

//     // Pagamentos
//     const q2 = query(collection(db, "pagamentos"));
//     const pagamentos = await getDocs(q2);
//     pagamentos.forEach(async (pagamento) => {
//       console.log(pagamento.data())
//       // Salvar no Pinia
//       await useRepo(pagamentoRepository).save(pagamento.data())
//     });
//   }

//   const syncDataToFireStore = async () => {

//   }

//   return {idadeCalculadora, addDataToFirestore, getDataFromFireStoreToPinia, syncDataToFireStore}
// })
