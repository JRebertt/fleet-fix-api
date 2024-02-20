import { InMemoryVehicleRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchVehiclesUseCase } from './fetch-vehicles'

let vehicleRepository: InMemoryVehicleRepository
let sut: FetchVehiclesUseCase

describe('Fetch Vehicle List Use Case', () => {
  beforeEach(async () => {
    vehicleRepository = new InMemoryVehicleRepository()
    sut = new FetchVehiclesUseCase(vehicleRepository)
  })

  it('should be able to fetch list vehicles', async () => {
    await vehicleRepository.create({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate: 'ABC123',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    await vehicleRepository.create({
      make: 'VW',
      model: 'Fox',
      year: '2019',
      licensePlate: 'ABC123',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    const { vehicles } = await sut.execute({
      page: 1,
    })

    expect(vehicles).toHaveLength(2)
  })

  it('should be able to fetch paginated vehicle history', async () => {
    for (let i = 1; i <= 22; i++) {
      await vehicleRepository.create({
        make: `Make${i}`,
        model: `Model${i}`,
        year: `Year${i}`,
        licensePlate: `License${i}`,
        vin: `Vin${i}`,
        company_id: `company-${i}`,
        driver_id: `driver-${i}`,
      })
    }

    const { vehicles } = await sut.execute({
      page: 2,
    })

    expect(vehicles).toHaveLength(2)
    expect(vehicles).toEqual([
      expect.objectContaining({ make: `Make21`, company_id: 'company-21' }),
      expect.objectContaining({ make: `Make22`, company_id: 'company-22' }),
    ])
  })
})
