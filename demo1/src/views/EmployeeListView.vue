<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const router       = useRouter()
const loading      = ref(true)
const search       = ref('')
const deptFilter   = ref('All')
const statusFilter = ref('All')

setTimeout(() => { loading.value = false }, 450)

const employees = [
  { id: 'EMP-0312', name: 'Alice Chen',  dept: 'Engineering', title: 'Senior Frontend Engineer', status: 'Active',   joined: '2022-03-15' },
  { id: 'EMP-0311', name: 'Bob Huang',   dept: 'Marketing',   title: 'Marketing Specialist',     status: 'Active',   joined: '2021-08-01' },
  { id: 'EMP-0310', name: 'Carol Lin',   dept: 'Finance',     title: 'Finance Analyst',          status: 'Active',   joined: '2023-01-10' },
  { id: 'EMP-0309', name: 'David Wu',    dept: 'Operations',  title: 'Operations Manager',       status: 'Active',   joined: '2020-06-20' },
  { id: 'EMP-0308', name: 'Eva Zhang',   dept: 'HR',          title: 'HR Business Partner',      status: 'Active',   joined: '2022-11-05' },
  { id: 'EMP-0307', name: 'Frank Lee',   dept: 'Engineering', title: 'Backend Engineer',         status: 'On Leave', joined: '2021-04-12' },
  { id: 'EMP-0306', name: 'Grace Ho',    dept: 'Design',      title: 'Product Designer',         status: 'Active',   joined: '2023-06-01' },
  { id: 'EMP-0305', name: 'Henry Tsai',  dept: 'Finance',     title: 'Senior Accountant',        status: 'Inactive', joined: '2019-09-14' },
]

const deptOptions   = ['All', 'Engineering', 'Marketing', 'Finance', 'Operations', 'HR', 'Design']
const statusOptions = ['All', 'Active', 'On Leave', 'Inactive']

const filtered = computed(() =>
  employees.filter((e) => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q)
    const matchDept   = deptFilter.value   === 'All' || e.dept   === deptFilter.value
    const matchStatus = statusFilter.value === 'All' || e.status === statusFilter.value
    return matchSearch && matchDept && matchStatus
  }),
)

const statusColor: Record<string, string> = {
  Active: 'success', 'On Leave': 'warning', Inactive: 'default',
}

const headers = [
  { title: 'ID',         key: 'id',     sortable: true },
  { title: 'Name',       key: 'name',   sortable: true },
  { title: 'Department', key: 'dept',   sortable: true },
  { title: 'Job Title',  key: 'title',  sortable: true },
  { title: 'Joined',     key: 'joined', sortable: true },
  { title: 'Status',     key: 'status', sortable: true },
]
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Employees</h1>
      <v-btn color="primary" prepend-icon="mdi-account-plus" to="/hr/employees/new">Add Employee</v-btn>
    </div>

    <v-card elevation="1">
      <!-- Toolbar: search + filters — spec ERP-Defaults.md §5 -->
      <v-card-text class="pb-0">
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field v-model="search" label="Search by name or ID" prepend-inner-icon="mdi-magnify" hide-details clearable />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select v-model="deptFilter" :items="deptOptions" label="Department" hide-details />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select v-model="statusFilter" :items="statusOptions" label="Status" hide-details />
          </v-col>
          <v-col cols="12" md="2" class="d-flex align-end">
            <v-btn variant="tonal" prepend-icon="mdi-download-outline" block>Export</v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Loading state -->
      <v-card-text v-if="loading"><v-skeleton-loader type="table-row@6" /></v-card-text>

      <!-- Empty state -->
      <v-card-text v-else-if="filtered.length === 0" class="text-center py-12">
        <v-icon icon="mdi-account-search-outline" size="48" color="medium-emphasis" class="mb-3" />
        <div class="text-medium-emphasis">No employees match your filters.</div>
        <v-btn variant="text" class="mt-2" @click="search = ''; deptFilter = 'All'; statusFilter = 'All'">Clear filters</v-btn>
      </v-card-text>

      <!-- Data table -->
      <v-data-table
        v-else
        :headers="headers"
        :items="filtered"
        density="comfortable"
        hover
        @click:row="(_: Event, { item }: { item: typeof filtered[0] }) => router.push(`/hr/employees/${item.id}`)"
      >
        <template #item.status="{ item }">
          <v-chip size="x-small" :color="statusColor[item.status]" variant="tonal">{{ item.status }}</v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
