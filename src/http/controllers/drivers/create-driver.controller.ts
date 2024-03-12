import { DriverAlreadyExistsError } from '@/use-case/error/already-exist-error'
import { makeCreateDriverUseCase } from '@/use-case/factories/driver/make-create-driver-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function CreateDriver(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createDriverBodySchema = z.object({
    user_id: z.string(),
    cpf: z.string(),
    contact_number: z.string(),
    birthDate: z.date(),
    licenseNumber: z.string(),
    licenseExpiry: z.date(),
    company_id: z.string(),
  })

  const {
    user_id,
    cpf,
    birthDate,
    contact_number,
    licenseExpiry,
    licenseNumber,
    company_id,
  } = createDriverBodySchema.parse(request.body)

  try {
    const repository = makeCreateDriverUseCase()

    await repository.execute({
      user_id,
      cpf,
      birthDate,
      contact_number,
      licenseExpiry,
      licenseNumber,
      company_id,
    })
  } catch (err) {
    if (err instanceof DriverAlreadyExistsError) {
      return reply.status(400).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
