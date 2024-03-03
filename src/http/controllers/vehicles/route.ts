import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createVehicle } from './create-vehicle.controller'
import { FastifyInstance } from 'fastify'

export async function vehicleRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/vehicle', createVehicle)
}
