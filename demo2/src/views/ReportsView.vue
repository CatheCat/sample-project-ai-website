<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
setTimeout(() => { loading.value = false }, 400)

const monthlyRevenue = [
  { month: 'Feb', revenue: 820000, deals: 11 },
  { month: 'Mar', revenue: 940000, deals: 14 },
  { month: 'Apr', revenue: 1050000, deals: 16 },
  { month: 'May', revenue: 1120000, deals: 18 },
  { month: 'Jun', revenue: 1080000, deals: 15 },
  { month: 'Jul', revenue: 1240000, deals: 17 },
]

const topOwners = [
  { name: 'Ryan Lin',   revenue: '$420K', deals: 8,  winRate: '52%', color: 'primary'   },
  { name: 'Sam Hsu',    revenue: '$380K', deals: 7,  winRate: '48%', color: 'secondary' },
  { name: 'Cleo Wang',  revenue: '$290K', deals: 6,  winRate: '44%', color: 'info'      },
  { name: 'Iris Chen',  revenue: '$150K', deals: 4,  winRate: '40%', color: 'success'   },
]

const industryBreakdown = [
  { industry: 'Technology',  share: 38, color: 'primary'   },
  { industry: 'Retail',      share: 24, color: 'secondary' },
  { industry: 'Healthcare',  share: 18, color: 'info'      },
  { industry: 'Logistics',   share: 12, color: 'warning'   },
  { industry: 'Energy',      share: 8,  color: 'success'   },
]

const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue))
function barWidth(v: number) { return `${(v / maxRevenue) * 100}%` }
function fmtRevenue(v: number) { return `$${(v / 1000).toFixed(0)}K` }
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-5 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Sales Reports</h1>
      <v-btn variant="tonal" prepend-icon="mdi-download-outline" rounded="xl">Export PDF</v-btn>
    </div>

    <v-skeleton-loader v-if="loading" type="article" />

    <template v-else>
      <v-row class="mb-4">
        <!-- Monthly revenue chart (bar) -->
        <v-col cols="12" md="7">
          <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;">
            <v-card-title class="pa-4 pb-2 text-body-1 font-weight-medium">Monthly Revenue (2026)</v-card-title>
            <v-card-text>
              <div v-for="m in monthlyRevenue" :key="m.month" class="d-flex align-center ga-3 mb-3">
                <div style="width:32px; text-align:right;" class="text-caption text-medium-emphasis">{{ m.month }}</div>
                <div style="flex:1; background:#EEF2F6; border-radius:8px; height:28px; position:relative; overflow:hidden;">
                  <div
                    :style="{ width: barWidth(m.revenue), background: 'linear-gradient(90deg, #4338CA, #7C3AED)', height: '100%', borderRadius: '8px', transition: 'width .5s ease' }"
                  />
                </div>
                <div style="width:60px;" class="text-caption font-weight-medium">{{ fmtRevenue(m.revenue) }}</div>
                <div style="width:28px;" class="text-caption text-medium-emphasis">{{ m.deals }}d</div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Industry breakdown -->
        <v-col cols="12" md="5">
          <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;" class="h-100">
            <v-card-title class="pa-4 pb-2 text-body-1 font-weight-medium">Revenue by Industry</v-card-title>
            <v-card-text>
              <div v-for="ind in industryBreakdown" :key="ind.industry" class="mb-3">
                <div class="d-flex justify-space-between mb-1">
                  <span class="text-body-2">{{ ind.industry }}</span>
                  <span class="text-body-2 font-weight-medium">{{ ind.share }}%</span>
                </div>
                <v-progress-linear :model-value="ind.share" :color="ind.color" rounded height="8" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Top performers -->
      <v-card elevation="0" rounded="xl" style="border:1px solid #E0E2F0;">
        <v-card-title class="pa-4 pb-2 text-body-1 font-weight-medium">Top Sales Owners (YTD)</v-card-title>
        <v-table density="comfortable">
          <thead>
            <tr><th>Rank</th><th>Owner</th><th class="text-right">Revenue</th><th class="text-right">Deals Closed</th><th class="text-right">Win Rate</th></tr>
          </thead>
          <tbody>
            <tr v-for="(o, idx) in topOwners" :key="o.name">
              <td>
                <v-chip size="x-small" :color="o.color" variant="tonal">#{{ idx + 1 }}</v-chip>
              </td>
              <td class="font-weight-medium">{{ o.name }}</td>
              <td class="text-right font-weight-bold text-primary">{{ o.revenue }}</td>
              <td class="text-right">{{ o.deals }}</td>
              <td class="text-right">{{ o.winRate }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </template>
  </div>
</template>
