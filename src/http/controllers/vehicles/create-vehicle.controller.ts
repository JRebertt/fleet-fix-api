import { LicensePlateAlreadyExistError } from '@/use-case/error/license-plate-already-exist-error'
import { makeCreateVehicleUseCase } from '@/use-case/factories/vehicle/make-create-vehicle-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createVehicleBodySchema = z.object({
    make: z.string(),
    model: z.string(),
    year: z.string(),
    licensePlate: z.string(),
    vin: z.string(),
    company_id: z.string(),
    driver_id: z.string(),
  })

  const { make, model, year, licensePlate, vin, company_id, driver_id } =
    createVehicleBodySchema.parse(request.body)

  try {
    const vehicleUseCase = makeCreateVehicleUseCase()

    await vehicleUseCase.execute({
      make,
      model,
      year,
      licensePlate,
      vin,
      company_id,
      driver_id,
    })
  } catch (err) {
    if (err instanceof LicensePlateAlreadyExistError) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
