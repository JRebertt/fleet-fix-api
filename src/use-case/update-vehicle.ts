import { Vehicle } from '@prisma/client'
import { LicensePlateAlreadyExistError } from './error/license-plate-already-exist-error'
import { VehicleRespository } from '@/repositories/vehicles-repository'

interface UpdateVehicleRequest {
  id: string
  make?: string
  model?: string
  year?: string
  licensePlate?: string
  vin?: string
  company_id?: string
  driver_id?: string
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
      throw new Error('Vehicle not found')
    }

    if (licensePlate && licensePlate !== existingVehicle.licensePlate) {
      const vehicleWithSameLicensePlate =
        await this.vehicleRepository.findByLicensePlate(licensePlate)
      if (
        vehicleWithSameLicensePlate &&
        vehicleWithSameLicensePlate.id !== id
      ) {
        throw new LicensePlateAlreadyExistError()
      }
    }

    const updatedVehicle = await this.vehicleRepository.update(id, {
      make: make ?? existingVehicle.make,
      model: model ?? existingVehicle.model,
      year: year ?? existingVehicle.year,
      licensePlate: licensePlate ?? existingVehicle.licensePlate,
      vin: vin ?? existingVehicle.vin,
      company: company_id ?? existingVehicle.company_id,
      driver_id: driver_id ?? existingVehicle.driver_id,
    })

    return { vehicle: updatedVehicle }
  }
}
