// navigation.ts — demo2 IA (Sales / CRM ERP)
// Spec: navigation.max_depth ≤ 3, primary_count 5-9  (Menu-Navigation.md §1)
// IA Level 1: CRM, Sales, Analytics, Admin            (Menu-Navigation.md §2)

export type NavItem = {
  title: string
  icon:  string
  to:    string
}

export type NavGroup = {
  group: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    group: 'Overview',
    items: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard-variant-outline', to: '/dashboard' },
    ],
  },
  {
    group: 'CRM',
    items: [
      { title: 'Customers', icon: 'mdi-office-building-outline',   to: '/crm/customers' },
      { title: 'Deals',     icon: 'mdi-handshake-outline',         to: '/crm/deals'     },
    ],
  },
  {
    group: 'Sales',
    items: [
      { title: 'Quotations', icon: 'mdi-file-document-edit-outline', to: '/sales/quotations' },
      { title: 'Orders',     icon: 'mdi-package-variant-closed',     to: '/sales/orders'     },
    ],
  },
  {
    group: 'Analytics',
    items: [
      { title: 'Reports', icon: 'mdi-chart-bar', to: '/analytics/reports' },
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

// Spec constraint: max depth = 3
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
    { title: 'Sales ERP', disabled: false },
  ]
  if (group && group.group !== 'Overview') {
    crumbs.push({ title: group.group, disabled: true })
  }
  crumbs.push({ title: active.title, to: active.to, disabled: true })
  return crumbs
}
