<script setup lang="ts">
import { computed, ref } from 'vue'

const loading     = ref(true)
const search      = ref('')
const stageFilter = ref('All')

setTimeout(() => { loading.value = false }, 400)

const stageOptions = ['All', 'Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Declined']
const stageColor: Record<string, string>   = {
  Applied: 'default', Screening: 'info', Interview: 'warning',
  Offer: 'secondary', Hired: 'success', Declined: 'error',
}
const urgencyColor: Record<string, string> = { High: 'error', Medium: 'info', Low: 'success' }

const positions = [
  { id: 'JOB-2026-018', title: 'Senior Frontend Engineer', dept: 'Engineering', type: 'Full-time', applicants: 14, stage: 'Interview', urgency: 'High',   posted: '2026-07-15' },
  { id: 'JOB-2026-017', title: 'Finance Analyst',          dept: 'Finance',     type: 'Full-time', applicants: 7,  stage: 'Screening', urgency: 'Medium', posted: '2026-07-20' },
  { id: 'JOB-2026-016', title: 'HR Business Partner',      dept: 'HR',          type: 'Full-time', applicants: 11, stage: 'Interview', urgency: 'Medium', posted: '2026-07-18' },
  { id: 'JOB-2026-015', title: 'Product Designer',         dept: 'Design',      type: 'Full-time', applicants: 22, stage: 'Offer',     urgency: 'Low',    posted: '2026-07-10' },
  { id: 'JOB-2026-014', title: 'Operations Coordinator',   dept: 'Operations',  type: 'Contract',  applicants: 5,  stage: 'Applied',   urgency: 'Low',    posted: '2026-07-28' },
]

const filtered = computed(() =>
  positions.filter((p) => {
    const matchSearch = !search.value || p.title.toLowerCase().includes(search.value.toLowerCase())
    const matchStage  = stageFilter.value === 'All' || p.stage === stageFilter.value
    return matchSearch && matchStage
  }),
)

const headers = [
  { title: 'Job ID',     key: 'id',         sortable: true },
  { title: 'Position',   key: 'title',      sortable: true },
  { title: 'Department', key: 'dept',       sortable: true },
  { title: 'Type',       key: 'type',       sortable: true },
  { title: 'Posted',     key: 'posted',     sortable: true },
  { title: 'Stage',      key: 'stage',      sortable: true },
  { title: 'Urgency',    key: 'urgency',    sortable: true },
  { title: 'Applicants', key: 'applicants', sortable: true, align: 'end' as const },
]
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Recruitment</h1>
      <v-btn color="primary" prepend-icon="mdi-plus">Post New Position</v-btn>
    </div>

    <v-card elevation="1">
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="5">
            <v-text-field v-model="search" label="Search position title" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" md="3">
            <v-select v-model="stageFilter" :items="stageOptions" label="Stage" hide-details />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@5" /></v-card-text>

      <v-card-text v-else-if="filtered.length === 0" class="text-center py-12">
        <v-icon icon="mdi-briefcase-search-outline" size="48" color="medium-emphasis" class="mb-3" />
        <div class="text-medium-emphasis">No open positions found.</div>
      </v-card-text>

      <v-data-table v-else :headers="headers" :items="filtered" density="comfortable" hover>
        <template #item.stage="{ item }">
          <v-chip size="x-small" :color="stageColor[item.stage]" variant="tonal">{{ item.stage }}</v-chip>
        </template>
        <template #item.urgency="{ item }">
          <v-chip size="x-small" :color="urgencyColor[item.urgency]" variant="tonal">{{ item.urgency }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
