import { CompanyRespository } from '@/repositories/company-repository'
import { Company } from '@prisma/client'

interface FetchCompaniesUseCaseRequest {
  page: number
}

interface FetchCompaniesUseCaseResponse {
  companies: Company[]
}

export class FetchCompaniesUseCase {
  constructor(private repository: CompanyRespository) {}

  async execute({
    page,
  }: FetchCompaniesUseCaseRequest): Promise<FetchCompaniesUseCaseResponse> {
    const companies = await this.repository.findManyCompanies(page)

    return { companies }
  }
}
