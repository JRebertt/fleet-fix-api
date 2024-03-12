import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryDriverRepository } from '@/repositories/in-memory/in-memory-driver-repository'
import { GetDriverUseCase } from './get-driver'
import { ResourceNotFoundError } from './error/resource-not-found-error'

let repository: InMemoryDriverRepository
let sut: GetDriverUseCase

describe('Get Driver Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryDriverRepository()
    sut = new GetDriverUseCase(repository)
  })

  it('should be able to get driver', async () => {
    const createdDriver = await repository.create({
      user_id: 'user_id-1',
      birthDate: new Date(),
      cpf: '1234509876',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    const { driver } = await sut.execute({
      driverId: createdDriver.id,
    })

    expect(driver.cpf).toEqual('1234509876')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        driverId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
