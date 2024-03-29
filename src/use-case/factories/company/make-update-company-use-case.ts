import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'
import { UpdateCompanyUseCase } from '@/use-case/update-company'

export function makeUpdateCompanyUseCase() {
  const repository = new PrismaCompaniesRepository()
  const updateCompanyUseCase = new UpdateCompanyUseCase(repository)

  return updateCompanyUseCase
}
