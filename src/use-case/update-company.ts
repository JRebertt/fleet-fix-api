import { Company } from '@prisma/client'
import { CompanyRespository } from '@/repositories/company-repository'
import { CompanyAlreadyExistsError } from './error/driver-already-exist-error'
import { CompanyNotFoundError } from './error/company-not-found-error'

interface UpdateCompanyRequest {
  id: string
  name: string
  cnpj: string
  contact_number: string
  contact_email?: string
}

interface UpdateCompanyResponse {
  company: Company
}

export class UpdateCompanyUseCase {
  constructor(private companyRepository: CompanyRespository) {}

  async execute({
    id,
    name,
    cnpj,
    contact_email,
    contact_number,
  }: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
    const existingCompany = await this.companyRepository.findById(id)

    if (!existingCompany) {
      throw new CompanyNotFoundError()
    }

    if (cnpj === existingCompany.cnpj) {
      throw new CompanyAlreadyExistsError()
    }

    const vehicleWithSameLicensePlate =
      await this.companyRepository.findByCnpj(cnpj)

    if (vehicleWithSameLicensePlate && vehicleWithSameLicensePlate.id !== id) {
      throw new CompanyAlreadyExistsError()
    }

    existingCompany.name = name ?? existingCompany.name
    existingCompany.cnpj = cnpj ?? existingCompany.cnpj
    existingCompany.contact_email =
      contact_email ?? existingCompany.contact_email
    existingCompany.contact_number =
      contact_number ?? existingCompany.contact_number

    const updatedCompany = await this.companyRepository.update(existingCompany)

    return { company: updatedCompany }
  }
}
