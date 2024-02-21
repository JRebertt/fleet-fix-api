import { VehicleRespository } from '@/repositories/vehicles-repository'
import { Vehicle } from '@prisma/client'
import { LicensePlateAlreadyExistError } from './error/license-plate-already-exist-error'

interface CreateVehicleRequest {
  make: string
  model: string
  year: string
  licensePlate: string
  vin: string
  company_id: string
  driver_id: string
}
interface CreateVehicleResponse {
  vehicle: Vehicle
}

export class CreateVehicleUseCase {
  constructor(private vehicleRepository: VehicleRespository) {}

  async execute({
    make,
    model,
    year,
    licensePlate,
    vin,
    company_id,
    driver_id,
  }: CreateVehicleRequest): Promise<CreateVehicleResponse> {
    const vehicleWithSomeLincensePlate =
      await this.vehicleRepository.findByLicensePlate(licensePlate)

    if (vehicleWithSomeLincensePlate) {
      throw new LicensePlateAlreadyExistError()
    }

    const vehicle = await this.vehicleRepository.create({
      make,
      model,
      year,
      licensePlate,
      vin,
      company_id,
      driver_id,
    })

    return { vehicle }
  }
}
