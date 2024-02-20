import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
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
      full_name: 'John Doe',
      email: 'jonhdoe@exemple.com',
      password_hash: await hash('123456', 6),
      birthDate: new Date(),
      cpf: '00000000000',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    const { driver } = await sut.execute({
      driverId: createdDriver.id,
    })

    expect(driver.full_name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        driverId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
