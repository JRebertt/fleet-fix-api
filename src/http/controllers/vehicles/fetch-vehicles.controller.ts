import { makeFetchVehiclesUseCase } from '@/use-case/factories/vehicle/make-fetch-vehicles-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchVehicles(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const vehiclesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = vehiclesQuerySchema.parse(request.query)

  const fetchVehiclesUseCase = makeFetchVehiclesUseCase()
  const { vehicles } = await fetchVehiclesUseCase.execute({
    page,
  })

  return reply.status(200).send({
    vehicles,
  })
}
