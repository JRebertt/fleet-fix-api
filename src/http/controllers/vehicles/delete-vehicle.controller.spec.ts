import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Vehicle Delete (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete the vehicle successfully', async () => {
    const { token, user_id } = await createAndAuthenticateUser(app, 'ADMIN')

    const company = await prisma.company.create({
      data: {
        name: 'DistCardoso',
        cnpj: '00000000000000',
        contact_number: '9999999999',
        contact_email: 'distcardoso@example.com',
      },
    })

    const driver = await prisma.driver.create({
      data: {
        user_id,
        birthDate: new Date(),
        cpf: '00000000000',
        contact_number: '99999999999',
        licenseExpiry: new Date(),
        licenseNumber: '9999999999',
        company_id: company.id,
      },
    })

    const vehicle = await prisma.vehicle.create({
      data: {
        make: 'Test',
        model: 'Vehicle',
        year: '2020',
        licensePlate: 'TEST123',
        vin: 'VIN1234567890',
        company_id: company.id,
        driver_id: driver.id,
      },
    })

    const deleteResponse = await request(app.server)
      .delete(`/vehicle/${vehicle.id}/delete`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteResponse.statusCode).toEqual(204)
  })
})
