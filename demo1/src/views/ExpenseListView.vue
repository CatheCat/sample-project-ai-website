<script setup lang="ts">
import { computed, ref } from 'vue'

const loading    = ref(true)
const search     = ref('')
const typeFilter = ref('All')

setTimeout(() => { loading.value = false }, 400)

const typeOptions   = ['All', 'Travel', 'Meal', 'Equipment', 'Training', 'Other']
const statusColor: Record<string, string> = {
  Pending: 'warning', Approved: 'success', Rejected: 'error', Paid: 'info',
}

const expenses = [
  { id: 'EXP-2026-037', submitter: 'Alice Chen',  dept: 'Engineering', type: 'Equipment', amount: '$320',   status: 'Pending',  date: '2026-07-30', desc: 'Mechanical keyboard for WFH setup' },
  { id: 'EXP-2026-036', submitter: 'Bob Huang',   dept: 'Marketing',   type: 'Travel',    amount: '$1,200', status: 'Approved', date: '2026-07-28', desc: 'Client visit — Taichung round trip' },
  { id: 'EXP-2026-035', submitter: 'Carol Lin',   dept: 'Finance',     type: 'Training',  amount: '$4,500', status: 'Pending',  date: '2026-07-27', desc: 'CPA exam preparation course' },
  { id: 'EXP-2026-034', submitter: 'David Wu',    dept: 'Operations',  type: 'Meal',      amount: '$640',   status: 'Paid',     date: '2026-07-25', desc: 'Team lunch — Q2 closing' },
  { id: 'EXP-2026-033', submitter: 'Eva Zhang',   dept: 'HR',          type: 'Other',     amount: '$180',   status: 'Approved', date: '2026-07-22', desc: 'Office supplies for hiring event' },
  { id: 'EXP-2026-032', submitter: 'Grace Ho',    dept: 'Design',      type: 'Equipment', amount: '$750',   status: 'Pending',  date: '2026-07-20', desc: 'Drawing tablet for UX workflow' },
]

const filtered = computed(() =>
  expenses.filter((e) => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || e.submitter.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)
    const matchType   = typeFilter.value === 'All' || e.type === typeFilter.value
    return matchSearch && matchType
  }),
)

const headers = [
  { title: 'Expense ID',  key: 'id',        sortable: true },
  { title: 'Submitter',   key: 'submitter', sortable: true },
  { title: 'Department',  key: 'dept',      sortable: true },
  { title: 'Type',        key: 'type',      sortable: true },
  { title: 'Date',        key: 'date',      sortable: true },
  { title: 'Description', key: 'desc',      sortable: false },
  { title: 'Status',      key: 'status',    sortable: true },
  { title: 'Amount',      key: 'amount',    sortable: false, align: 'end' as const },
]
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Expense Reports</h1>
      <v-btn color="primary" prepend-icon="mdi-plus">Submit Expense</v-btn>
    </div>

    <v-card elevation="1">
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="5">
            <v-text-field v-model="search" label="Search submitter or ID" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="typeFilter" :items="typeOptions" label="Type" hide-details />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@5" /></v-card-text>

      <v-card-text v-else-if="filtered.length === 0" class="text-center py-12">
        <v-icon icon="mdi-receipt-text-outline" size="48" color="medium-emphasis" class="mb-3" />
        <div class="text-medium-emphasis">No expense reports found.</div>
      </v-card-text>

      <v-data-table v-else :headers="headers" :items="filtered" density="comfortable" hover>
        <template #item.status="{ item }">
          <v-chip size="x-small" :color="statusColor[item.status]" variant="tonal">{{ item.status }}</v-chip>
        </template>
        <template #item.amount="{ item }">
          <span class="font-weight-medium">{{ item.amount }}</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
