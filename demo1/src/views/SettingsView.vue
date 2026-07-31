<script setup lang="ts">
import { ref } from 'vue'

const saving        = ref(false)
const saveDone      = ref(false)
const emailNotif    = ref(true)
const leaveReminder = ref(true)
const compactTable  = ref(false)
const language      = ref('zh-TW + en')
const langOptions   = ['zh-TW + en', 'en only', 'zh-TW only']

async function savePrefs() {
  saving.value = true
  await new Promise((r) => setTimeout(r, 600))
  saving.value = false
  saveDone.value = true
  setTimeout(() => { saveDone.value = false }, 2500)
}
</script>

<template>
  <div>
    <h1 class="text-h5 font-weight-bold mb-5">Settings</h1>

    <v-alert v-if="saveDone" type="success" density="compact" class="mb-4" text="Preferences saved." />

    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="1">
          <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">Display Preferences</v-card-title>
          <v-card-text>
            <v-switch v-model="emailNotif"    label="Email Notifications"       color="primary" hide-details class="mb-2" />
            <v-switch v-model="leaveReminder" label="Leave Approval Reminders"  color="primary" hide-details class="mb-2" />
            <v-switch v-model="compactTable"  label="Compact Table Density"     color="primary" hide-details />
            <v-select v-model="language" :items="langOptions" label="Interface Language" class="mt-4" />
          </v-card-text>
          <v-card-actions class="px-4 pb-4">
            <v-btn color="primary" :loading="saving" @click="savePrefs">Save Preferences</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="1" class="mb-4">
          <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">Security</v-card-title>
          <v-card-text>
            <v-btn variant="outlined" block class="mb-3" prepend-icon="mdi-lock-reset">Change Password</v-btn>
            <v-btn color="warning" variant="tonal" block prepend-icon="mdi-devices">Sign Out All Sessions</v-btn>
          </v-card-text>
        </v-card>

        <v-card elevation="1">
          <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">About</v-card-title>
          <v-card-text>
            <div class="d-flex justify-space-between py-1"><span class="text-medium-emphasis">Version</span><span>demo1 v0.0.0</span></div>
            <div class="d-flex justify-space-between py-1"><span class="text-medium-emphasis">Design Spec</span><span>AI Native ERP v1.0.0</span></div>
            <div class="d-flex justify-space-between py-1"><span class="text-medium-emphasis">Framework</span><span>Vue 3 + Vuetify 3</span></div>
            <div class="d-flex justify-space-between py-1"><span class="text-medium-emphasis">Domain</span><span>HR / Finance ERP</span></div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
