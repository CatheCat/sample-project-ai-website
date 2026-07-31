<script setup lang="ts">
import { computed, ref } from 'vue'

const loading     = ref(true)
const search      = ref('')
const deptFilter  = ref('All')
const monthFilter = ref('2026-07')

setTimeout(() => { loading.value = false }, 400)

const deptOptions  = ['All', 'Engineering', 'Marketing', 'Finance', 'Operations', 'HR', 'Design']
const monthOptions = ['2026-08', '2026-07', '2026-06', '2026-05']

const records = [
  { id: 'EMP-0312', name: 'Alice Chen',  dept: 'Engineering', base: 85000, bonus: 5000, deduction: 6200, net: 83800, status: 'Processed' },
  { id: 'EMP-0311', name: 'Bob Huang',   dept: 'Marketing',   base: 62000, bonus: 2000, deduction: 4800, net: 59200, status: 'Processed' },
  { id: 'EMP-0310', name: 'Carol Lin',   dept: 'Finance',     base: 72000, bonus: 3500, deduction: 5400, net: 70100, status: 'Pending'   },
  { id: 'EMP-0309', name: 'David Wu',    dept: 'Operations',  base: 95000, bonus: 8000, deduction: 7500, net: 95500, status: 'Processed' },
  { id: 'EMP-0308', name: 'Eva Zhang',   dept: 'HR',          base: 68000, bonus: 0,    deduction: 5100, net: 62900, status: 'Pending'   },
  { id: 'EMP-0307', name: 'Frank Lee',   dept: 'Engineering', base: 78000, bonus: 3000, deduction: 5900, net: 75100, status: 'Processed' },
  { id: 'EMP-0306', name: 'Grace Ho',    dept: 'Design',      base: 65000, bonus: 1500, deduction: 5000, net: 61500, status: 'Processed' },
]

const filtered = computed(() =>
  records.filter((r) => {
    const matchSearch = !search.value || r.name.toLowerCase().includes(search.value.toLowerCase())
    const matchDept   = deptFilter.value === 'All' || r.dept === deptFilter.value
    return matchSearch && matchDept
  }),
)

const totalNet     = computed(() => filtered.value.reduce((s, r) => s + r.net, 0))
const pendingCount = computed(() => filtered.value.filter((r) => r.status === 'Pending').length)

const headers = [
  { title: 'Employee ID', key: 'id',        sortable: true },
  { title: 'Name',        key: 'name',      sortable: true },
  { title: 'Department',  key: 'dept',      sortable: true },
  { title: 'Base (NTD)',  key: 'base',      sortable: true,  align: 'end' as const },
  { title: 'Bonus',       key: 'bonus',     sortable: false, align: 'end' as const },
  { title: 'Deduction',   key: 'deduction', sortable: false, align: 'end' as const },
  { title: 'Net Pay',     key: 'net',       sortable: true,  align: 'end' as const },
  { title: 'Status',      key: 'status',    sortable: true },
]

function fmt(n: number) { return `$${n.toLocaleString()}` }
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <div>
        <h1 class="text-h5 font-weight-bold">Payroll</h1>
        <div class="text-body-2 text-medium-emphasis mt-1">Month: {{ monthFilter }}</div>
      </div>
      <div class="d-flex ga-2 flex-wrap">
        <v-select v-model="monthFilter" :items="monthOptions" density="compact" hide-details style="max-width: 140px" />
        <v-btn variant="tonal" prepend-icon="mdi-download-outline" size="small">Export</v-btn>
        <v-btn color="primary" prepend-icon="mdi-send" size="small">Run Payroll</v-btn>
      </div>
    </div>

    <!-- KPI summary -->
    <v-row class="mb-4">
      <v-col cols="12" sm="4">
        <v-card elevation="1"><v-card-text>
          <div class="text-caption text-medium-emphasis mb-1">Total Net Pay</div>
          <div class="text-h5 font-weight-bold text-primary">{{ fmt(totalNet) }}</div>
        </v-card-text></v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="1"><v-card-text>
          <div class="text-caption text-medium-emphasis mb-1">Employees in Scope</div>
          <div class="text-h5 font-weight-bold">{{ filtered.length }}</div>
        </v-card-text></v-card>
      </v-col>
      <v-col cols="12" sm="4">
        <v-card elevation="1"><v-card-text>
          <div class="text-caption text-medium-emphasis mb-1">Pending Records</div>
          <div class="text-h5 font-weight-bold" :class="pendingCount > 0 ? 'text-warning' : 'text-success'">{{ pendingCount }}</div>
        </v-card-text></v-card>
      </v-col>
    </v-row>

    <v-card elevation="1">
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field v-model="search" label="Search employee" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="deptFilter" :items="deptOptions" label="Department" hide-details />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@6" /></v-card-text>

      <v-data-table v-else :headers="headers" :items="filtered" density="comfortable" hover>
        <template #item.base="{ item }"><span>{{ fmt(item.base) }}</span></template>
        <template #item.bonus="{ item }"><span class="text-success">{{ fmt(item.bonus) }}</span></template>
        <template #item.deduction="{ item }"><span class="text-error">-{{ fmt(item.deduction) }}</span></template>
        <template #item.net="{ item }"><span class="font-weight-bold">{{ fmt(item.net) }}</span></template>
        <template #item.status="{ item }">
          <v-chip size="x-small" :color="item.status === 'Processed' ? 'success' : 'warning'" variant="tonal">{{ item.status }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
