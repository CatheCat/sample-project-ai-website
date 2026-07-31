<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const loading = ref(false)
const error   = ref('')
const form    = reactive({ account: '', password: '' })

async function handleLogin() {
  if (!form.account || !form.password) {
    error.value = 'Please enter your account and password.'
    return
  }
  loading.value = true
  error.value   = ''
  await new Promise((r) => setTimeout(r, 600))
  loading.value = false
  router.push('/dashboard')
}
</script>

<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="2">
          <v-card-title class="text-h6 pa-6 pb-2">
            <v-icon icon="mdi-domain" class="mr-2" color="primary" />
            ERP Console Login
          </v-card-title>
          <v-card-text class="px-6">
            <v-alert v-if="error" type="error" density="compact" class="mb-4" :text="error" />
            <v-text-field
              v-model="form.account"
              label="Account"
              prepend-inner-icon="mdi-account-outline"
              autocomplete="username"
              class="mb-1"
              @keyup.enter="handleLogin"
            />
            <v-text-field
              v-model="form.password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock-outline"
              autocomplete="current-password"
              @keyup.enter="handleLogin"
            />
          </v-card-text>
          <v-card-actions class="px-6 pb-6 pt-0">
            <v-btn block color="primary" :loading="loading" @click="handleLogin">Sign In</v-btn>
          </v-card-actions>
        </v-card>
        <div class="text-center mt-4 text-caption text-medium-emphasis">
          Internal use only — Unauthorized access is prohibited
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
