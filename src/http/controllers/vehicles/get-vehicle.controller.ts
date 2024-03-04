import { makeGetVehicleUseCase } from '@/use-case/factories/make-get-vehicle-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getVehicle(request: FastifyRequest, reply: FastifyReply) {
  const getVehicleUseCase = makeGetVehicleUseCase()

  const getVehiclesParamsSchema = z.object({
    vehicleId: z.string().cuid(),
  })

  const { vehicleId } = getVehiclesParamsSchema.parse(request.params)

  const { vehicle } = await getVehicleUseCase.execute({
    vehicleId,
  })

  return reply.status(200).send({
    vehicle,
  })
}
