import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { CreateDriverUseCase } from '@/use-case/create-driver'

export function makeCreateDriverUseCase() {
  const repository = new PrismaDriversRepository()
  const createDriverUseCase = new CreateDriverUseCase(repository)

  return createDriverUseCase
}
