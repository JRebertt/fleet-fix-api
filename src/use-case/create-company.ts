import { Company } from '@prisma/client'
import { CompanyAlreadyExistsError } from './error/driver-already-exist-error'
import { CompanyRespository } from '@/repositories/company-repository '

interface CreateCompanyRequest {
  name: string
  cnpj: string
  contact_number: string
  contact_email?: string
}

interface CreateCompanyResponse {
  company: Company
}

export class CreateCompanyUseCase {
  constructor(private companyRepository: CompanyRespository) {}

  async execute({
    name,
    cnpj,
    contact_number,
    contact_email,
  }: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const companyWithSomeCnpj = await this.companyRepository.findByCnpj(cnpj)

    if (companyWithSomeCnpj) {
      throw new CompanyAlreadyExistsError()
    }

    const company = await this.companyRepository.create({
      name,
      cnpj,
      contact_number,
      contact_email,
    })

    return {
      company,
    }
  }
}
