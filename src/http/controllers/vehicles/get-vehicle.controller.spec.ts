import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Get Vehicle Information (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get information of a specific vehicle', async () => {
    const { token, user_id } = await createAndAuthenticateUser(app, 'ADMIN')

    // Criação de dados de teste é necessária apenas se seu banco de dados é limpo antes de cada teste
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
        make: 'Porsche',
        model: 'A4',
        year: '2022',
        licensePlate: 'AD65YEY',
        vin: '9TA4NKJ2SXSC58742',
        driver_id: driver.id,
        company_id: company.id,
      },
    })

    // Alteração na rota para se adequar ao propósito do teste
    const response = await request(app.server)
      .get(`/vehicle/${vehicle.id}`) // Certifique-se de que este é o caminho correto para o seu endpoint
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        vehicle: {
          id: vehicle.id,
          make: 'Porsche',
          model: 'A4',
          year: '2022',
          licensePlate: 'AD65YEY',
          vin: '9TA4NKJ2SXSC58742',
          driver_id: driver.id.toString(), // Garantir correspondência de tipo, se necessário
          company_id: company.id.toString(), // Garantir correspondência de tipo, se necessário
        },
      }),
    )
  })
})
