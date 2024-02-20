import { makeRegisterVehicleUseCase } from '@/use-case/factories/make-register-vehicle-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerUserBodySchema = z.object({
    make: z.string(),
    model: z.string(),
    year: z.string(),
    licensePlate: z.string(),
    vin: z.string(),
    Maintenance: z.string(),
    company: z.string(),
    driver: z.string(),
  })

  const { make, model, year, licensePlate, vin, driver, Maintenance, company } =
    registerUserBodySchema.parse(request.body)

  try {
    const registerVehicleUseCase = makeRegisterVehicleUseCase()

    await registerVehicleUseCase.execute({
      make,
      model,
      year,
      licensePlate,
      vin,
      Maintenance,
      company,
      driver,
    })
  } catch (err) {
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message })
    }
    return reply.status(500).send()
  }

  return reply.status(201).send()
}
