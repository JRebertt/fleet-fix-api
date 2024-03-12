import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'

export function makeUpdateDriverUseCase() {
  const repository = new PrismaCompaniesRepository()
  const updateDriverUseCase = new UpdateDriverUseCase(repository)

  return updateDriverUseCase
}
