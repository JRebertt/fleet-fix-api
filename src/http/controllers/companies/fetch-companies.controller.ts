import { makeFetchCompaniesUseCase } from '@/use-case/factories/company/make-fetch-companies-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchCompanies(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchCompaniesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchCompaniesQuerySchema.parse(request.query)

  const fetchCompaniesUseCase = makeFetchCompaniesUseCase()

  const { companies } = await fetchCompaniesUseCase.execute({
    page,
  })

  return reply.status(200).send({
    companies,
  })
}
