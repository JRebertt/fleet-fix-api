import { Company, Prisma } from '@prisma/client'
import { CompanyRespository } from '../company-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCompaniesRepository implements CompanyRespository {
  async create(data: Prisma.CompanyCreateInput) {
    const company = await prisma.company.create({
      data,
    })

    return company
  }

  async findById(id: string) {
    const company = await prisma.company.findUnique({
      where: {
        id,
      },
    })

    return company
  }

  async findByCnpj(cnpj: string) {
    const company = await prisma.company.findUnique({
      where: {
        cnpj,
      },
    })

    return company
  }

  async findManyCompanies(page: number) {
    const pageSize = 20
    const skip = (page - 1) * pageSize

    const companies = await prisma.company.findMany({
      skip,
      take: pageSize,
    })

    return companies
  }

  async delete(id: string) {
    await prisma.company.delete({
      where: {
        id,
      },
    })

    return { message: 'Empresa deletado com sucesso' }
  }

  async update(company: Company) {
    const updatedCompany = await prisma.company.update({
      where: {
        id: company.id,
      },
      data: company,
    })
    return updatedCompany
  }
}
