import { expect, describe, it, beforeEach } from 'vitest'
import { FetchCompaniesUseCase } from './fetch-companies'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'

let repository: InMemoryCompanyRepository
let sut: FetchCompaniesUseCase

describe('Fetch Companies List Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryCompanyRepository()
    sut = new FetchCompaniesUseCase(repository)
  })

  it('should be able to fetch list vehicles', async () => {
    await repository.create({
      name: 'DistCardoso',
      cnpj: '00000000000000',
      contact_number: '9999999999',
      contact_email: 'distcardoso@exemple.com',
    })

    await repository.create({
      name: 'DistJR',
      cnpj: '00000000000000',
      contact_number: '9999999999',
      contact_email: 'distjr@exemple.com',
    })

    const { companies } = await sut.execute({
      page: 1,
    })

    expect(companies).toHaveLength(2)
  })

  it('should be able to fetch paginated compaies list', async () => {
    for (let i = 1; i <= 22; i++) {
      await repository.create({
        name: `Emterprise${i}`,
        cnpj: `00000000000000${i}`,
        contact_number: `9999999999${i}`,
        contact_email: `email${i}@example.com`,
      })
    }

    const { companies } = await sut.execute({
      page: 2,
    })

    expect(companies).toHaveLength(2)
    expect(companies).toEqual([
      expect.objectContaining({
        name: `Emterprise21`,
        contact_email: 'email21@example.com',
      }),
      expect.objectContaining({
        name: `Emterprise22`,
        contact_email: 'email22@example.com',
      }),
    ])
  })
})
