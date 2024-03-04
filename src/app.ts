import fastify from 'fastify'
import { userRoute } from './http/controllers/users/route'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { vehicleRoute } from './http/controllers/vehicles/route'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(fastifyCors, {
  origin: true,
  credentials: true,
})

app.register(userRoute)
app.register(vehicleRoute)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Error de Validação',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
  return reply.status(500).send({ message: 'Internal server error' })
})
