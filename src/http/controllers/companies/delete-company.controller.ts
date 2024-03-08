import { CompanyNotFoundError } from '@/use-case/error/company-not-found-error'
import { makeDeleteCompanyUseCase } from '@/use-case/factories/company/make-delete-company-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCompanyParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteCompanyParamsSchema.parse(request.params)

  try {
    const companyUseCase = makeDeleteCompanyUseCase()

    await companyUseCase.execute({
      id,
    })
  } catch (err) {
    if (err instanceof CompanyNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(204).send()
}
