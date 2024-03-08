import { Company, Prisma } from '@prisma/client'
import { CompanyRespository } from '../company-repository'

export class InMemoryCompanyRepository implements CompanyRespository {
  public items: Company[] = []

  async delete(id: string): Promise<{ message: string }> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index >= 0) {
      this.items.splice(index, 1)
    }
    return { message: 'Empresa deletada com sucesso.' }
  }

  async update(company: Company) {
    const index = this.items.findIndex((item) => item.id === company.id)

    const isValidIndex = index >= 0

    if (isValidIndex) {
      this.items[index] = company
    }

    return company
  }

  async findByCnpj(cnpj: string) {
    const company = this.items.find((item) => item.cnpj === cnpj)

    if (!company) {
      return null
    }

    return company
  }

  async findById(id: string) {
    const company = this.items.find((item) => item.id === id)

    if (!company) {
      return null
    }

    return company
  }

  async findManyCompanies(page: number) {
    const companies = this.items.slice((page - 1) * 20, page * 20)

    return companies
  }

  async create(data: Prisma.CompanyCreateInput) {
    const company = {
      id: 'company-1',
      name: data.name,
      cnpj: data.cnpj,
      contact_number: data.contact_number ?? null,
      contact_email: data.contact_email ?? null,
    }

    this.items.push(company)

    return company
  }
}
