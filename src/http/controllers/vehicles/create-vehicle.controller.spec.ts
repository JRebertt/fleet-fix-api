import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/vehicle').send({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate: 'ABC123',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })
    expect(response.statusCode).toEqual(201)
  })
})
