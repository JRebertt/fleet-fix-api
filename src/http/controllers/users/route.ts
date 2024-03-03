import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { authenticate } from './authenticate.controller'

export async function userRoute(app: FastifyInstance) {
  // Users
  app.post('/users', register)
  app.post('/sessions', authenticate)
}
