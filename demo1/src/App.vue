<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import { allNavItems, buildBreadcrumbs, findActiveNav, navGroups } from './types/navigation'

const route = useRoute()
const { mdAndDown } = useDisplay()

const drawer      = ref(!mdAndDown.value)
const quickSearch = ref(false)
const searchText  = ref('')

watch(mdAndDown, (isSmall) => { drawer.value = !isSmall })
watch(() => route.fullPath, () => { if (mdAndDown.value) drawer.value = false })

const activeTitle  = computed(() => findActiveNav(route.path)?.title ?? 'ERP Console')
const breadcrumbs  = computed(() => buildBreadcrumbs(route.path))
const searchResult = computed(() => {
  const q = searchText.value.trim().toLowerCase()
  if (!q) return allNavItems
  return allNavItems.filter((i) => i.title.toLowerCase().includes(q))
})

function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    quickSearch.value = true
  }
}
onMounted(()       => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <v-app>
    <!-- Sidebar — spec Layout.md §2: 240px expanded, 72px collapsed -->
    <v-navigation-drawer v-model="drawer" :temporary="mdAndDown" border>
      <div class="drawer-brand pa-4">
        <div class="text-overline text-medium-emphasis">AI Native ERP</div>
        <div class="text-h6 font-weight-bold">demo1</div>
      </div>

      <v-list nav density="compact" class="px-2 pt-2">
        <template v-for="group in navGroups" :key="group.group">
          <v-list-subheader class="text-uppercase text-caption font-weight-medium">
            {{ group.group }}
          </v-list-subheader>
          <v-list-item
            v-for="item in group.items"
            :key="item.to"
            :title="item.title"
            :to="item.to"
            :prepend-icon="item.icon"
            rounded="lg"
            active-color="primary"
          />
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- Top bar — spec Layout.md §2: 56px height -->
    <v-app-bar flat border class="erp-topbar">
      <v-app-bar-nav-icon @click="drawer = !drawer" aria-label="Toggle navigation" />
      <v-app-bar-title class="text-body-1 font-weight-medium">Internal ERP</v-app-bar-title>
      <v-chip size="small" variant="tonal" color="secondary" class="mr-2">{{ activeTitle }}</v-chip>
      <v-spacer />
      <v-btn icon="mdi-magnify"               variant="text" aria-label="Search (Cmd+K)" @click="quickSearch = true" />
      <v-btn icon="mdi-bell-outline"           variant="text" aria-label="Notifications" />
      <v-btn icon="mdi-account-circle-outline" variant="text" aria-label="User menu" />
    </v-app-bar>

    <!-- Main content — spec Layout.md §1: max-width 1440 -->
    <v-main class="erp-main">
      <v-container fluid class="py-5 px-4 px-md-6" style="max-width: 1440px;">
        <v-breadcrumbs :items="breadcrumbs" class="px-0 py-0 mb-4" density="compact" />
        <router-view />
      </v-container>
    </v-main>

    <!-- Global search — spec Menu-Navigation.md §1: shortcut Cmd+K -->
    <v-dialog v-model="quickSearch" max-width="560" @after-leave="searchText = ''">
      <v-card>
        <v-card-title class="pa-4 pb-2">Global Search</v-card-title>
        <v-card-text class="pb-2">
          <v-text-field
            v-model="searchText"
            autofocus
            prepend-inner-icon="mdi-magnify"
            placeholder="Search pages and modules…"
            hide-details
            clearable
          />
        </v-card-text>
        <v-list density="compact" class="px-2 pb-2">
          <v-list-item
            v-for="item in searchResult"
            :key="item.to"
            :title="item.title"
            :prepend-icon="item.icon"
            :to="item.to"
            rounded="lg"
            @click="quickSearch = false"
          />
          <v-list-item v-if="searchResult.length === 0" title="No results found" disabled />
        </v-list>
      </v-card>
    </v-dialog>
  </v-app>
</template>
