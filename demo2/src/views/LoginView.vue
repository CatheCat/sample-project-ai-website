<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const loading = ref(false)
const error   = ref('')
const form    = reactive({ account: '', password: '' })

async function handleLogin() {
  if (!form.account || !form.password) {
    error.value = 'Account and password are required.'
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
  <!-- Full-height split: left brand panel + right form -->
  <v-container class="fill-height pa-0" fluid>
    <v-row no-gutters class="fill-height">
      <!-- Left brand strip — hidden on mobile -->
      <v-col cols="0" md="5" class="d-none d-md-flex align-center justify-center"
        style="background: linear-gradient(160deg, #4338CA 0%, #7C3AED 100%);">
        <div class="text-center pa-8">
          <v-icon icon="mdi-chart-line-variant" size="64" color="white" class="mb-4" />
          <div class="text-h4 font-weight-bold text-white mb-2">Sales ERP</div>
          <div class="text-body-2 text-white" style="opacity:.75;">
            Unified CRM, pipeline, and<br>revenue management platform.
          </div>
        </div>
      </v-col>

      <!-- Right form -->
      <v-col cols="12" md="7" class="d-flex align-center justify-center"
        style="background: #F4F5FB;">
        <div style="width:100%; max-width:400px;" class="pa-8">
          <div class="text-h5 font-weight-bold mb-1" style="color:#1E1B4B;">Welcome back</div>
          <div class="text-body-2 text-medium-emphasis mb-6">Sign in to your Sales ERP account</div>

          <v-alert v-if="error" type="error" density="compact" class="mb-4" :text="error" />

          <v-text-field
            v-model="form.account"
            label="Account"
            prepend-inner-icon="mdi-account-outline"
            autocomplete="username"
            class="mb-2"
            @keyup.enter="handleLogin"
          />
          <v-text-field
            v-model="form.password"
            label="Password"
            type="password"
            prepend-inner-icon="mdi-lock-outline"
            autocomplete="current-password"
            class="mb-4"
            @keyup.enter="handleLogin"
          />
          <v-btn block color="primary" size="large" :loading="loading" rounded="xl" @click="handleLogin">
            Sign In
          </v-btn>
          <div class="text-center mt-5 text-caption text-medium-emphasis">
            Internal use only · Unauthorized access prohibited
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
