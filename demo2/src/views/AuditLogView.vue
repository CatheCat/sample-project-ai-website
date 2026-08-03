<script setup lang="ts">
import { computed, ref } from 'vue'

const loading      = ref(true)
const search       = ref('')
const actionFilter = ref('All')

setTimeout(() => { loading.value = false }, 400)

const actionOptions = ['All', 'CREATE', 'UPDATE', 'DELETE', 'SEND', 'APPROVE', 'LOGIN', 'EXPORT']
const actionColor: Record<string, string> = {
  CREATE: 'success', UPDATE: 'info', DELETE: 'error',
  SEND: 'primary', APPROVE: 'success', LOGIN: 'secondary', EXPORT: 'warning',
}

const logs = [
  { id: 'AUD-001', actor: 'Ryan Lin',   action: 'SEND',   target: 'QUO-2026-041',   module: 'Sales',     time: '2026-08-03 15:10', ip: '192.168.2.41' },
  { id: 'AUD-002', actor: 'Iris Chen',  action: 'CREATE', target: 'QUO-2026-040',   module: 'Sales',     time: '2026-08-03 11:22', ip: '192.168.2.55' },
  { id: 'AUD-003', actor: 'Sam Hsu',    action: 'UPDATE', target: 'DEAL-2026-083',  module: 'CRM',       time: '2026-08-02 17:45', ip: '192.168.2.33' },
  { id: 'AUD-004', actor: 'Cleo Wang',  action: 'EXPORT', target: 'Reports',        module: 'Analytics', time: '2026-08-02 14:00', ip: '192.168.2.27' },
  { id: 'AUD-005', actor: 'Ryan Lin',   action: 'LOGIN',  target: 'system',         module: 'Auth',      time: '2026-08-02 09:01', ip: '192.168.2.41' },
  { id: 'AUD-006', actor: 'Sam Hsu',    action: 'DELETE', target: 'DRAFT-QUO-003',  module: 'Sales',     time: '2026-08-01 16:30', ip: '192.168.2.33' },
  { id: 'AUD-007', actor: 'Iris Chen',  action: 'APPROVE',target: 'ORD-2026-038',   module: 'Sales',     time: '2026-08-01 11:00', ip: '192.168.2.55' },
  { id: 'AUD-008', actor: 'Cleo Wang',  action: 'UPDATE', target: 'CUS-0085',       module: 'CRM',       time: '2026-07-31 10:15', ip: '192.168.2.27' },
]

const filtered = computed(() =>
  logs.filter((l) => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || l.actor.toLowerCase().includes(q) || l.target.toLowerCase().includes(q)
    const matchAction = actionFilter.value === 'All' || l.action === actionFilter.value
    return matchSearch && matchAction
  }),
)

const headers = [
  { title: 'Log ID',  key: 'id',     sortable: true },
  { title: 'Actor',   key: 'actor',  sortable: true },
  { title: 'Action',  key: 'action', sortable: true },
  { title: 'Target',  key: 'target', sortable: true },
  { title: 'Module',  key: 'module', sortable: true },
  { title: 'Time',    key: 'time',   sortable: true },
  { title: 'IP',      key: 'ip',     sortable: false },
]
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Audit Log</h1>
      <v-btn variant="tonal" prepend-icon="mdi-download-outline" rounded="xl" size="small">Export Log</v-btn>
    </div>

    <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;">
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="5">
            <v-text-field v-model="search" label="Search actor or target" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="actionFilter" :items="actionOptions" label="Action" hide-details />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@6" /></v-card-text>

      <v-card-text v-else-if="filtered.length === 0" class="text-center py-12">
        <v-icon icon="mdi-history" size="48" color="medium-emphasis" class="mb-3" />
        <div class="text-medium-emphasis">No log entries found.</div>
      </v-card-text>

      <v-data-table v-else :headers="headers" :items="filtered" density="comfortable" hover>
        <template #item.action="{ item }">
          <v-chip size="x-small" :color="actionColor[item.action] ?? 'default'" variant="tonal">{{ item.action }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
