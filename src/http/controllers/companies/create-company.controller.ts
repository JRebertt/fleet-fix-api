import { CompanyAlreadyExistsError } from '@/use-case/error/driver-already-exist-error'
import { makeCreateCompanyUseCase } from '@/use-case/factories/company/make-create-company-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCompanyBodySchema = z.object({
    name: z.string().min(1),
    cnpj: z.string(),
    contact_number: z.string(),
    contact_email: z.string(),
  })

  const { name, cnpj, contact_email, contact_number } =
    createCompanyBodySchema.parse(request.body)

  try {
    const companyUseCase = makeCreateCompanyUseCase()

    await companyUseCase.execute({
      name,
      cnpj,
      contact_email,
      contact_number,
    })
  } catch (err) {
    if (err instanceof CompanyAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
