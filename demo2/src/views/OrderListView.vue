<script setup lang="ts">
import { computed, ref } from 'vue'

const loading      = ref(true)
const search       = ref('')
const statusFilter = ref('All')

setTimeout(() => { loading.value = false }, 400)

const statusOptions = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
const statusColor: Record<string, string> = {
  Processing: 'info', Shipped: 'warning', Delivered: 'success', Cancelled: 'error',
}

const orders = [
  { id: 'ORD-2026-038', customer: 'Prism Digital',   subject: 'CRM Starter Pack',    amount: '$210,000', status: 'Delivered', owner: 'Iris Chen', date: '2026-07-25' },
  { id: 'ORD-2026-035', customer: 'Helio Pharma',    subject: 'Network Security Kit', amount: '$56,000',  status: 'Shipped',   owner: 'Cleo Wang', date: '2026-07-22' },
  { id: 'ORD-2026-031', customer: 'Nova Retail',     subject: 'POS System Bundle',    amount: '$380,000', status: 'Processing',owner: 'Sam Hsu',   date: '2026-07-18' },
  { id: 'ORD-2026-028', customer: 'Apex Systems',    subject: 'Server Upgrade',       amount: '$145,000', status: 'Delivered', owner: 'Ryan Lin',  date: '2026-07-12' },
  { id: 'ORD-2026-024', customer: 'Orbit Logistics', subject: 'GPS Fleet Trackers',   amount: '$92,000',  status: 'Cancelled', owner: 'Cleo Wang', date: '2026-07-08' },
]

const filtered = computed(() =>
  orders.filter((o) => {
    const s = search.value.toLowerCase()
    const matchSearch = !s || o.customer.toLowerCase().includes(s) || o.id.toLowerCase().includes(s)
    const matchStatus = statusFilter.value === 'All' || o.status === statusFilter.value
    return matchSearch && matchStatus
  }),
)

const headers = [
  { title: 'Order ID',  key: 'id',       sortable: true },
  { title: 'Customer',  key: 'customer', sortable: true },
  { title: 'Subject',   key: 'subject',  sortable: true },
  { title: 'Owner',     key: 'owner',    sortable: true },
  { title: 'Date',      key: 'date',     sortable: true },
  { title: 'Status',    key: 'status',   sortable: true },
  { title: 'Amount',    key: 'amount',   sortable: false, align: 'end' as const },
]
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Sales Orders</h1>
      <v-btn variant="tonal" prepend-icon="mdi-download-outline" rounded="xl">Export Orders</v-btn>
    </div>

    <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;">
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="5">
            <v-text-field v-model="search" label="Search customer or order ID" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="statusFilter" :items="statusOptions" label="Status" hide-details />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@5" /></v-card-text>

      <v-card-text v-else-if="filtered.length === 0" class="text-center py-12">
        <v-icon icon="mdi-package-variant-closed" size="48" color="medium-emphasis" class="mb-3" />
        <div class="text-medium-emphasis">No orders found.</div>
      </v-card-text>

      <v-data-table v-else :headers="headers" :items="filtered" density="comfortable" hover>
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
