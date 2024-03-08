import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Fetch Companies (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should fetch companies, expecting more than one company', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    // Criação de empresas para teste
    await prisma.company.create({
      data: {
        name: 'TechCorp',
        cnpj: '11222333000181',
        contact_number: '11999887766',
        contact_email: 'info@techcorp.com',
      },
    })

    await prisma.company.create({
      data: {
        name: 'Innovatech',
        cnpj: '99887766000121',
        contact_number: '11987654321',
        contact_email: 'contact@innovatech.com',
      },
    })

    const response = await request(app.server)
      .get('/companies?page=1')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200)
    expect(Array.isArray(response.body.companies)).toBe(true)
    expect(response.body.companies.length).toBeGreaterThan(1)
  })
})
