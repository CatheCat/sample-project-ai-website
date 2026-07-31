<script setup lang="ts">
import { computed, ref } from 'vue'

const loading      = ref(true)
const search       = ref('')
const actionFilter = ref('All')

setTimeout(() => { loading.value = false }, 400)

const actionOptions = ['All', 'CREATE', 'UPDATE', 'DELETE', 'APPROVE', 'REJECT', 'LOGIN', 'EXPORT']
const actionColor: Record<string, string> = {
  CREATE: 'success', UPDATE: 'info', DELETE: 'error',
  APPROVE: 'success', REJECT: 'error', LOGIN: 'secondary', EXPORT: 'warning',
}

const logs = [
  { id: 'AUD-001', actor: 'Eva Zhang',  action: 'APPROVE', target: 'LV-2026-037',   module: 'HR',      time: '2026-08-03 14:22', ip: '192.168.1.34' },
  { id: 'AUD-002', actor: 'Alice Chen', action: 'CREATE',  target: 'EXP-2026-037',  module: 'Finance', time: '2026-08-03 10:15', ip: '192.168.1.57' },
  { id: 'AUD-003', actor: 'David Wu',   action: 'UPDATE',  target: 'EMP-0307',      module: 'HR',      time: '2026-08-02 16:48', ip: '192.168.1.23' },
  { id: 'AUD-004', actor: 'Carol Lin',  action: 'EXPORT',  target: 'Payroll',       module: 'Finance', time: '2026-08-02 11:30', ip: '192.168.1.88' },
  { id: 'AUD-005', actor: 'Bob Huang',  action: 'LOGIN',   target: 'system',        module: 'Auth',    time: '2026-08-02 09:02', ip: '192.168.1.12' },
  { id: 'AUD-006', actor: 'Eva Zhang',  action: 'REJECT',  target: 'EXP-2026-033', module: 'Finance', time: '2026-08-01 17:05', ip: '192.168.1.34' },
  { id: 'AUD-007', actor: 'David Wu',   action: 'DELETE',  target: 'DRAFT-EMP-003', module: 'HR',      time: '2026-08-01 14:00', ip: '192.168.1.23' },
  { id: 'AUD-008', actor: 'Grace Ho',   action: 'CREATE',  target: 'JOB-2026-018',  module: 'HR',      time: '2026-07-31 09:45', ip: '192.168.1.75' },
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
      <v-btn variant="tonal" prepend-icon="mdi-download-outline" size="small">Export Log</v-btn>
    </div>

    <v-card elevation="1">
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
