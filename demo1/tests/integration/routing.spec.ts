import { describe, expect, it } from 'vitest'
import router from '../../src/router'

describe('router integration', () => {
  it('contains all required ERP routes', () => {
    const names = router.getRoutes().map((r) => r.name)
    expect(names).toContain('login')
    expect(names).toContain('dashboard')
    expect(names).toContain('employees')
    expect(names).toContain('employee-detail')
    expect(names).toContain('employee-new')
    expect(names).toContain('leave')
    expect(names).toContain('recruitment')
    expect(names).toContain('payroll')
    expect(names).toContain('expenses')
    expect(names).toContain('audit-log')
    expect(names).toContain('settings')
  })

  it('defines root redirect to dashboard', () => {
    const root = router.getRoutes().find((r) => r.path === '/')
    expect(root).toBeTruthy()
    expect(root?.redirect).toBe('/dashboard')
  })

  it('employee-detail uses dynamic :id param', () => {
    const route = router.getRoutes().find((r) => r.name === 'employee-detail')
    expect(route?.path).toContain(':id')
  })

  it('employee-new route is distinct from employee-detail', () => {
    const newRoute    = router.getRoutes().find((r) => r.name === 'employee-new')
    const detailRoute = router.getRoutes().find((r) => r.name === 'employee-detail')
    expect(newRoute?.path).not.toBe(detailRoute?.path)
  })

  it('all named routes have components defined', () => {
    router.getRoutes()
      .filter((r) => r.name)
      .forEach((r) => { expect(r.components).toBeDefined() })
  })
})
