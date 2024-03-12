import { Vehicle } from '@prisma/client'

import { VehicleRespository } from '@/repositories/vehicles-repository'
import { VehicleNotFoundError } from './error/resource-not-found-error'
import { LicensePlateAlreadyExistError } from './error/already-exist-error'

interface UpdateVehicleRequest {
  id: string
  make?: string
  model?: string
  year?: string
  licensePlate: string
  vin?: string
  company_id: string
  driver_id: string
}

interface UpdateVehicleResponse {
  vehicle: Vehicle
}

export class UpdateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRespository) {}

  async execute({
    id,
    make,
    model,
    year,
    licensePlate,
    vin,
    company_id,
    driver_id,
  }: UpdateVehicleRequest): Promise<UpdateVehicleResponse> {
    const existingVehicle = await this.vehicleRepository.findById(id)

    if (!existingVehicle) {
      throw new VehicleNotFoundError()
    }

    if (licensePlate === existingVehicle.licensePlate) {
      throw new LicensePlateAlreadyExistError()
    }

    const vehicleWithSameLicensePlate =
      await this.vehicleRepository.findByLicensePlate(licensePlate)

    if (vehicleWithSameLicensePlate && vehicleWithSameLicensePlate.id !== id) {
      throw new LicensePlateAlreadyExistError()
    }

    existingVehicle.make = make ?? existingVehicle.make
    existingVehicle.model = model ?? existingVehicle.model
    existingVehicle.year = year ?? existingVehicle.year
    existingVehicle.licensePlate = licensePlate ?? existingVehicle.licensePlate
    existingVehicle.vin = vin ?? existingVehicle.vin
    existingVehicle.company_id = company_id ?? existingVehicle.company_id
    existingVehicle.driver_id = driver_id ?? existingVehicle.driver_id

    const updatedVehicle = await this.vehicleRepository.update(existingVehicle)

    return { vehicle: updatedVehicle }
  }
}
