import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Vehicle Creation (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should allow admin to register a vehicle', async () => {
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

    const response = await request(app.server)
      .post('/vehicle')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Ford',
        model: 'Fiesta',
        year: '2020',
        licensePlate: 'XYZ123',
        vin: '1234567890ABCDEFG',
        company_id: company.id,
        driver_id: driver.id,
      })

    expect(response.statusCode).toEqual(201)
  })
})
