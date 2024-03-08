import { PrismaCompaniesRepository } from '@/repositories/prisma/prisma-companies-repository'
import { FetchCompaniesUseCase } from '../../fetch-companies'

export function makeFetchCompaniesUseCase() {
  const repository = new PrismaCompaniesRepository()
  const fetchCompaniesUseCase = new FetchCompaniesUseCase(repository)

  return fetchCompaniesUseCase
}
