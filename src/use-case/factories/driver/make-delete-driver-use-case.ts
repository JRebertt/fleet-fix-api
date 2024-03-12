import { PrismaDriversRepository } from '@/repositories/prisma/prisma-drivers-repository'

export function makeDeleteDriverUseCase() {
  const repository = new PrismaDriversRepository()
  const deleteDriverUseCase = new DeleteDriverUseCase(repository)

  return deleteDriverUseCase
}
