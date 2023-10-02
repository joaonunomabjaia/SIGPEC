const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutPadrao.vue'),
    children: [
      { path: '', component: () => import('pages/InscricaoPage.vue') }
      // { path: 'me', component: () => import('src/pages/MePage.vue') },
      // { path: 'content', component: () => import('src/pages/ContentPage.vue') }
    ],
    meta: {
      requiresAuth: true // Todas as rotas daqui devem estar logadas
    }
  },
  // {
  //   path: '/',
  //   component: () => import('layouts/LoginLayout.vue'),
  //   children: [
  //     { path: 'login', component: () => import('src/pages/LoginPage.vue') },
  //     { path: 'register', component: () => import('src/pages/RegisterPage.vue') },
  //     { path: 'email-confirmation', component: () => import('src/pages/EmailConfirmationPage.vue') },
  //     { path: 'forgot-password', component: () => import('src/pages/ForgotPassword.vue') }
  //   ]
  // },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
