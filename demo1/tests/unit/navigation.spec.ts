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

  it('finds active item from HR nested path', () => {
    expect(findActiveNav('/hr/employees')?.title).toBe('Employees')
  })

  it('finds active item from Finance path', () => {
    expect(findActiveNav('/finance/payroll')?.title).toBe('Payroll')
  })

  it('returns undefined for unknown path', () => {
    expect(findActiveNav('/unknown')).toBeUndefined()
  })

  it('breadcrumbs include HR group name', () => {
    const crumbs = buildBreadcrumbs('/hr/leave')
    expect(crumbs.some((c) => c.title === 'Human Resources')).toBe(true)
    expect(crumbs.some((c) => c.title === 'Leave Requests')).toBe(true)
  })

  it('breadcrumbs include Finance group name', () => {
    const crumbs = buildBreadcrumbs('/finance/expenses')
    expect(crumbs.some((c) => c.title === 'Finance')).toBe(true)
    expect(crumbs.some((c) => c.title === 'Expenses')).toBe(true)
  })

  it('navGroups all have non-empty group names and at least one item', () => {
    navGroups.forEach((g) => {
      expect(g.group.length).toBeGreaterThan(0)
      expect(g.items.length).toBeGreaterThan(0)
    })
  })
})
