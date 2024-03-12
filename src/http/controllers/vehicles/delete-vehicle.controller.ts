import { VehicleNotFoundError } from '@/use-case/error/resource-not-found-error'
import { makeDeleteVehicleUseCase } from '@/use-case/factories/vehicle/make-delete-vehicle-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteVehicle(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteVehicleParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteVehicleParamsSchema.parse(request.params)

  try {
    const vehicleUseCase = makeDeleteVehicleUseCase()

    await vehicleUseCase.execute({
      id,
    })
  } catch (err) {
    if (err instanceof VehicleNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send()
  }

  return reply.status(204).send()
}
