import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Company Creation (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should allow admin to register a company', async () => {
    const { token } = await createAndAuthenticateUser(app, 'ADMIN')

    const response = await request(app.server)
      .post('/company')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'NovoCorp',
        cnpj: '12345678000199',
        contact_number: '1122334455',
        contact_email: 'contact@novocorp.com',
      })

    expect(response.statusCode).toEqual(201)
  })
})
