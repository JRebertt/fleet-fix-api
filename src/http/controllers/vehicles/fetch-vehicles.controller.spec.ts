import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Fetch Vehicles (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should fetch vehicles, expecting more than one vehicle', async () => {
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

    await prisma.vehicle.create({
      data: {
        make: 'Ford',
        model: 'Fiesta',
        year: '2020',
        licensePlate: 'XYZ123',
        vin: '1234567890ABCDEFG',
        company_id: company.id,
        driver_id: driver.id,
      },
    })

    await prisma.vehicle.create({
      data: {
        make: 'Porsche',
        model: 'A4',
        year: '2022',
        licensePlate: 'AD65YEY',
        vin: '9TA4NKJ2SXSC58742',
        driver_id: driver.id,
        company_id: company.id,
      },
    })

    const response = await request(app.server)
      .get('/vehicles?page=1') // Altere o caminho conforme necessário para corresponder ao seu endpoint
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(Array.isArray(response.body.vehicles)).toBe(true)
    expect(response.body.vehicles.length).toBeGreaterThan(1)
  })
})
