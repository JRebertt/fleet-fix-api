import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'
import { FetchDriversUseCase } from '@/use-case/fetch-drivers'

export function makeFetchDriversUseCase() {
  const repository = new PrismaDriversRepository()
  const fetchDriversUseCase = new FetchDriversUseCase(repository)

  return fetchDriversUseCase
}
