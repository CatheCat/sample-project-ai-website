<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const loading = ref(true)
setTimeout(() => { loading.value = false }, 400)

// spec Layout.md §3.1: Row1 KPI, Row2 trend+alerts, Row3 quick-actions
// Business domain: Sales / CRM — KPIs reflect revenue, pipeline, win rate
const kpis = [
  { label: 'Revenue MTD',       value: '$1.24M', delta: '+12% vs last month',  color: 'success', icon: 'mdi-trending-up'           },
  { label: 'Pipeline Value',    value: '$4.8M',  delta: '38 active deals',     color: 'primary', icon: 'mdi-chart-sankey-variant'  },
  { label: 'Deals Won',         value: '17',     delta: 'Win rate 44%',        color: 'success', icon: 'mdi-handshake-outline'     },
  { label: 'Deals Lost',        value: '8',      delta: 'Loss rate 21%',       color: 'error',   icon: 'mdi-close-circle-outline'  },
  { label: 'New Customers',     value: '23',     delta: '+5 this week',        color: 'info',    icon: 'mdi-office-building-outline'},
  { label: 'Quotations Sent',   value: '41',     delta: '12 awaiting reply',   color: 'warning', icon: 'mdi-file-send-outline'     },
]

const topDeals = [
  { id: 'DEAL-2026-088', customer: 'Apex Systems',    stage: 'Proposal',      value: '$320,000', owner: 'Ryan Lin',   daysOpen: 14, stageColor: 'warning' },
  { id: 'DEAL-2026-085', customer: 'Orbit Logistics', stage: 'Negotiation',   value: '$190,000', owner: 'Cleo Wang',  daysOpen: 28, stageColor: 'error'   },
  { id: 'DEAL-2026-083', customer: 'Nova Retail',     stage: 'Qualification', value: '$540,000', owner: 'Sam Hsu',    daysOpen: 7,  stageColor: 'info'    },
  { id: 'DEAL-2026-081', customer: 'Prism Digital',   stage: 'Proposal',      value: '$210,000', owner: 'Iris Chen',  daysOpen: 21, stageColor: 'warning' },
]

const alerts = [
  { text: '5 quotations expiring in 3 days',      icon: 'mdi-file-clock-outline',    color: 'warning' },
  { text: 'Deal DEAL-2026-072 stalled 30+ days',  icon: 'mdi-alert-circle-outline',  color: 'error'   },
  { text: 'Q3 revenue target 68% achieved',       icon: 'mdi-chart-bar',             color: 'info'    },
]

const quickActions = [
  { label: 'New Quotation', icon: 'mdi-file-document-edit-outline', to: '/sales/quotations/new' },
  { label: 'View Pipeline', icon: 'mdi-handshake-outline',          to: '/crm/deals'            },
  { label: 'View Reports',  icon: 'mdi-chart-bar',                  to: '/analytics/reports'    },
]
</script>

<template>
  <div>
    <!-- Page header -->
    <div class="d-flex align-center justify-space-between mb-5 flex-wrap ga-3">
      <div>
        <h1 class="text-h5 font-weight-bold">Dashboard</h1>
        <div class="text-body-2 text-medium-emphasis mt-1">
          {{ new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
        </div>
      </div>
      <div class="d-flex ga-2 flex-wrap">
        <v-btn variant="outlined" prepend-icon="mdi-download-outline" size="small">Export</v-btn>
        <v-btn color="primary" prepend-icon="mdi-plus" size="small" rounded="xl"
          @click="router.push('/sales/quotations/new')">New Quotation</v-btn>
      </div>
    </div>

    <!-- Loading -->
    <template v-if="loading">
      <v-row class="mb-2"><v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4"><v-skeleton-loader type="card" /></v-col></v-row>
    </template>

    <template v-else>
      <!-- Row 1: KPI cards -->
      <v-row class="mb-3">
        <v-col v-for="kpi in kpis" :key="kpi.label" cols="12" sm="6" md="4" lg="2">
          <v-card elevation="0" rounded="xl" style="border: 1px solid #E0E2F0;" class="h-100">
            <v-card-text>
              <div class="d-flex align-center justify-space-between mb-2">
                <span class="text-caption text-medium-emphasis">{{ kpi.label }}</span>
                <v-icon :icon="kpi.icon" size="18" :color="kpi.color" />
              </div>
              <div class="text-h4 font-weight-bold mb-1" style="color:#1E1B4B;">{{ kpi.value }}</div>
              <v-chip size="x-small" :color="kpi.color" variant="tonal">{{ kpi.delta }}</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Row 2: Top Deals + Alerts -->
      <v-row class="mb-3">
        <v-col cols="12" lg="8">
          <v-card elevation="0" rounded="xl" style="border: 1px solid #E0E2F0;">
            <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
              <span>Top Open Deals</span>
              <v-btn size="small" variant="text" color="primary" to="/crm/deals">Pipeline View</v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-table density="comfortable" hover>
                <thead>
                  <tr><th>Deal</th><th>Customer</th><th>Stage</th><th>Owner</th><th>Days Open</th><th class="text-right">Value</th></tr>
                </thead>
                <tbody>
                  <tr
                    v-for="deal in topDeals"
                    :key="deal.id"
                    class="cursor-pointer"
                    @click="router.push('/crm/deals')"
                  >
                    <td class="font-weight-medium text-primary">{{ deal.id }}</td>
                    <td>{{ deal.customer }}</td>
                    <td><v-chip size="x-small" :color="deal.stageColor" variant="tonal">{{ deal.stage }}</v-chip></td>
                    <td>{{ deal.owner }}</td>
                    <td>{{ deal.daysOpen }}d</td>
                    <td class="text-right font-weight-bold">{{ deal.value }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card elevation="0" rounded="xl" style="border: 1px solid #E0E2F0;" class="mb-4">
            <v-card-title class="pa-4 pb-2">Alerts</v-card-title>
            <v-list density="compact">
              <v-list-item
                v-for="a in alerts"
                :key="a.text"
                :title="a.text"
                :prepend-icon="a.icon"
                :base-color="a.color"
              />
            </v-list>
          </v-card>

          <!-- Row 3: Quick actions -->
          <v-card elevation="0" rounded="xl" style="border: 1px solid #E0E2F0;">
            <v-card-title class="pa-4 pb-2">Quick Actions</v-card-title>
            <v-list density="compact">
              <v-list-item
                v-for="a in quickActions"
                :key="a.label"
                :title="a.label"
                :prepend-icon="a.icon"
                :to="a.to"
                rounded="xl"
                color="primary"
              />
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
