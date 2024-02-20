import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryDriverRepository } from '@/repositories/in-memory/in-memory-driver-repository'
import { FetchDriversUseCase } from './fetch-drivers'

let repository: InMemoryDriverRepository
let sut: FetchDriversUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryDriverRepository()
    sut = new FetchDriversUseCase(repository)
  })

  it('should be able to fetch list vehicles', async () => {
    const password_hash = await hash('123456', 6)

    await repository.create({
      full_name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password_hash,
      birthDate: new Date(),
      cpf: '00000000000',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    await repository.create({
      full_name: 'Keli Doe',
      email: 'kelidoe@example.com',
      password_hash,
      birthDate: new Date(),
      cpf: '00000000000',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    const { drivers } = await sut.execute({
      page: 1,
    })

    expect(drivers).toHaveLength(2)
  })

  it('should be able to fetch paginated drivers list', async () => {
    const password_hash = await hash('123456', 6)

    for (let i = 1; i <= 22; i++) {
      await repository.create({
        full_name: `John Doe${i}`,
        email: `johndoe${i}@example.com`,
        password_hash,
        birthDate: new Date(),
        cpf: `00000000000${i}`,
        contact_number: '99999999999',
        licenseExpiry: new Date(),
        licenseNumber: '9999999999',
        company_id: 'company-1',
      })
    }

    const { drivers } = await sut.execute({
      page: 2,
    })

    expect(drivers).toHaveLength(2)
    expect(drivers).toEqual([
      expect.objectContaining({
        full_name: `John Doe21`,
        email: 'johndoe21@example.com',
      }),
      expect.objectContaining({
        full_name: `John Doe22`,
        email: 'johndoe22@example.com',
      }),
    ])
  })
})
