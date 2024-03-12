import { LicensePlateAlreadyExistError } from '@/use-case/error/already-exist-error'
import { CompanyNotFoundError } from '@/use-case/error/resource-not-found-error'
import { makeUpdateCompanyUseCase } from '@/use-case/factories/company/make-update-company-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateCompany(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCompanyParamsSchema = z.object({
    id: z.string().cuid(),
  })

  const updateCompanyBodySchema = z.object({
    name: z.string(),
    cnpj: z.string(),
    contact_email: z.string(),
    contact_number: z.string(),
  })

  const { name, cnpj, contact_email, contact_number } =
    updateCompanyBodySchema.parse(request.body)
  const { id } = updateCompanyParamsSchema.parse(request.params)

  try {
    const updateCompanyUseCase = makeUpdateCompanyUseCase()

    const updatedCompany = await updateCompanyUseCase.execute({
      id,
      name,
      cnpj,
      contact_email,
      contact_number,
    })

    return reply.status(200).send(updatedCompany)
  } catch (err) {
    if (err instanceof LicensePlateAlreadyExistError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof CompanyNotFoundError) {
      return reply.status(404).send({ message: 'Company not found.' })
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  }
}
