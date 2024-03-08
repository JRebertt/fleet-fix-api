import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { createVehicle } from './create-vehicle.controller'
import { FastifyInstance } from 'fastify'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { updateVehicle } from './update-vehicle.controller'
import { getVehicle } from './get-vehicle.controller'
import { fetchVehicles } from './fetch-vehicles.controller'
import { deleteVehicle } from './delete-vehicle.controller'

export async function vehicleRoute(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/vehicle/:id', getVehicle)
  app.get('/vehicles', fetchVehicles)

  app.post('/vehicle', { onRequest: [verifyUserRole('ADMIN')] }, createVehicle)

  app.put(
    '/vehicle/:id/update',
    { onRequest: [verifyUserRole('ADMIN')] },
    updateVehicle,
  )

  app.delete(
    '/vehicle/:id/delete',
    { onRequest: [verifyUserRole('ADMIN')] },
    deleteVehicle,
  )
}
