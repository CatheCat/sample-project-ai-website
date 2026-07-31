<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const saving  = ref(false)
const success = ref(false)
const formRef = ref<{ validate: () => Promise<{ valid: boolean }> } | null>(null)

const form = reactive({
  firstName: '', lastName: '', email: '', phone: '',
  dept:       null as string | null,
  jobTitle:   '',
  employType: null as string | null,
  startDate:  '',
  managerId:  '',
  location:   null as string | null,
  notes:      '',
})

const deptOptions = ['Engineering', 'Marketing', 'Finance', 'Operations', 'HR', 'Design', 'Admin']
const typeOptions = ['Full-time', 'Part-time', 'Contract', 'Intern']
const locOptions  = ['Taipei HQ', 'Kaohsiung Office', 'Remote']

const rules = {
  required: (v: string) => !!v || 'This field is required.',
  email:    (v: string) => !v || /.+@.+\..+/.test(v) || 'Enter a valid email address.',
}

async function handleSubmit() {
  const res = await formRef.value?.validate()
  if (!res?.valid) return
  saving.value = true
  await new Promise((r) => setTimeout(r, 700))
  saving.value = false
  success.value = true
  setTimeout(() => router.push('/hr/employees'), 1200)
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">Add New Employee</h1>
      <v-btn variant="outlined" prepend-icon="mdi-arrow-left" @click="router.back()">Back</v-btn>
    </div>

    <v-alert v-if="success" type="success" class="mb-4" text="Employee record created. Redirecting…" />

    <v-form ref="formRef" @submit.prevent="handleSubmit">
      <!-- Section: Personal Info -->
      <v-card elevation="1" class="mb-4">
        <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">Personal Information</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.firstName" label="First Name *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.lastName" label="Last Name *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.email" label="Email *" :rules="[rules.required, rules.email]" prepend-inner-icon="mdi-email-outline" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.phone" label="Phone" prepend-inner-icon="mdi-phone-outline" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Section: Employment Details -->
      <v-card elevation="1" class="mb-4">
        <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">Employment Details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-select v-model="form.dept" :items="deptOptions" label="Department *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.jobTitle" label="Job Title *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="form.employType" :items="typeOptions" label="Employment Type *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.startDate" label="Start Date *" type="date" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.managerId" label="Direct Manager (Employee ID)" />
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="form.location" :items="locOptions" label="Work Location" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Section: Notes -->
      <v-card elevation="1" class="mb-4">
        <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">Additional Notes</v-card-title>
        <v-card-text>
          <v-textarea v-model="form.notes" label="Onboarding notes or remarks" rows="4" counter="500" />
        </v-card-text>
      </v-card>

      <!-- Sticky footer — spec Layout.md §3.4 -->
      <v-footer app elevation="2" class="d-flex justify-end ga-3 px-6 py-4">
        <v-btn variant="outlined" @click="router.back()">Cancel</v-btn>
        <v-btn color="primary" type="submit" :loading="saving" prepend-icon="mdi-account-plus">Create Employee</v-btn>
      </v-footer>
    </v-form>
  </div>
</template>
