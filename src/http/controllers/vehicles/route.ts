import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createVehicle } from './create-vehicle.controller'
import { FastifyInstance } from 'fastify'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { updateVehicle } from './update-vehicle.controller'
import { getVehicle } from './get-vehicle.controller'

export async function vehicleRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/vehicle/:vehicleId', getVehicle)
  app.get('/vehicles', getVehicle)

  app.post('/vehicle', { onRequest: [verifyUserRole('ADMIN')] }, createVehicle)
  app.put(
    '/vehicle/:vehicleId/update',
    { onRequest: [verifyUserRole('ADMIN')] },
    updateVehicle,
  )
}
