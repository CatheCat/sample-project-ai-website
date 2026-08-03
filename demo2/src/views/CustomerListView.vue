<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router   = useRouter()
const loading  = ref(true)
const search   = ref('')
const indFilter = ref('All')
const sizeFilter = ref('All')

setTimeout(() => { loading.value = false }, 450)

const customers = [
  { id: 'CUS-0088', name: 'Apex Systems',     industry: 'Technology',    size: 'Enterprise', region: 'North',  status: 'Active',    owner: 'Ryan Lin',  deals: 3, revenue: '$540K' },
  { id: 'CUS-0085', name: 'Orbit Logistics',  industry: 'Logistics',     size: 'Mid-market', region: 'South',  status: 'Active',    owner: 'Cleo Wang', deals: 2, revenue: '$210K' },
  { id: 'CUS-0083', name: 'Nova Retail',      industry: 'Retail',        size: 'Enterprise', region: 'East',   status: 'Active',    owner: 'Sam Hsu',   deals: 5, revenue: '$890K' },
  { id: 'CUS-0081', name: 'Prism Digital',    industry: 'Technology',    size: 'SMB',        region: 'West',   status: 'Active',    owner: 'Iris Chen', deals: 1, revenue: '$120K' },
  { id: 'CUS-0079', name: 'Crest Finance',    industry: 'Financial',     size: 'Enterprise', region: 'North',  status: 'Inactive',  owner: 'Ryan Lin',  deals: 0, revenue: '$0'    },
  { id: 'CUS-0077', name: 'Helio Pharma',     industry: 'Healthcare',    size: 'Mid-market', region: 'South',  status: 'Active',    owner: 'Cleo Wang', deals: 2, revenue: '$340K' },
  { id: 'CUS-0075', name: 'Vortex Energy',    industry: 'Energy',        size: 'Enterprise', region: 'West',   status: 'At Risk',   owner: 'Sam Hsu',   deals: 1, revenue: '$180K' },
  { id: 'CUS-0073', name: 'Pinecrest Labs',   industry: 'Healthcare',    size: 'SMB',        region: 'East',   status: 'Active',    owner: 'Iris Chen', deals: 2, revenue: '$95K'  },
]

const industries = ['All', 'Technology', 'Logistics', 'Retail', 'Financial', 'Healthcare', 'Energy']
const sizes      = ['All', 'SMB', 'Mid-market', 'Enterprise']
const statusColor: Record<string, string> = {
  Active: 'success', Inactive: 'default', 'At Risk': 'error',
}

const filtered = computed(() =>
  customers.filter((c) => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q)
    const matchInd    = indFilter.value  === 'All' || c.industry === indFilter.value
    const matchSize   = sizeFilter.value === 'All' || c.size     === sizeFilter.value
    return matchSearch && matchInd && matchSize
  }),
)

const headers = [
  { title: 'ID',         key: 'id',       sortable: true },
  { title: 'Company',    key: 'name',     sortable: true },
  { title: 'Industry',   key: 'industry', sortable: true },
  { title: 'Size',       key: 'size',     sortable: true },
  { title: 'Region',     key: 'region',   sortable: true },
  { title: 'Owner',      key: 'owner',    sortable: true },
  { title: 'Deals',      key: 'deals',    sortable: true, align: 'center' as const },
  { title: 'Revenue',    key: 'revenue',  sortable: false, align: 'end' as const },
  { title: 'Status',     key: 'status',   sortable: true },
]
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Customers</h1>
      <v-btn color="primary" prepend-icon="mdi-plus" rounded="xl">Add Customer</v-btn>
    </div>

    <v-card elevation="0" rounded="xl" style="border: 1px solid #E0E2F0;">
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field v-model="search" label="Search company or ID" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select v-model="indFilter" :items="industries" label="Industry" hide-details />
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-select v-model="sizeFilter" :items="sizes" label="Size" hide-details />
          </v-col>
          <v-col cols="12" md="3" class="d-flex align-end">
            <v-btn variant="tonal" prepend-icon="mdi-download-outline" block rounded="xl">Export CRM</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@6" /></v-card-text>

      <v-card-text v-else-if="filtered.length === 0" class="text-center py-12">
        <v-icon icon="mdi-office-building-search-outline" size="48" color="medium-emphasis" class="mb-3" />
        <div class="text-medium-emphasis">No customers match your filters.</div>
        <v-btn variant="text" class="mt-2" @click="search = ''; indFilter = 'All'; sizeFilter = 'All'">Clear filters</v-btn>
      </v-card-text>

      <v-data-table
        v-else
        :headers="headers"
        :items="filtered"
        density="comfortable"
        hover
        @click:row="(_: Event, { item }: { item: typeof filtered[0] }) => router.push(`/crm/customers/${item.id}`)"
      >
        <template #item.name="{ item }">
          <span class="font-weight-medium">{{ item.name }}</span>
        </template>
        <template #item.status="{ item }">
          <v-chip size="x-small" :color="statusColor[item.status]" variant="tonal">{{ item.status }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
