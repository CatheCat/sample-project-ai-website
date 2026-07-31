<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route   = useRoute()
const router  = useRouter()
const tab     = ref('profile')
const loading = ref(true)
setTimeout(() => { loading.value = false }, 350)

const empId = computed(() => route.params.id as string)

// Simulated record (in a real app, fetch by empId)
const employee = {
  id: empId.value, name: 'Alice Chen', dept: 'Engineering',
  title: 'Senior Frontend Engineer', status: 'Active',
  email: 'alice.chen@erp.local', phone: '+886-2-1234-5678',
  joined: '2022-03-15', manager: 'David Wu', location: 'Taipei HQ — Floor 8',
}

const leaveBalance = [
  { type: 'Annual Leave',   total: 14, used: 4, remaining: 10 },
  { type: 'Sick Leave',     total: 30, used: 2, remaining: 28 },
  { type: 'Personal Leave', total: 3,  used: 0, remaining: 3  },
]

const performanceHistory = [
  { period: 'H1 2026', rating: 'Exceeds', score: 4.5, reviewer: 'David Wu' },
  { period: 'H2 2025', rating: 'Meets',   score: 4.0, reviewer: 'David Wu' },
  { period: 'H1 2025', rating: 'Meets',   score: 3.8, reviewer: 'David Wu' },
]

const timeline = [
  { event: 'Joined Engineering',  date: '2022-03-15' },
  { event: 'Promoted to Senior',  date: '2023-09-01' },
  { event: 'Team Lead (acting)',   date: '2025-01-15' },
]

const statusColor: Record<string, string> = { Active: 'success', 'On Leave': 'warning', Inactive: 'default' }
const ratingColor: Record<string, string> = { Exceeds: 'success', Meets: 'info', 'Below Expectations': 'error' }
</script>

<template>
  <div>
    <v-skeleton-loader v-if="loading" type="article" />

    <template v-else>
      <!-- Summary + sticky actions — spec Layout.md §3.3 Detail -->
      <div class="d-flex align-start justify-space-between mb-4 flex-wrap ga-3">
        <div class="d-flex align-center ga-3 flex-wrap">
          <v-avatar color="primary" size="56">
            <span class="text-h6 text-white">{{ employee.name.charAt(0) }}</span>
          </v-avatar>
          <div>
            <div class="d-flex align-center ga-2 flex-wrap">
              <h1 class="text-h5 font-weight-bold">{{ employee.name }}</h1>
              <v-chip size="small" :color="statusColor[employee.status]" variant="tonal">{{ employee.status }}</v-chip>
            </div>
            <div class="text-body-2 text-medium-emphasis">{{ employee.title }} · {{ employee.dept }}</div>
          </div>
        </div>
        <div class="d-flex ga-2 flex-wrap">
          <v-btn variant="outlined" prepend-icon="mdi-arrow-left" @click="router.back()">Back</v-btn>
          <v-btn variant="outlined" prepend-icon="mdi-pencil-outline" to="/hr/employees/new">Edit</v-btn>
        </div>
      </div>

      <v-row>
        <!-- Tabs -->
        <v-col cols="12" md="8">
          <v-card elevation="1">
            <v-tabs v-model="tab" color="primary">
              <v-tab value="profile">Profile</v-tab>
              <v-tab value="leave">Leave Balance</v-tab>
              <v-tab value="performance">Performance</v-tab>
            </v-tabs>
            <v-divider />
            <v-tabs-window v-model="tab">
              <v-tabs-window-item value="profile">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Employee ID</span><div class="font-weight-medium">{{ employee.id }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Email</span><div class="font-weight-medium">{{ employee.email }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Phone</span><div class="font-weight-medium">{{ employee.phone }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Direct Manager</span><div class="font-weight-medium">{{ employee.manager }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Location</span><div class="font-weight-medium">{{ employee.location }}</div></v-col>
                    <v-col cols="6" class="py-1"><span class="text-caption text-medium-emphasis">Joined</span><div class="font-weight-medium">{{ employee.joined }}</div></v-col>
                  </v-row>
                </v-card-text>
              </v-tabs-window-item>

              <v-tabs-window-item value="leave">
                <v-table density="comfortable" class="ma-2">
                  <thead><tr><th>Type</th><th class="text-right">Total</th><th class="text-right">Used</th><th class="text-right">Remaining</th></tr></thead>
                  <tbody>
                    <tr v-for="l in leaveBalance" :key="l.type">
                      <td>{{ l.type }}</td>
                      <td class="text-right">{{ l.total }}</td>
                      <td class="text-right">{{ l.used }}</td>
                      <td class="text-right font-weight-medium text-primary">{{ l.remaining }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>

              <v-tabs-window-item value="performance">
                <v-table density="comfortable" class="ma-2">
                  <thead><tr><th>Period</th><th>Rating</th><th class="text-right">Score</th><th>Reviewer</th></tr></thead>
                  <tbody>
                    <tr v-for="p in performanceHistory" :key="p.period">
                      <td>{{ p.period }}</td>
                      <td><v-chip size="x-small" :color="ratingColor[p.rating]" variant="tonal">{{ p.rating }}</v-chip></td>
                      <td class="text-right font-weight-medium">{{ p.score }}</td>
                      <td>{{ p.reviewer }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-card>
        </v-col>

        <!-- Timeline -->
        <v-col cols="12" md="4">
          <v-card elevation="1">
            <v-card-title class="pa-4 pb-2 text-body-1 font-weight-medium">Career Timeline</v-card-title>
            <v-list density="compact">
              <v-list-item
                v-for="(evt, idx) in timeline"
                :key="idx"
                :title="evt.event"
                :subtitle="evt.date"
                :prepend-icon="idx === timeline.length - 1 ? 'mdi-circle' : 'mdi-circle-outline'"
                :base-color="idx === timeline.length - 1 ? 'primary' : 'medium-emphasis'"
              />
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
