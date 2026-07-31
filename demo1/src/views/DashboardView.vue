<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const loading = ref(true)
setTimeout(() => { loading.value = false }, 400)

// spec Layout.md §3.1 Dashboard: Row1 KPI, Row2 trend+alerts, Row3 quick-actions
// spec ERP-Defaults.md §3: Dashboard is a core page type
const kpiCards = [
  { title: 'Total Employees',    value: '312',  trend: '+4 this month',     trendColor: 'success', icon: 'mdi-account-group-outline'   },
  { title: 'Open Positions',     value: '18',   trend: '6 urgent',          trendColor: 'error',   icon: 'mdi-briefcase-search-outline' },
  { title: 'Pending Leave',      value: '24',   trend: '8 this week',       trendColor: 'warning', icon: 'mdi-calendar-check-outline'   },
  { title: 'Payroll This Month', value: '$2.1M', trend: '+1.2% vs last',    trendColor: 'info',    icon: 'mdi-cash-multiple'            },
  { title: 'Expense Reports',    value: '37',   trend: '9 pending review',  trendColor: 'warning', icon: 'mdi-receipt-text-outline'     },
  { title: 'Onboarding',         value: '5',    trend: 'starting this week', trendColor: 'info',   icon: 'mdi-account-plus-outline'     },
]

const pendingLeave = [
  { id: 'LV-2026-041', name: 'Alice Chen',  dept: 'Engineering', type: 'Annual Leave',   from: '2026-08-05', to: '2026-08-08', status: 'Pending'   },
  { id: 'LV-2026-040', name: 'Bob Huang',   dept: 'Marketing',   type: 'Sick Leave',     from: '2026-08-04', to: '2026-08-04', status: 'Pending'   },
  { id: 'LV-2026-039', name: 'Carol Lin',   dept: 'Finance',     type: 'Annual Leave',   from: '2026-08-10', to: '2026-08-14', status: 'In Review' },
  { id: 'LV-2026-038', name: 'David Wu',    dept: 'Operations',  type: 'Personal Leave', from: '2026-08-03', to: '2026-08-03', status: 'Pending'   },
]

const openPositions = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', applicants: 14, urgency: 'High',   urgencyColor: 'error' },
  { title: 'Finance Analyst',          dept: 'Finance',     applicants: 7,  urgency: 'Medium', urgencyColor: 'info'  },
  { title: 'HR Business Partner',      dept: 'HR',          applicants: 11, urgency: 'Medium', urgencyColor: 'info'  },
]

const alerts = [
  { text: '3 employment contracts expiring in 30 days', icon: 'mdi-file-document-alert-outline', color: 'warning' },
  { text: '2 employees with overdue performance reviews', icon: 'mdi-alert-circle-outline',       color: 'error'   },
  { text: 'Payroll processing due in 5 days',             icon: 'mdi-calendar-clock-outline',     color: 'info'    },
]

const quickActions = [
  { label: 'Add Employee',         icon: 'mdi-account-plus',           to: '/hr/employees/new'  },
  { label: 'Review Leave Queue',   icon: 'mdi-calendar-check-outline', to: '/hr/leave'          },
  { label: 'Run Payroll',          icon: 'mdi-cash-multiple',          to: '/finance/payroll'   },
]

const statusColor: Record<string, string> = {
  Pending: 'warning', 'In Review': 'info', Approved: 'success', Rejected: 'error',
}
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
        <v-btn variant="outlined" prepend-icon="mdi-download-outline" size="small">Export Report</v-btn>
        <v-btn color="primary" prepend-icon="mdi-account-plus" size="small" @click="router.push('/hr/employees/new')">New Employee</v-btn>
      </div>
    </div>

    <!-- Loading skeleton -->
    <template v-if="loading">
      <v-row class="mb-2">
        <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4"><v-skeleton-loader type="card" /></v-col>
      </v-row>
    </template>

    <template v-else>
      <!-- Row 1: KPI Cards (6 cards, within spec 3-8 range) -->
      <v-row class="mb-2">
        <v-col v-for="card in kpiCards" :key="card.title" cols="12" sm="6" md="4" lg="2">
          <v-card elevation="1" class="h-100">
            <v-card-text>
              <div class="d-flex align-center justify-space-between mb-2">
                <span class="text-caption text-medium-emphasis">{{ card.title }}</span>
                <v-icon :icon="card.icon" size="18" color="primary" />
              </div>
              <div class="text-h4 font-weight-bold">{{ card.value }}</div>
              <v-chip class="mt-2" size="x-small" :color="card.trendColor" variant="tonal">{{ card.trend }}</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Row 2: Pending leave + Open positions + Alerts -->
      <v-row class="mb-2">
        <v-col cols="12" lg="7">
          <v-card elevation="1">
            <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
              <span>Pending Leave Requests</span>
              <v-btn size="small" variant="text" color="primary" to="/hr/leave">View All</v-btn>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-table density="comfortable" hover>
                <thead>
                  <tr><th>Employee</th><th>Department</th><th>Type</th><th>Period</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in pendingLeave"
                    :key="row.id"
                    class="cursor-pointer"
                    @click="router.push('/hr/leave')"
                  >
                    <td class="font-weight-medium">{{ row.name }}</td>
                    <td>{{ row.dept }}</td>
                    <td>{{ row.type }}</td>
                    <td>{{ row.from }} → {{ row.to }}</td>
                    <td><v-chip size="x-small" :color="statusColor[row.status]" variant="tonal">{{ row.status }}</v-chip></td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" lg="5">
          <v-card elevation="1" class="mb-4">
            <v-card-title class="d-flex align-center justify-space-between pa-4 pb-2">
              <span>Open Positions</span>
              <v-btn size="small" variant="text" color="primary" to="/hr/recruitment">View All</v-btn>
            </v-card-title>
            <v-list density="compact">
              <v-list-item
                v-for="pos in openPositions"
                :key="pos.title"
                :title="pos.title"
                :subtitle="`${pos.dept} · ${pos.applicants} applicants`"
              >
                <template #append>
                  <v-chip size="x-small" :color="pos.urgencyColor" variant="tonal">{{ pos.urgency }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card>

          <v-card elevation="1">
            <v-card-title class="pa-4 pb-2">System Alerts</v-card-title>
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
        </v-col>
      </v-row>

      <!-- Row 3: Quick actions -->
      <v-row>
        <v-col cols="12">
          <v-card elevation="1">
            <v-card-title class="pa-4 pb-2">Quick Actions</v-card-title>
            <v-card-text class="d-flex ga-3 flex-wrap pt-2">
              <v-btn
                v-for="action in quickActions"
                :key="action.label"
                variant="tonal"
                :prepend-icon="action.icon"
                :to="action.to"
              >{{ action.label }}</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
