import { Company } from '@prisma/client'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { CompanyRespository } from '@/repositories/company-repository'

interface GetCompanyUseCaseRequest {
  id: string
}

interface GetCompanyUseCaseResponse {
  company: Company
}

export class GetCompanyUseCase {
  constructor(private repository: CompanyRespository) {}

  async execute({
    id,
  }: GetCompanyUseCaseRequest): Promise<GetCompanyUseCaseResponse> {
    const company = await this.repository.findById(id)

    if (!company) {
      throw new ResourceNotFoundError()
    }

    return { company }
  }
}
