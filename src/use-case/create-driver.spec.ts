import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryDriverRepository } from '@/repositories/in-memory/in-memory-driver-repository'
import { CreateDriverUseCase } from './create-driver'
import { DriverAlreadyExistsError } from './error/driver-already-exist-error'
import { compare } from 'bcryptjs'

let driverRepository: InMemoryDriverRepository
let sut: CreateDriverUseCase

describe('Create Driver Use Case', () => {
  beforeEach(() => {
    driverRepository = new InMemoryDriverRepository()
    sut = new CreateDriverUseCase(driverRepository)
  })

  it('should to create driver', async () => {
    const { driver } = await sut.execute({
      full_name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
      birthDate: new Date(),
      cpf: '00000000000',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    expect(driver.id).toEqual(expect.any(String))
  })

  it('should hash driver password upon registration', async () => {
    const { driver } = await sut.execute({
      full_name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
      birthDate: new Date(),
      cpf: '99999999999',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      driver.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to create driver with some cpf twice', async () => {
    const cpf = '99999999999'

    await sut.execute({
      full_name: 'Jonh Doe',
      email: 'jonhdoe@exemple.com',
      password: '123456',
      birthDate: new Date(),
      cpf,
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    await expect(() =>
      sut.execute({
        full_name: 'Jonh Doe',
        email: 'jonhdoe@exemple.com',
        password: '123456',
        birthDate: new Date(),
        cpf,
        contact_number: '99999999999',
        licenseExpiry: new Date(),
        licenseNumber: '9999999999',
        company_id: 'company-1',
      }),
    ).rejects.toBeInstanceOf(DriverAlreadyExistsError)
  })

  it('should not be able to create driver with some email twice', async () => {
    const email = 'jonhdoe@exemple.com'

    await sut.execute({
      full_name: 'Jonh Doe',
      email,
      password: '123456',
      birthDate: new Date(),
      cpf: '99999999999',
      contact_number: '99999999999',
      licenseExpiry: new Date(),
      licenseNumber: '9999999999',
      company_id: 'company-1',
    })

    await expect(() =>
      sut.execute({
        full_name: 'Jonh Doe',
        email,
        password: '123456',
        birthDate: new Date(),
        cpf: '99999999999',
        contact_number: '99999999999',
        licenseExpiry: new Date(),
        licenseNumber: '9999999999',
        company_id: 'company-1',
      }),
    ).rejects.toBeInstanceOf(DriverAlreadyExistsError)
  })
})
