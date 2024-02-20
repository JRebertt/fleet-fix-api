import { Company, Prisma } from '@prisma/client'

export interface CompanyRespository {
  findByCnpj(cnpj: string): Promise<Company | null>
  findManyCompanies(page: number): Promise<Company[]>
  findById(id: string): Promise<Company | null>
  create(data: Prisma.CompanyCreateInput): Promise<Company>
}
