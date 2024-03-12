import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { CreateCompanyUseCase } from './create-company'
import { CompanyAlreadyExistsError } from './error/already-exist-error'

let companyRepository: InMemoryCompanyRepository
let sut: CreateCompanyUseCase

describe('Create Company Use Case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    sut = new CreateCompanyUseCase(companyRepository)
  })

  it('should to create company', async () => {
    const { company } = await sut.execute({
      name: 'DistCardoso',
      cnpj: '00000000000000',
      contact_number: '9999999999',
      contact_email: 'distcardoso@exemple.com',
    })

    expect(company.id).toEqual(expect.any(String))
  })

  it('should not be able to create company with some cnpj twice', async () => {
    const cnpj = '00000000000000'

    await sut.execute({
      name: 'DistCardoso',
      cnpj,
      contact_number: '9999999999',
      contact_email: 'distcardoso@exemple.com',
    })

    await expect(() =>
      sut.execute({
        name: 'DistCardoso',
        cnpj,
        contact_number: '9999999999',
        contact_email: 'distcardoso@exemple.com',
      }),
    ).rejects.toBeInstanceOf(CompanyAlreadyExistsError)
  })
})
