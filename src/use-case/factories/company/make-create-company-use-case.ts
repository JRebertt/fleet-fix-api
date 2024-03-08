import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'
import { CreateCompanyUseCase } from '../../create-company'

export function makeCreateCompanyUseCase() {
  const repository = new PrismaCompaniesRepository()
  const createCompanyUseCase = new CreateCompanyUseCase(repository)

  return createCompanyUseCase
}
