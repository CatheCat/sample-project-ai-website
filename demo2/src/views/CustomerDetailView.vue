<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route   = useRoute()
const router  = useRouter()
const tab     = ref('overview')
const loading = ref(true)
setTimeout(() => { loading.value = false }, 350)

const customerId = computed(() => route.params.id as string)

const customer = {
  id: customerId.value, name: 'Apex Systems', industry: 'Technology',
  size: 'Enterprise', region: 'North', status: 'Active',
  website: 'https://apex.example.com', owner: 'Ryan Lin',
  phone: '+886-2-8765-4321', since: '2023-06-10', revenue: '$540,000',
}

const contacts = [
  { name: 'James Huang',  title: 'CTO',         email: 'j.huang@apex.example',  phone: '+886-912-000-001' },
  { name: 'Lynn Fang',    title: 'Procurement',  email: 'l.fang@apex.example',   phone: '+886-912-000-002' },
  { name: 'Victor Wu',    title: 'IT Director',  email: 'v.wu@apex.example',     phone: '+886-912-000-003' },
]

const deals = [
  { id: 'DEAL-2026-088', title: 'Cloud Infra Renewal',  stage: 'Proposal',    value: '$320,000', stageColor: 'warning' },
  { id: 'DEAL-2026-063', title: 'Security Suite Add-on', stage: 'Closed Won', value: '$120,000', stageColor: 'success' },
  { id: 'DEAL-2026-041', title: 'ERP Phase 1',           stage: 'Closed Won', value: '$100,000', stageColor: 'success' },
]

const activities = [
  { event: 'Contract renewal discussion', actor: 'Ryan Lin',  date: '2026-08-02 14:30' },
  { event: 'Demo call completed',         actor: 'Cleo Wang', date: '2026-07-30 10:00' },
  { event: 'RFP document sent',           actor: 'Ryan Lin',  date: '2026-07-25 09:15' },
  { event: 'Initial discovery call',      actor: 'Ryan Lin',  date: '2026-07-20 11:00' },
]

const statusColor: Record<string, string> = { Active: 'success', Inactive: 'default', 'At Risk': 'error' }
</script>

<template>
  <div>
    <v-skeleton-loader v-if="loading" type="article" />

    <template v-else>
      <!-- Summary + actions — spec Layout.md §3.3 -->
      <div class="d-flex align-start justify-space-between mb-4 flex-wrap ga-3">
        <div class="d-flex align-center ga-3 flex-wrap">
          <v-avatar color="primary" size="56" rounded="xl">
            <v-icon icon="mdi-office-building-outline" color="white" size="28" />
          </v-avatar>
          <div>
            <div class="d-flex align-center ga-2 flex-wrap">
              <h1 class="text-h5 font-weight-bold">{{ customer.name }}</h1>
              <v-chip size="small" :color="statusColor[customer.status]" variant="tonal">{{ customer.status }}</v-chip>
            </div>
            <div class="text-body-2 text-medium-emphasis">{{ customer.industry }} · {{ customer.size }} · {{ customer.region }}</div>
          </div>
        </div>
        <div class="d-flex ga-2 flex-wrap">
          <v-btn variant="outlined" prepend-icon="mdi-arrow-left" rounded="xl" @click="router.back()">Back</v-btn>
          <v-btn color="primary" prepend-icon="mdi-plus" rounded="xl" @click="router.push('/sales/quotations/new')">New Quotation</v-btn>
        </div>
      </div>

      <v-row>
        <!-- Left: tabs -->
        <v-col cols="12" md="8">
          <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;">
            <v-tabs v-model="tab" color="primary">
              <v-tab value="overview">Overview</v-tab>
              <v-tab value="contacts">Contacts</v-tab>
              <v-tab value="deals">Deals</v-tab>
            </v-tabs>
            <v-divider />
            <v-tabs-window v-model="tab">
              <!-- Overview -->
              <v-tabs-window-item value="overview">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Customer ID</span><div class="font-weight-medium">{{ customer.id }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Owner</span><div class="font-weight-medium">{{ customer.owner }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Phone</span><div class="font-weight-medium">{{ customer.phone }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Website</span><div class="font-weight-medium">{{ customer.website }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Customer Since</span><div class="font-weight-medium">{{ customer.since }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Total Revenue</span><div class="font-weight-bold text-primary">{{ customer.revenue }}</div></v-col>
                  </v-row>
                </v-card-text>
              </v-tabs-window-item>
              <!-- Contacts -->
              <v-tabs-window-item value="contacts">
                <v-list density="comfortable" class="ma-2">
                  <v-list-item
                    v-for="c in contacts"
                    :key="c.email"
                    :title="c.name"
                    :subtitle="`${c.title} · ${c.email}`"
                    prepend-icon="mdi-account-outline"
                    rounded="xl"
                  >
                    <template #append>
                      <v-btn icon="mdi-phone-outline" variant="text" size="small" :href="`tel:${c.phone}`" />
                    </template>
                  </v-list-item>
                </v-list>
              </v-tabs-window-item>
              <!-- Deals -->
              <v-tabs-window-item value="deals">
                <v-table density="comfortable" class="ma-2">
                  <thead><tr><th>Deal ID</th><th>Title</th><th>Stage</th><th class="text-right">Value</th></tr></thead>
                  <tbody>
                    <tr v-for="d in deals" :key="d.id">
                      <td class="font-weight-medium text-primary">{{ d.id }}</td>
                      <td>{{ d.title }}</td>
                      <td><v-chip size="x-small" :color="d.stageColor" variant="tonal">{{ d.stage }}</v-chip></td>
                      <td class="text-right font-weight-bold">{{ d.value }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card>
        </v-col>

        <!-- Right: activity log -->
        <v-col cols="12" md="4">
          <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;">
            <v-card-title class="pa-4 pb-2 text-body-1 font-weight-medium">Activity Log</v-card-title>
            <v-list density="compact">
              <v-list-item
                v-for="(a, idx) in activities"
                :key="idx"
                :title="a.event"
                :subtitle="`${a.actor} · ${a.date}`"
                :prepend-icon="idx === 0 ? 'mdi-circle' : 'mdi-circle-outline'"
                :base-color="idx === 0 ? 'primary' : 'medium-emphasis'"
              />
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
