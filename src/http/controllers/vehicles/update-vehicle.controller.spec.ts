import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Vehicle Update (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update the vehicle successfully', async () => {
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
        full_name: 'John Doe',
        email: 'johndoe@example.com',
        password_hash: '123456',
        birthDate: new Date(),
        cpf: '00000000000',
        contact_number: '99999999999',
        licenseExpiry: new Date(),
        licenseNumber: '9999999999',
        company_id: company.id,
      },
    })

    const { token } = await createAndAuthenticateUser(app, 'ADMIN')
    let vehicle = await prisma.vehicle.create({
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

    const response = await request(app.server)
      .put(`/vehicle/${vehicle.id}/update`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Updated',
        model: 'Vehicle',
        year: '2021',
        licensePlate: 'UPDATE123',
        vin: 'NEWVIN123456789',
        company_id: company.id,
        driver_id: driver.id,
      })

    expect(response.statusCode).toEqual(200)

    vehicle = await prisma.vehicle.findUniqueOrThrow({
      where: {
        id: vehicle.id,
      },
    })

    expect(vehicle.licensePlate).toEqual('UPDATE123')
  })
})
