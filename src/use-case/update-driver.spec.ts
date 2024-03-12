import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateDriverUseCase } from './update-driver'
import { InMemoryDriverRepository } from '@/repositories/in-memory/in-memory-driver-repository'

import { DriverAlreadyExistsError } from './error/already-exist-error'
import { DriverNotFoundError } from './error/resource-not-found-error'

let driverRepository: InMemoryDriverRepository
let sut: UpdateDriverUseCase

describe('Update Driver Use Case', () => {
  beforeEach(() => {
    driverRepository = new InMemoryDriverRepository()
    sut = new UpdateDriverUseCase(driverRepository)
  })

  it('should update a driver successfully', async () => {
    // Primeiro, criamos um motorista para depois atualizá-lo
    const createdDriver = await driverRepository.create({
      cpf: '12345678909',
      contact_number: '(99)99999-9999',
      birthDate: new Date('1990-01-01'),
      licenseNumber: 'ABC1234',
      licenseExpiry: new Date('2030-01-01'),
      company_id: 'company123',
      user_id: 'some-user-id',
    })

    // Atualização bem-sucedida do motorista
    const updatedDriver = await sut.execute({
      id: createdDriver.id,
      cpf: '98765432109', // Atualizando o CPF para um novo
      contact_number: '(88)88888-8888',
      birthDate: new Date('1990-01-01'),
      licenseNumber: 'XYZ5678',
      licenseExpiry: new Date('2030-01-01'),
      company_id: 'company456',
    })

    expect(updatedDriver.driver.id).toEqual(createdDriver.id)
    expect(updatedDriver.driver.cpf).toEqual('98765432109')
  })

  it('should not allow updating driver with an existing CPF', async () => {
    // Criando dois motoristas distintos
    await driverRepository.create({
      cpf: '12345678909',
      contact_number: '(99)99999-9999',
      birthDate: new Date('1990-01-01'),
      licenseNumber: 'ABC1234',
      licenseExpiry: new Date('2030-01-01'),
      company_id: 'company123',
      user_id: 'some-user-id',
    })

    const driver2 = await driverRepository.create({
      cpf: '98765432109',
      contact_number: '(88)88888-8888',
      birthDate: new Date('1995-02-02'),
      licenseNumber: 'XYZ5678',
      licenseExpiry: new Date('2035-02-02'),
      company_id: 'company456',
      user_id: 'some-user-id1', // Inclua o user_id aqui
    })

    // Tentativa de atualizar o segundo motorista para usar o CPF do primeiro
    await expect(
      sut.execute({
        id: driver2.id, // Assegure-se de estar usando o ID correto aqui
        cpf: '12345678909', // Tentativa de usar um CPF existente
        contact_number: '(88)88888-8888',
        birthDate: new Date('1995-02-02'),
        licenseNumber: 'XYZ5678',
        licenseExpiry: new Date('2035-02-02'),
        company_id: 'company456',
      }),
    ).rejects.toBeInstanceOf(DriverAlreadyExistsError)
  })

  it('should throw an error if the driver does not exist', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        cpf: '56789012345',
        contact_number: '(77)77777-7777',
        birthDate: new Date('1985-03-03'),
        licenseNumber: 'LMN8910',
        licenseExpiry: new Date('2040-03-03'),
        company_id: 'company789',
      }),
    ).rejects.toBeInstanceOf(DriverNotFoundError)
  })
})
