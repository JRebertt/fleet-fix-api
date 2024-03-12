import { CompanyRespository } from '@/repositories/company-repository'
import { CompanyNotFoundError } from './error/resource-not-found-error'
interface DeleteCompanyRequest {
  id: string
}

interface DeleteCompanyResponse {
  message: string
}

export class DeleteCompanyUseCase {
  constructor(private repository: CompanyRespository) {}

  async execute({ id }: DeleteCompanyRequest): Promise<DeleteCompanyResponse> {
    const existingCompany = await this.repository.findById(id)

    if (!existingCompany) {
      throw new CompanyNotFoundError()
    }

    await this.repository.delete(existingCompany.id)

    return { message: 'Empresa deletada com sucesso' }
  }
}
