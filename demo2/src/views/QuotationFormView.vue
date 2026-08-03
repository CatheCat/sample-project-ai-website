<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router  = useRouter()
const saving  = ref(false)
const success = ref(false)
const formRef = ref<{ validate: () => Promise<{ valid: boolean }> } | null>(null)

const form = reactive({
  customer:   null as string | null,
  subject:    '',
  dealId:     '',
  owner:      null as string | null,
  validDays:  '30',
  currency:   'USD',
  notes:      '',
  lines:      [
    { desc: '', qty: 1, unit: 0 },
  ],
})

const customers = ['Apex Systems', 'Orbit Logistics', 'Nova Retail', 'Prism Digital', 'Helio Pharma', 'Vortex Energy']
const owners    = ['Ryan Lin', 'Cleo Wang', 'Sam Hsu', 'Iris Chen']
const currencies = ['USD', 'TWD', 'EUR', 'JPY']

function addLine()    { form.lines.push({ desc: '', qty: 1, unit: 0 }) }
function removeLine(i: number) { form.lines.splice(i, 1) }

const totalAmount = () => form.lines.reduce((s, l) => s + l.qty * l.unit, 0)

const rules = {
  required: (v: string | null) => !!v || 'Required.',
  positive: (v: number | string) => Number(v) > 0 || 'Must be > 0.',
}

async function handleSubmit() {
  const res = await formRef.value?.validate()
  if (!res?.valid) return
  saving.value = true
  await new Promise((r) => setTimeout(r, 700))
  saving.value = false
  success.value = true
  setTimeout(() => router.push('/sales/quotations'), 1200)
}
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-3">
      <h1 class="text-h5 font-weight-bold">New Quotation</h1>
      <v-btn variant="outlined" prepend-icon="mdi-arrow-left" rounded="xl" @click="router.back()">Back</v-btn>
    </div>

    <v-alert v-if="success" type="success" class="mb-4" rounded="xl" text="Quotation created. Redirecting…" />

    <v-form ref="formRef" @submit.prevent="handleSubmit">
      <!-- Section: Header info -->
      <v-card elevation="0" rounded="xl" class="mb-4" style="border:1px solid #E0E2F0;">
        <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">Quotation Details</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-autocomplete v-model="form.customer" :items="customers" label="Customer *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.subject" label="Subject / Title *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete v-model="form.owner" :items="owners" label="Owner *" :rules="[rules.required]" />
            </v-col>
            <v-col cols="12" md="4">
              <v-select v-model="form.currency" :items="currencies" label="Currency" />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field v-model="form.validDays" label="Valid for (days)" type="number" :rules="[rules.positive]" />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.dealId" label="Related Deal ID (optional)" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Section: Line items -->
      <v-card elevation="0" rounded="xl" class="mb-4" style="border:1px solid #E0E2F0;">
        <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2 d-flex align-center justify-space-between">
          <span>Line Items</span>
          <v-btn size="small" variant="tonal" prepend-icon="mdi-plus" rounded="xl" @click="addLine">Add Line</v-btn>
        </v-card-title>
        <v-card-text>
          <div v-for="(line, i) in form.lines" :key="i" class="d-flex ga-3 align-start mb-2 flex-wrap">
            <v-text-field v-model="line.desc" :label="`Item ${i+1} Description *`" :rules="[rules.required]" style="flex:3; min-width:200px;" />
            <v-text-field v-model.number="line.qty"  label="Qty"        type="number" :rules="[rules.positive]" style="flex:1; min-width:80px;" />
            <v-text-field v-model.number="line.unit" label="Unit Price" type="number" :rules="[rules.positive]" style="flex:1; min-width:100px;" />
            <div class="d-flex align-center" style="min-width:100px; padding-top:10px;">
              <span class="font-weight-medium">${{ (line.qty * line.unit).toLocaleString() }}</span>
              <v-btn v-if="form.lines.length > 1" icon="mdi-close" variant="text" size="small" color="error" class="ml-1" @click="removeLine(i)" />
            </div>
          </div>
          <v-divider class="mt-2 mb-3" />
          <div class="text-right">
            <span class="text-body-2 text-medium-emphasis mr-3">Total</span>
            <span class="text-h6 font-weight-bold text-primary">${{ totalAmount().toLocaleString() }} {{ form.currency }}</span>
          </div>
        </v-card-text>
      </v-card>

      <!-- Section: Notes -->
      <v-card elevation="0" rounded="xl" class="mb-4" style="border:1px solid #E0E2F0;">
        <v-card-title class="text-body-1 font-weight-medium pa-4 pb-2">Internal Notes</v-card-title>
        <v-card-text>
          <v-textarea v-model="form.notes" label="Notes for internal reference" rows="3" counter="400" />
        </v-card-text>
      </v-card>

      <!-- Sticky footer — spec Layout.md §3.4 -->
      <v-footer app elevation="2" class="d-flex justify-end ga-3 px-6 py-4">
        <v-btn variant="outlined" rounded="xl" @click="router.back()">Cancel</v-btn>
        <v-btn variant="tonal" rounded="xl" prepend-icon="mdi-content-save-outline">Save Draft</v-btn>
        <v-btn color="primary" type="submit" rounded="xl" :loading="saving" prepend-icon="mdi-send">Send Quotation</v-btn>
      </v-footer>
    </v-form>
  </div>
</template>
