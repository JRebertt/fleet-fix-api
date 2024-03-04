import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { LicensePlateAlreadyExistError } from '@/use-case/error/license-plate-already-exist-error'
import { VehicleNotFoundError } from '@/use-case/error/vehicle-not-found-error'
import { makeUpdateVehicleUseCase } from '@/use-case/factories/make-update-vehicle-use-case'

export async function updateVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateVehicleParamsSchema = z.object({
    vehicleId: z.string().cuid(),
  })

  const updateVehicleBodySchema = z.object({
    make: z.string().optional(),
    model: z.string().optional(),
    year: z.string().optional(),
    licensePlate: z.string(),
    vin: z.string().optional(),
    company_id: z.string(),
    driver_id: z.string(),
  })

  const { make, model, licensePlate, vin, year, company_id, driver_id } =
    updateVehicleBodySchema.parse(request.body)
  const { vehicleId } = updateVehicleParamsSchema.parse(request.params)

  try {
    const updateVehicleUseCase = makeUpdateVehicleUseCase()

    const updatedVehicle = await updateVehicleUseCase.execute({
      id: vehicleId,
      make,
      model,
      licensePlate,
      vin,
      year,
      company_id,
      driver_id,
    })

    return reply.status(200).send(updatedVehicle)
  } catch (err) {
    if (err instanceof LicensePlateAlreadyExistError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof VehicleNotFoundError) {
      return reply.status(404).send({ message: 'Vehicle not found.' })
    }

    return reply.status(500).send({ message: 'Internal server error.' })
  }
}
