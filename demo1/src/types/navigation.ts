// navigation.ts — demo1 IA (HR / Finance ERP)
// Spec: navigation.max_depth ≤ 3, primary count 5-9  (Menu-Navigation.md §1, §2)

export type NavItem = {
  title: string
  icon:  string
  to:    string
}

export type NavGroup = {
  group: string
  items: NavItem[]
}

// L1: business domains  |  L2: modules within domain
export const navGroups: NavGroup[] = [
  {
    group: 'Overview',
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', to: '/dashboard' },
    ],
  },
  {
    group: 'Human Resources',
    items: [
      { title: 'Employees',      icon: 'mdi-account-group-outline',    to: '/hr/employees'   },
      { title: 'Leave Requests', icon: 'mdi-calendar-check-outline',   to: '/hr/leave'       },
      { title: 'Recruitment',    icon: 'mdi-briefcase-search-outline',  to: '/hr/recruitment' },
    ],
  },
  {
    group: 'Finance',
    items: [
      { title: 'Payroll',  icon: 'mdi-cash-multiple',        to: '/finance/payroll'   },
      { title: 'Expenses', icon: 'mdi-receipt-text-outline', to: '/finance/expenses'  },
    ],
  },
  {
    group: 'Admin',
    items: [
      { title: 'Audit Log', icon: 'mdi-history',     to: '/audit-log' },
      { title: 'Settings',  icon: 'mdi-cog-outline', to: '/settings'  },
    ],
  },
]

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items)

// Spec: max navigation depth = 3
export const maxNavigationDepth = 3

export function findActiveNav(path: string): NavItem | undefined {
  return allNavItems.find((item) => path.startsWith(item.to))
}

// Spec: breadcrumb required from level 2 onward  (Menu-Navigation.md §3)
export function buildBreadcrumbs(
  path: string,
): { title: string; to?: string; disabled: boolean }[] {
  const active = findActiveNav(path)
  if (!active) return [{ title: 'Home', disabled: true }]

  const group = navGroups.find((g) => g.items.some((i) => i.to === active.to))
  const crumbs: { title: string; to?: string; disabled: boolean }[] = [
    { title: 'ERP', disabled: false },
  ]
  if (group && group.group !== 'Overview') {
    crumbs.push({ title: group.group, disabled: true })
  }
  crumbs.push({ title: active.title, to: active.to, disabled: true })
  return crumbs
}
