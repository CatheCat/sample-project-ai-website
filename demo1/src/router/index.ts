import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/',                 redirect: '/dashboard' },
  { path: '/login',            name: 'login',           component: () => import('../views/LoginView.vue')          },
  { path: '/dashboard',        name: 'dashboard',       component: () => import('../views/DashboardView.vue')      },
  { path: '/hr/employees',     name: 'employees',       component: () => import('../views/EmployeeListView.vue')   },
  { path: '/hr/employees/new', name: 'employee-new',    component: () => import('../views/EmployeeFormView.vue')   },
  { path: '/hr/employees/:id', name: 'employee-detail', component: () => import('../views/EmployeeDetailView.vue') },
  { path: '/hr/leave',         name: 'leave',           component: () => import('../views/LeaveRequestView.vue')   },
  { path: '/hr/recruitment',   name: 'recruitment',     component: () => import('../views/RecruitmentView.vue')    },
  { path: '/finance/payroll',  name: 'payroll',         component: () => import('../views/PayrollView.vue')        },
  { path: '/finance/expenses', name: 'expenses',        component: () => import('../views/ExpenseListView.vue')    },
  { path: '/audit-log',        name: 'audit-log',       component: () => import('../views/AuditLogView.vue')       },
  { path: '/settings',         name: 'settings',        component: () => import('../views/SettingsView.vue')       },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
