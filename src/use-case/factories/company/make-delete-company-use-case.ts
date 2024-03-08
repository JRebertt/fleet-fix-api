import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'
import { DeleteCompanyUseCase } from '@/use-case/delete-company'

export function makeDeleteCompanyUseCase() {
  const repository = new PrismaCompaniesRepository()
  const deleteCompanyUseCase = new DeleteCompanyUseCase(repository)

  return deleteCompanyUseCase
}
