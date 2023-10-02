<template>
  <q-layout view="hHh Lpr fFf">
    <q-header bordered class="bg-primary text-white" height-hint="98">
      <q-toolbar class="bg-black">
        <q-btn dense flat round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" />

        <q-toolbar-title>
          SIGPECMOZ
          <q-badge outline align="top" color="orange"> Demo </q-badge>
        </q-toolbar-title>
        <q-space></q-space>
        Sair
        <q-btn
          outline
          round
          class="q-ml-sm q-mt-sm q-mb-sm"
          color="orange"
          icon="logout"
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="400"
      behavior="desktop"
      elevated
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <nav>
            <!-- <RouterLink to="/">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="home"></q-icon>
                </q-item-section>

                <q-item-section>
                Inicio
                </q-item-section>
              </q-item>
            </RouterLink> -->

            <router-link to="/">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="add_home"></q-icon>
                </q-item-section>

                <q-item-section> Inscrições </q-item-section>
              </q-item>
            </router-link>

            <!--
              <RouterLink to="/pagamentos">
                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon name="payments"></q-icon>
                  </q-item-section>

                  <q-item-section>
                    Pagamentos
                  </q-item-section>
                </q-item>
              </RouterLink>
            -->

            <router-link to="/painelAluno">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="people"></q-icon>
                </q-item-section>

                <q-item-section> Aluno </q-item-section>
              </q-item>
            </router-link>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="edit_note"></q-icon>
              </q-item-section>

              <q-item-section> Testes </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="poll"></q-icon>
              </q-item-section>

              <q-item-section> Relatórios </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="settings"></q-icon>
              </q-item-section>

              <q-item-section> Administração </q-item-section>
            </q-item>

            <RouterLink to="/sobre">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="lightbulb"></q-icon>
                </q-item-section>

                <q-item-section> Sobre </q-item-section>
              </q-item>
            </RouterLink>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help"></q-icon>
              </q-item-section>

              <q-item-section> Ajuda </q-item-section>
            </q-item>
          </nav>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <!-- <q-img class="absolute-top" src="src/assets/logo.png" style="height: 150px"> -->
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <slot>
      <RouterView />
    </slot>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>SIGPECMOZ</q-toolbar-title>
        <q-space></q-space>
        <small> @2023 </small>
        <q-space></q-space>

        <q-space></q-space>
        <q-avatar>
          <img src="src/assets/logo.png" />
        </q-avatar>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

// Declaractions
const leftDrawerOpen = ref(true)

// Methods
</script>
