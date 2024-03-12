import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateCompanyUseCase } from './update-company'
import { InMemoryCompanyRepository } from '@/repositories/in-memory/in-memory-company-repository'

import { CompanyAlreadyExistsError } from './error/already-exist-error'
import { CompanyNotFoundError } from './error/resource-not-found-error'

let companyRepository: InMemoryCompanyRepository
let sut: UpdateCompanyUseCase

describe('Update Company Use Case', () => {
  beforeEach(() => {
    companyRepository = new InMemoryCompanyRepository()
    sut = new UpdateCompanyUseCase(companyRepository)
  })

  it('should update a company successfully', async () => {
    // Primeiro, criamos uma empresa para depois atualizá-la
    const createdCompany = await companyRepository.create({
      name: 'Acme Corp',
      contact_email: 'contact@acmecorp.com',
      cnpj: '12345678901234',
      contact_number: '(99)99999-9999',
    })

    // Atualização bem-sucedida da empresa
    const updatedCompany = await sut.execute({
      id: createdCompany.id,
      name: 'Acme Corporation',
      contact_email: 'newcontact@acmecorp.com',
      cnpj: '98765432109876', // Atualizando o CNPJ para um novo
      contact_number: '(99)99999-9999',
    })

    expect(updatedCompany.company.id).toEqual(createdCompany.id)
    expect(updatedCompany.company.name).toEqual('Acme Corporation')
    expect(updatedCompany.company.cnpj).toEqual('98765432109876')
  })

  it('should not allow updating company with an existing CNPJ', async () => {
    // Criando duas empresas distintas
    await companyRepository.create({
      name: 'Acme Corp',
      contact_email: 'contact@acmecorp.com',
      cnpj: '12345678901234',
      contact_number: '(99)99999-9999',
    })

    const company2 = await companyRepository.create({
      name: 'Beta Inc',
      contact_email: 'contact@betainc.com',
      cnpj: '43210987654321',
      contact_number: '(99)99999-9999',
    })

    // Tentativa de atualizar a segunda empresa para usar o CNPJ da primeira
    await expect(
      sut.execute({
        id: company2.id, // Assegure-se de estar usando o ID correto aqui
        name: 'Beta Incorporated',
        contact_email: 'newcontact@betainc.com',
        cnpj: '12345678901234', // Tentativa de usar um CNPJ existente
        contact_number: '(99)99999-9999',
      }),
    ).rejects.toBeInstanceOf(CompanyAlreadyExistsError)
  })

  it('should throw an error if the company does not exist', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        name: 'Gamma LLC',
        contact_email: 'contact@gammallc.com',
        cnpj: '56789012345678',
        contact_number: '',
      }),
    ).rejects.toBeInstanceOf(CompanyNotFoundError)
  })
})
