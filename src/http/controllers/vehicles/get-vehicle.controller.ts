import { makeGetVehicleUseCase } from '@/use-case/factories/vehicle/make-get-vehicle-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getVehicle(request: FastifyRequest, reply: FastifyReply) {
  const getVehicleUseCase = makeGetVehicleUseCase()

  const getVehiclesParamsSchema = z.object({
    id: z.string().cuid(),
  })

  const { id } = getVehiclesParamsSchema.parse(request.params)

  const { vehicle } = await getVehicleUseCase.execute({
    id,
  })

  return reply.status(200).send({
    vehicle,
  })
}
