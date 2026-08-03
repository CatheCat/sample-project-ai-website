import { describe, expect, it } from 'vitest'
import router from '../../src/router'

describe('router integration', () => {
  it('contains all required ERP routes', () => {
    const names = router.getRoutes().map((r) => r.name)
    expect(names).toContain('login')
    expect(names).toContain('dashboard')
    expect(names).toContain('customers')
    expect(names).toContain('customer-detail')
    expect(names).toContain('deals')
    expect(names).toContain('quotations')
    expect(names).toContain('quotation-new')
    expect(names).toContain('orders')
    expect(names).toContain('reports')
    expect(names).toContain('audit-log')
    expect(names).toContain('settings')
  })

  it('defines root redirect to dashboard', () => {
    const root = router.getRoutes().find((r) => r.path === '/')
    expect(root).toBeTruthy()
    expect(root?.redirect).toBe('/dashboard')
  })

  it('customer-detail uses dynamic :id param', () => {
    const route = router.getRoutes().find((r) => r.name === 'customer-detail')
    expect(route?.path).toContain(':id')
  })

  it('quotation-new is a distinct route from quotations list', () => {
    const listRoute = router.getRoutes().find((r) => r.name === 'quotations')
    const newRoute  = router.getRoutes().find((r) => r.name === 'quotation-new')
    expect(listRoute?.path).not.toBe(newRoute?.path)
  })

  it('all named routes have components defined', () => {
    router.getRoutes()
      .filter((r) => r.name)
      .forEach((r) => { expect(r.components).toBeDefined() })
  })
})
