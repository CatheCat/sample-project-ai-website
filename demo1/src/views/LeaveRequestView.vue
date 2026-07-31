<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const loading       = ref(true)
const statusFilter  = ref('Pending')
const selected      = ref<typeof requests[0] | null>(null)
const approving     = ref(false)
const rejecting     = ref(false)

setTimeout(() => { loading.value = false }, 400)

const statusOptions = ['All', 'Pending', 'In Review', 'Approved', 'Rejected']

const requests = [
  { id: 'LV-2026-041', name: 'Alice Chen',  dept: 'Engineering', type: 'Annual Leave',   from: '2026-08-05', to: '2026-08-08', days: 3, status: 'Pending',   reason: 'Family trip — pre-planned vacation.' },
  { id: 'LV-2026-040', name: 'Bob Huang',   dept: 'Marketing',   type: 'Sick Leave',     from: '2026-08-04', to: '2026-08-04', days: 1, status: 'Pending',   reason: 'Flu — medical certificate attached.' },
  { id: 'LV-2026-039', name: 'Carol Lin',   dept: 'Finance',     type: 'Annual Leave',   from: '2026-08-10', to: '2026-08-14', days: 5, status: 'In Review', reason: 'Annual vacation with spouse.' },
  { id: 'LV-2026-038', name: 'David Wu',    dept: 'Operations',  type: 'Personal Leave', from: '2026-08-03', to: '2026-08-03', days: 1, status: 'Pending',   reason: 'Banking appointment.' },
  { id: 'LV-2026-037', name: 'Frank Lee',   dept: 'Engineering', type: 'Annual Leave',   from: '2026-07-28', to: '2026-07-31', days: 4, status: 'Approved',  reason: 'Approved summer leave.' },
  { id: 'LV-2026-036', name: 'Grace Ho',    dept: 'Design',      type: 'Sick Leave',     from: '2026-07-25', to: '2026-07-25', days: 1, status: 'Approved',  reason: 'Dentist appointment.' },
]

const filtered = computed(() =>
  statusFilter.value === 'All' ? requests : requests.filter((r) => r.status === statusFilter.value),
)

const statusColor: Record<string, string> = {
  Pending: 'warning', 'In Review': 'info', Approved: 'success', Rejected: 'error',
}

async function approve() {
  approving.value = true
  await new Promise((r) => setTimeout(r, 600))
  approving.value = false
  if (selected.value) selected.value.status = 'Approved'
}

async function reject() {
  rejecting.value = true
  await new Promise((r) => setTimeout(r, 600))
  rejecting.value = false
  if (selected.value) selected.value.status = 'Rejected'
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Leave Requests</h1>
      <v-select v-model="statusFilter" :items="statusOptions" density="compact" hide-details style="max-width: 160px" />
    </div>

    <v-skeleton-loader v-if="loading" type="list-item-three-line@4" />

    <!-- Split view — spec ERP-Defaults.md §4 Approval pages -->
    <v-row v-else no-gutters class="rounded-lg overflow-hidden" style="border: 1px solid #D1D9E6; min-height: 480px;">
      <!-- Left list -->
      <v-col
        :cols="mdAndDown || !selected ? 12 : 5"
        :class="{ 'd-none': mdAndDown && selected }"
        style="border-right: 1px solid #D1D9E6; overflow-y: auto; max-height: 70vh;"
      >
        <v-list lines="two" density="compact">
          <v-list-item v-if="filtered.length === 0">
            <v-list-item-title class="text-medium-emphasis text-center py-8">No requests in this filter.</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="req in filtered"
            :key="req.id"
            :active="selected?.id === req.id"
            active-color="primary"
            rounded="0"
            class="cursor-pointer"
            style="border-bottom: 1px solid #D1D9E6;"
            @click="selected = req"
          >
            <template #prepend>
              <v-icon icon="mdi-calendar-check-outline" :color="statusColor[req.status]" class="mr-2" />
            </template>
            <v-list-item-title class="font-weight-medium">{{ req.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ req.type }} · {{ req.days }} day(s) · {{ req.dept }}</v-list-item-subtitle>
            <template #append>
              <v-chip size="x-small" :color="statusColor[req.status]" variant="tonal">{{ req.status }}</v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Right detail -->
      <v-col v-if="selected" :cols="mdAndDown ? 12 : 7" class="pa-5">
        <v-btn v-if="mdAndDown" variant="text" prepend-icon="mdi-arrow-left" class="mb-3 px-0" @click="selected = null">All Requests</v-btn>

        <div class="d-flex align-center ga-2 mb-1 flex-wrap">
          <span class="text-h6 font-weight-bold">{{ selected.id }}</span>
          <v-chip size="small" :color="statusColor[selected.status]" variant="tonal">{{ selected.status }}</v-chip>
        </div>
        <div class="text-body-2 text-medium-emphasis mb-4">{{ selected.name }} · {{ selected.dept }}</div>

        <v-row dense class="mb-4">
          <v-col cols="6"><span class="text-caption text-medium-emphasis">Leave Type</span><div class="font-weight-medium">{{ selected.type }}</div></v-col>
          <v-col cols="6"><span class="text-caption text-medium-emphasis">Duration</span><div class="font-weight-medium">{{ selected.days }} day(s)</div></v-col>
          <v-col cols="6"><span class="text-caption text-medium-emphasis">From</span><div class="font-weight-medium">{{ selected.from }}</div></v-col>
          <v-col cols="6"><span class="text-caption text-medium-emphasis">To</span><div class="font-weight-medium">{{ selected.to }}</div></v-col>
        </v-row>

        <div class="text-caption text-medium-emphasis mb-1">Reason</div>
        <p class="text-body-2 mb-5">{{ selected.reason }}</p>

        <div v-if="selected.status === 'Pending' || selected.status === 'In Review'" class="d-flex ga-3">
          <v-btn color="success" prepend-icon="mdi-check" :loading="approving" @click="approve">Approve</v-btn>
          <v-btn color="error" variant="tonal" prepend-icon="mdi-close" :loading="rejecting" @click="reject">Reject</v-btn>
        </div>
        <v-alert v-else-if="selected.status === 'Approved'" type="success" density="compact" text="Leave request approved." />
        <v-alert v-else type="error" density="compact" text="Leave request rejected." />
      </v-col>

      <v-col v-else-if="!mdAndDown" cols="7" class="d-flex align-center justify-center text-medium-emphasis flex-column pa-8">
        <v-icon icon="mdi-cursor-default-click-outline" size="48" class="mb-3" />
        <div>Select a request to review</div>
      </v-col>
    </v-row>
  </div>
</template>
