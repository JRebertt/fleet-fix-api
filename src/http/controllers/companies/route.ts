import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createCompany } from './create-company.controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { fetchCompanies } from './fetch-companies.controller'
import { updateCompany } from './update-company.comtroller'
import { getCompany } from './get-company.controller'
import { deleteCompany } from './delete-company.controller'

export async function companyRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/companies', fetchCompanies)
  app.get('/company/:id', getCompany)

  app.post('/company', { onRequest: [verifyUserRole('ADMIN')] }, createCompany)

  app.put(
    '/company/:id/update',
    { onRequest: [verifyUserRole('ADMIN')] },
    updateCompany,
  )

  app.delete(
    '/company/:id/delete',
    { onRequest: [verifyUserRole('ADMIN')] },
    deleteCompany,
  )
}
