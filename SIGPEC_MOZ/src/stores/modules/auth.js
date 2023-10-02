// import { reactive } from 'vue';
// import { usePinia } from 'pinia';
// import CryptoJS from 'crypto-js';

// const state = reactive({
//   isAuthenticated: false,
//   currentUser: null,
//   token: null,
// });

// const { users } = usePinia();

// export async function login(username, password) {
//   try {
//     const user = users.value.find((user) => user.username === username);
//     if (!user) {
//       throw new Error('Usuário não encontrado');
//     }

//     const hashedPassword = CryptoJS.SHA256(password).toString();
//     if (user.password !== hashedPassword) {
//       throw new Error('Senha incorreta');
//     }

//     state.isAuthenticated = true;
//     state.currentUser = user;
//     state.token = CryptoJS.AES.encrypt(JSON.stringify(user), process.env.VUE_APP_SECRET_KEY).toString();

//     return true;
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }

// export function logout() {
//   state.isAuthenticated = false;
//   state.currentUser = null;
//   state.token = null;
// }

// export function isAuthenticated() {
//   return state.isAuthenticated;
// }

// export function getCurrentUser() {
//   return state.currentUser;
// }

// export function getToken() {
//   return state.token;
// }
