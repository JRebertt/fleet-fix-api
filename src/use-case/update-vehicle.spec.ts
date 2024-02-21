import { beforeEach, describe, expect, it } from 'vitest'
import { UpdateVehicleUseCase } from './update-vehicle'
import { InMemoryVehicleRepository } from '@/repositories/in-memory/in-memory-vehicle-repository'
import { LicensePlateAlreadyExistError } from './error/license-plate-already-exist-error'
import { VehicleNotFoundError } from './error/vehicle-not-found-error'

let vehicleRepository: InMemoryVehicleRepository
let sut: UpdateVehicleUseCase

describe('Update Vehicle Use Case', () => {
  beforeEach(() => {
    vehicleRepository = new InMemoryVehicleRepository()
    sut = new UpdateVehicleUseCase(vehicleRepository)
  })

  it('should update a vehicle successfully', async () => {
    // Primeiro, criamos um veículo para depois atualizá-lo
    const createdVehicle = await vehicleRepository.create({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate: 'ABC123',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    // Atualização bem-sucedida do veículo
    const updatedVehicle = await sut.execute({
      id: createdVehicle.id,
      make: 'Ford',
      model: 'Ranger',
      year: '2020',
      licensePlate: 'DEF456', // Atualizando a placa para uma nova
      vin: '55667788990',
      company_id: 'company-2',
      driver_id: 'driver-2',
    })

    expect(updatedVehicle.vehicle.id).toEqual(createdVehicle.id)
    expect(updatedVehicle.vehicle.model).toEqual('Ranger')
    expect(updatedVehicle.vehicle.licensePlate).toEqual('DEF456')
  })

  it('should not allow updating vehicle with an existing license plate', async () => {
    // Criando dois veículos distintos
    await vehicleRepository.create({
      make: 'Ford',
      model: 'Amarok',
      year: '2019',
      licensePlate: 'GHI789',
      vin: '00112233444',
      company_id: 'company-1',
      driver_id: 'driver-1',
    })

    const vehicle2 = await vehicleRepository.create({
      make: 'Chevrolet',
      model: 'S10',
      year: '2021',
      licensePlate: 'JKL012',
      vin: '9988776655',
      company_id: 'company-2',
      driver_id: 'driver-2',
    })

    // Tentativa de atualizar o primeiro veículo para usar a placa do segundo
    await expect(
      sut.execute({
        id: vehicle2.id, // Assegure-se de estar usando o ID correto aqui
        make: 'Ford',
        model: 'Amarok',
        year: '2019',
        licensePlate: 'GHI789', // Tentativa de usar uma placa existente
        vin: '00112233444',
        company_id: 'company-1',
        driver_id: 'driver-1',
      }),
    ).rejects.toBeInstanceOf(LicensePlateAlreadyExistError)
  })

  it('should throw an error if vehicle does not exist', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
        make: 'Ford',
        model: 'Ranger',
        year: '2020',
        licensePlate: 'XYZ789',
        vin: '1234567890',
        company_id: 'company-3',
        driver_id: 'driver-3',
      }),
    ).rejects.toBeInstanceOf(VehicleNotFoundError)
  })
})
