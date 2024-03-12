import { expect, describe, it, beforeEach } from 'vitest'
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
    await repository.create({
      user_id: 'user_id-1',

      birthDate: new Date(),
      cpf: '00000000000',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    await repository.create({
      user_id: 'user_id-2',
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
    for (let i = 1; i <= 22; i++) {
      await repository.create({
        user_id: `userId-${i}`,
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
        user_id: `userId-21`,
        cpf: '0000000000021',
      }),
      expect.objectContaining({
        user_id: `userId-22`,
        cpf: '0000000000022',
      }),
    ])
  })
})
