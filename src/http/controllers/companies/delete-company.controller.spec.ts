import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Company Delete (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete the company successfully', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    console.log(token)

    // Criação da empresa para posterior exclusão
    const { id } = await prisma.company.create({
      data: {
        name: 'TempCorp',
        cnpj: '12345678000199',
        contact_number: '1122334455',
        contact_email: 'contact@tempcorp.com',
      },
    })

    // Exclusão da empresa
    const deleteResponse = await request(app.server)
      .delete(`/company/${id}/delete`)
      .set('Authorization', `Bearer ${token}`)

    expect(deleteResponse.statusCode).toEqual(204)

    // Tentativa de buscar a empresa após a exclusão para confirmar que ela foi removida
    const companyFound = await prisma.company.findUnique({
      where: {
        id,
      },
    })

    expect(companyFound).toBeNull()
  })
})
