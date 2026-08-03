<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router      = useRouter()
const loading     = ref(true)
const search      = ref('')
const statusFilter = ref('All')

setTimeout(() => { loading.value = false }, 400)

const statusOptions = ['All', 'Draft', 'Sent', 'Accepted', 'Rejected', 'Expired']
const statusColor: Record<string, string> = {
  Draft: 'default', Sent: 'info', Accepted: 'success', Rejected: 'error', Expired: 'warning',
}

const quotations = [
  { id: 'QUO-2026-041', customer: 'Apex Systems',    subject: 'Cloud Infra Renewal',  amount: '$320,000', status: 'Sent',     owner: 'Ryan Lin',   validUntil: '2026-08-10', date: '2026-07-30' },
  { id: 'QUO-2026-040', customer: 'Nova Retail',     subject: 'ERP Full Suite',        amount: '$540,000', status: 'Draft',    owner: 'Sam Hsu',    validUntil: '2026-08-15', date: '2026-07-29' },
  { id: 'QUO-2026-039', customer: 'Helio Pharma',    subject: 'Security Audit',        amount: '$80,000',  status: 'Sent',     owner: 'Cleo Wang',  validUntil: '2026-08-05', date: '2026-07-27' },
  { id: 'QUO-2026-038', customer: 'Prism Digital',   subject: 'CRM Starter Pack',      amount: '$210,000', status: 'Accepted', owner: 'Iris Chen',  validUntil: '2026-08-20', date: '2026-07-25' },
  { id: 'QUO-2026-037', customer: 'Vortex Energy',   subject: 'Pipeline Integration',  amount: '$180,000', status: 'Rejected', owner: 'Sam Hsu',    validUntil: '2026-07-31', date: '2026-07-20' },
  { id: 'QUO-2026-036', customer: 'Orbit Logistics', subject: 'Freight TMS License',   amount: '$190,000', status: 'Expired',  owner: 'Cleo Wang',  validUntil: '2026-07-28', date: '2026-07-14' },
]

const filtered = computed(() =>
  quotations.filter((q) => {
    const s = search.value.toLowerCase()
    const matchSearch = !s || q.customer.toLowerCase().includes(s) || q.id.toLowerCase().includes(s)
    const matchStatus = statusFilter.value === 'All' || q.status === statusFilter.value
    return matchSearch && matchStatus
  }),
)

const headers = [
  { title: 'Quote ID',    key: 'id',         sortable: true },
  { title: 'Customer',    key: 'customer',   sortable: true },
  { title: 'Subject',     key: 'subject',    sortable: true },
  { title: 'Owner',       key: 'owner',      sortable: true },
  { title: 'Date',        key: 'date',       sortable: true },
  { title: 'Valid Until', key: 'validUntil', sortable: true },
  { title: 'Status',      key: 'status',     sortable: true },
  { title: 'Amount',      key: 'amount',     sortable: false, align: 'end' as const },
]
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Quotations</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded="xl" to="/sales/quotations/new">New Quotation</v-btn>
    </div>

    <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;">
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="5">
            <v-text-field v-model="search" label="Search customer or ID" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="statusFilter" :items="statusOptions" label="Status" hide-details />
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-end">
            <v-btn variant="tonal" prepend-icon="mdi-download-outline" block rounded="xl">Export</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@5" /></v-card-text>

      <v-card-text v-else-if="filtered.length === 0" class="text-center py-12">
        <v-icon icon="mdi-file-search-outline" size="48" color="medium-emphasis" class="mb-3" />
        <div class="text-medium-emphasis">No quotations found.</div>
        <v-btn variant="text" class="mt-2" @click="search = ''; statusFilter = 'All'">Clear filters</v-btn>
      </v-card-text>

      <v-data-table v-else :headers="headers" :items="filtered" density="comfortable" hover
        @click:row="() => router.push('/sales/quotations/new')">
        <template #item.status="{ item }">
          <v-chip size="x-small" :color="statusColor[item.status]" variant="tonal">{{ item.status }}</v-chip>
        </template>
        <template #item.amount="{ item }">
          <span class="font-weight-bold">{{ item.amount }}</span>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
