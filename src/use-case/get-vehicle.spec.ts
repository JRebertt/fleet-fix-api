import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { InMemoryVehicleRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { GetVehicleUseCase } from './get-vehicle'

let repository: InMemoryVehicleRepository
let sut: GetVehicleUseCase

describe('Get Driver Use Case', () => {
  beforeEach(async () => {
    repository = new InMemoryVehicleRepository()
    sut = new GetVehicleUseCase(repository)
  })

  it('should be able to get driver', async () => {
    const createdVehicle = await repository.create({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate: 'ABC123',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    const { vehicle } = await sut.execute({
      id: createdVehicle.id,
    })

    expect(vehicle.make).toEqual('Ford')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
