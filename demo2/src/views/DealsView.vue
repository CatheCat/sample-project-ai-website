<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const loading       = ref(true)
const stageFilter   = ref('All')
const selected      = ref<typeof deals[0] | null>(null)
const updating      = ref(false)

setTimeout(() => { loading.value = false }, 400)

const stageOptions = ['All', 'Lead', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']

const deals = [
  { id: 'DEAL-2026-088', title: 'Cloud Infra Renewal',  customer: 'Apex Systems',   owner: 'Ryan Lin',   stage: 'Proposal',      value: '$320,000', probability: 60, created: '2026-07-20', desc: 'Annual cloud infrastructure renewal plus capacity expansion.' },
  { id: 'DEAL-2026-085', title: 'Freight TMS License',  customer: 'Orbit Logistics', owner: 'Cleo Wang',  stage: 'Negotiation',   value: '$190,000', probability: 80, created: '2026-07-06', desc: 'Transport management system — 3-year SaaS license.' },
  { id: 'DEAL-2026-083', title: 'ERP Full Suite',        customer: 'Nova Retail',    owner: 'Sam Hsu',    stage: 'Qualification', value: '$540,000', probability: 30, created: '2026-07-27', desc: 'Full ERP deployment across 12 retail branches.' },
  { id: 'DEAL-2026-081', title: 'CRM Starter Pack',      customer: 'Prism Digital',  owner: 'Iris Chen',  stage: 'Proposal',      value: '$210,000', probability: 55, created: '2026-07-14', desc: 'CRM onboarding bundle with 6-month hypercare support.' },
  { id: 'DEAL-2026-077', title: 'Security Audit',        customer: 'Helio Pharma',   owner: 'Cleo Wang',  stage: 'Lead',          value: '$80,000',  probability: 15, created: '2026-07-29', desc: 'Annual penetration test and compliance audit.' },
  { id: 'DEAL-2026-072', title: 'Pipeline Integration',  customer: 'Vortex Energy',  owner: 'Sam Hsu',    stage: 'Negotiation',   value: '$180,000', probability: 70, created: '2026-07-01', desc: 'SCADA to ERP integration middleware — stalled 31 days.' },
]

const filtered = computed(() =>
  stageFilter.value === 'All' ? deals : deals.filter((d) => d.stage === stageFilter.value),
)

const stageColor: Record<string, string> = {
  Lead: 'default', Qualification: 'info', Proposal: 'warning',
  Negotiation: 'error', 'Closed Won': 'success', 'Closed Lost': 'default',
}

const nextStages: Record<string, string> = {
  Lead: 'Qualification', Qualification: 'Proposal',
  Proposal: 'Negotiation', Negotiation: 'Closed Won',
}

async function advanceStage() {
  if (!selected.value) return
  const next = nextStages[selected.value.stage]
  if (!next) return
  updating.value = true
  await new Promise((r) => setTimeout(r, 600))
  selected.value.stage = next
  updating.value = false
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Deals Pipeline</h1>
      <v-select v-model="stageFilter" :items="stageOptions" density="compact" hide-details style="max-width:180px" />
    </div>

    <v-skeleton-loader v-if="loading" type="list-item-three-line@4" />

    <!-- Split view — spec ERP-Defaults.md §4 Approval pages: list left, detail right -->
    <v-row v-else no-gutters class="rounded-xl overflow-hidden" style="border:1px solid #E0E2F0; min-height:500px;">
      <!-- Left list -->
      <v-col
        :cols="mdAndDown || !selected ? 12 : 5"
        :class="{ 'd-none': mdAndDown && selected }"
        style="border-right:1px solid #E0E2F0; overflow-y:auto; max-height:72vh;"
      >
        <v-list lines="two" density="compact">
          <v-list-item v-if="filtered.length === 0">
            <v-list-item-title class="text-medium-emphasis text-center py-8">No deals in this stage.</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="deal in filtered"
            :key="deal.id"
            :active="selected?.id === deal.id"
            color="primary"
            rounded="0"
            class="cursor-pointer"
            style="border-bottom:1px solid #E0E2F0;"
            @click="selected = deal"
          >
            <template #prepend>
              <v-icon icon="mdi-handshake-outline" :color="stageColor[deal.stage]" class="mr-2" />
            </template>
            <v-list-item-title class="font-weight-medium">{{ deal.customer }}</v-list-item-title>
            <v-list-item-subtitle>{{ deal.title }} · {{ deal.owner }}</v-list-item-subtitle>
            <template #append>
              <div class="text-right">
                <div class="font-weight-bold text-body-2">{{ deal.value }}</div>
                <v-chip size="x-small" :color="stageColor[deal.stage]" variant="tonal">{{ deal.stage }}</v-chip>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Right detail -->
      <v-col v-if="selected" :cols="mdAndDown ? 12 : 7" class="pa-5">
        <v-btn v-if="mdAndDown" variant="text" prepend-icon="mdi-arrow-left" class="mb-3 px-0" @click="selected = null">All Deals</v-btn>

        <div class="d-flex align-center ga-2 mb-1 flex-wrap">
          <span class="text-h6 font-weight-bold">{{ selected.id }}</span>
          <v-chip size="small" :color="stageColor[selected.stage]" variant="tonal">{{ selected.stage }}</v-chip>
        </div>
        <div class="text-body-1 font-weight-medium mb-1">{{ selected.title }}</div>
        <div class="text-body-2 text-medium-emphasis mb-4">{{ selected.customer }}</div>

        <v-row dense class="mb-4">
          <v-col cols="6"><span class="text-caption text-medium-emphasis">Owner</span><div class="font-weight-medium">{{ selected.owner }}</div></v-col>
          <v-col cols="6"><span class="text-caption text-medium-emphasis">Deal Value</span><div class="font-weight-bold text-primary">{{ selected.value }}</div></v-col>
          <v-col cols="6"><span class="text-caption text-medium-emphasis">Win Probability</span><div class="font-weight-medium">{{ selected.probability }}%</div></v-col>
          <v-col cols="6"><span class="text-caption text-medium-emphasis">Created</span><div class="font-weight-medium">{{ selected.created }}</div></v-col>
        </v-row>

        <!-- Win probability bar -->
        <div class="text-caption text-medium-emphasis mb-1">Win Probability</div>
        <v-progress-linear :model-value="selected.probability" color="primary" rounded height="8" class="mb-4" />

        <div class="text-caption text-medium-emphasis mb-1">Description</div>
        <p class="text-body-2 mb-5">{{ selected.desc }}</p>

        <div class="d-flex ga-3 flex-wrap">
          <v-btn
            v-if="nextStages[selected.stage]"
            color="primary"
            prepend-icon="mdi-arrow-right"
            rounded="xl"
            :loading="updating"
            @click="advanceStage"
          >
            Advance to {{ nextStages[selected.stage] }}
          </v-btn>
          <v-btn
            v-if="selected.stage !== 'Closed Won' && selected.stage !== 'Closed Lost'"
            color="error"
            variant="tonal"
            prepend-icon="mdi-close"
            rounded="xl"
          >
            Mark Lost
          </v-btn>
          <v-btn variant="outlined" prepend-icon="mdi-note-edit-outline" rounded="xl">Add Note</v-btn>
        </div>
      </v-col>

      <v-col v-else-if="!mdAndDown" cols="7" class="d-flex align-center justify-center text-medium-emphasis flex-column pa-8">
        <v-icon icon="mdi-handshake-outline" size="56" color="primary" class="mb-3" style="opacity:.3;" />
        <div>Select a deal to view details and advance the pipeline</div>
      </v-col>
    </v-row>
  </div>
</template>
