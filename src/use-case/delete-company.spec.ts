import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteCompanyUseCase } from './delete-company'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'
import { CompanyNotFoundError } from './error/company-not-found-error'

let companyRepository: InMemoryCompanyRepository
let sut: DeleteCompanyUseCase

describe('Delete Company Use Case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    sut = new DeleteCompanyUseCase(companyRepository)
  })

  it('should delete a company successfully', async () => {
    const company = await companyRepository.create({
      name: 'Acme Corp',
      contact_email: 'contact@acmecorp.com',
      cnpj: '12345678901234',
      contact_number: '(99)99999-9999',
    })

    const response = await sut.execute({ id: company.id })
    expect(response.message).toBe('Empresa deletada com sucesso')

    await expect(sut.execute({ id: company.id })).rejects.toBeInstanceOf(
      CompanyNotFoundError,
    )
  })

  it('should throw an error if the company does not exist', async () => {
    await expect(sut.execute({ id: 'non-existent-id' })).rejects.toBeInstanceOf(
      CompanyNotFoundError,
    )
  })
})
