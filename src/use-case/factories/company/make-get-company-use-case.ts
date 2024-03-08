import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'
import { GetCompanyUseCase } from '../../get-company'

export function makeGetCompanyUseCase() {
  const repository = new PrismaCompaniesRepository()
  const getCompanyUseCase = new GetCompanyUseCase(repository)

  return getCompanyUseCase
}
