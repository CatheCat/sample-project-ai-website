import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/',                    redirect: '/dashboard' },
  { path: '/login',               name: 'login',           component: () => import('../views/LoginView.vue')          },
  { path: '/dashboard',           name: 'dashboard',       component: () => import('../views/DashboardView.vue')      },
  { path: '/crm/customers',       name: 'customers',       component: () => import('../views/CustomerListView.vue')   },
  { path: '/crm/customers/:id',   name: 'customer-detail', component: () => import('../views/CustomerDetailView.vue') },
  { path: '/crm/deals',           name: 'deals',           component: () => import('../views/DealsView.vue')          },
  { path: '/sales/quotations',    name: 'quotations',      component: () => import('../views/QuotationListView.vue')  },
  { path: '/sales/quotations/new',name: 'quotation-new',   component: () => import('../views/QuotationFormView.vue')  },
  { path: '/sales/orders',        name: 'orders',          component: () => import('../views/OrderListView.vue')      },
  { path: '/analytics/reports',   name: 'reports',         component: () => import('../views/ReportsView.vue')        },
  { path: '/audit-log',           name: 'audit-log',       component: () => import('../views/AuditLogView.vue')       },
  { path: '/settings',            name: 'settings',        component: () => import('../views/SettingsView.vue')       },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
