import { beforeEach, describe, expect, it } from 'vitest'
import { CreateVehicleUseCase } from './create-veicle'
import { InMemoryVehicleRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { LicensePlateAlreadyExistError } from './error/already-exist-error'

let vehicleRepository: InMemoryVehicleRepository
let sut: CreateVehicleUseCase

describe('Create Vehicle Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehicleRepository()
    sut = new CreateVehicleUseCase(vehicleRepository)
  })

  it('should to create vehicle', async () => {
    const { vehicle } = await sut.execute({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate: 'ABC123',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    expect(vehicle.id).toEqual(expect.any(String))
  })

  it('should not be able to create vehicle with some licensePlate twice', async () => {
    const licensePlate = 'ABC123'

    await sut.execute({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate,
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    await expect(() =>
      sut.execute({
        make: 'Ford',
        model: 'Amarok',
        year: '2019',
        licensePlate: 'ABC123',
        vin: '00112233444',
        company_id: 'company-1',
        driver_id: 'driver-1',
      }),
    ).rejects.toBeInstanceOf(LicensePlateAlreadyExistError)
  })
})
