import { describe, expect, it } from 'vitest'
import { allNavItems, buildBreadcrumbs, findActiveNav, maxNavigationDepth, navGroups } from '../../src/types/navigation'

describe('navigation config', () => {
  it('respects spec max depth (≤ 3)', () => {
    expect(maxNavigationDepth).toBeLessThanOrEqual(3)
  })

  it('primary item count within spec range (5-9)', () => {
    expect(allNavItems.length).toBeGreaterThanOrEqual(5)
    expect(allNavItems.length).toBeLessThanOrEqual(9)
  })

  it('all nav items have title, icon and valid route', () => {
    allNavItems.forEach((item) => {
      expect(item.title.length).toBeGreaterThan(0)
      expect(item.icon.length).toBeGreaterThan(0)
      expect(item.to.startsWith('/')).toBe(true)
    })
  })

  it('finds active item from exact path', () => {
    expect(findActiveNav('/settings')?.title).toBe('Settings')
  })

  it('finds active item from CRM nested path', () => {
    expect(findActiveNav('/crm/customers')?.title).toBe('Customers')
  })

  it('finds active item from Sales path', () => {
    expect(findActiveNav('/sales/quotations')?.title).toBe('Quotations')
  })

  it('finds active item from Analytics path', () => {
    expect(findActiveNav('/analytics/reports')?.title).toBe('Reports')
  })

  it('returns undefined for unknown path', () => {
    expect(findActiveNav('/unknown')).toBeUndefined()
  })

  it('breadcrumbs include CRM group name', () => {
    const crumbs = buildBreadcrumbs('/crm/deals')
    expect(crumbs.some((c) => c.title === 'CRM')).toBe(true)
    expect(crumbs.some((c) => c.title === 'Deals')).toBe(true)
  })

  it('breadcrumbs include Sales group name', () => {
    const crumbs = buildBreadcrumbs('/sales/orders')
    expect(crumbs.some((c) => c.title === 'Sales')).toBe(true)
    expect(crumbs.some((c) => c.title === 'Orders')).toBe(true)
  })

  it('navGroups all have valid group names and items', () => {
    navGroups.forEach((g) => {
      expect(g.group.length).toBeGreaterThan(0)
      expect(g.items.length).toBeGreaterThan(0)
    })
  })
})
