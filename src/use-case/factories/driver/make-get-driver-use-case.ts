import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { GetDriverUseCase } from '@/use-case/get-driver'

export function makeGetDriverUseCase() {
  const repository = new PrismaDriversRepository()
  const getDriverUseCase = new GetDriverUseCase(repository)

  return getDriverUseCase
}
