import { makeGetCompanyUseCase } from '@/use-case/factories/company/make-get-company-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getCompany(request: FastifyRequest, reply: FastifyReply) {
  const getCompanyParamsSchema = z.object({
    id: z.string().cuid(),
  })

  const { id } = getCompanyParamsSchema.parse(request.params)

  const getCompanyUseCase = makeGetCompanyUseCase()

  const { company } = await getCompanyUseCase.execute({
    id,
  })

  return reply.status(204).send({
    company,
  })
}
