import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { GetCompanyUseCase } from './get-company'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let repository: InMemoryCompanyRepository
let sut: GetCompanyUseCase

describe('Get Company Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryCompanyRepository()
    sut = new GetCompanyUseCase(repository)
  })

  it('should be able to get company', async () => {
    const createdCompany = await repository.create({
      name: 'DistCardoso',
      cnpj: '00000000000000',
      contact_number: '9999999999',
      contact_email: 'distcardoso@exemple.com',
    })

    const { company } = await sut.execute({
      id: createdCompany.id,
    })

    expect(company).toEqual(
      expect.objectContaining({
        name: 'DistCardoso',
        cnpj: '00000000000000',
        contact_number: '9999999999',
        contact_email: 'distcardoso@exemple.com',
      }),
    )
  })

  it('should not be able to get company with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
