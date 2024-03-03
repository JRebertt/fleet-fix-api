import { makeRegisterVehicleUseCase } from '@/use-case/factories/make-register-vehicle-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserBodySchema = z.object({
    make: z.string(),
    model: z.string(),
    year: z.string(),
    licensePlate: z.string(),
    vin: z.string(),
    company_id: z.string(),
    driver_id: z.string(),
  })

  const { make, model, year, licensePlate, vin, company_id, driver_id } =
    registerUserBodySchema.parse(request.body)

  try {
    const registerVehicleUseCase = makeRegisterVehicleUseCase()

    await registerVehicleUseCase.execute({
      make,
      model,
      year,
      licensePlate,
      vin,
      company_id,
      driver_id,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
