import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteVehicleUseCase } from './delete-vehicle'
import { InMemoryVehicleRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { VehicleNotFoundError } from './error/vehicle-not-found-error'

let vehicleRepository: InMemoryVehicleRepository
let sut: DeleteVehicleUseCase

describe('Delete Vehicle Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehicleRepository()
    sut = new DeleteVehicleUseCase(vehicleRepository)
  })

  it('should delete a vehicle successfully', async () => {
    const vehicle = await vehicleRepository.create({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate: 'ABC123',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    const response = await sut.execute({ id: vehicle.id })
    expect(response.message).toBe('Veiculo deletado com sucesso')

    await expect(sut.execute({ id: vehicle.id })).rejects.toBeInstanceOf(
      VehicleNotFoundError,
    )
  })

  it('should throw an error if the vehicle does not exist', async () => {
    await expect(sut.execute({ id: 'non-existent-id' })).rejects.toBeInstanceOf(
      VehicleNotFoundError,
    )
  })
})
