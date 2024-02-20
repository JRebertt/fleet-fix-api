import { VehicleRespository } from '@/repositories/vehicles-repository'
import { Vehicle } from '@prisma/client'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface GetVehicleUseCaseRequest {
  vehicleId: string
}

interface GetVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class GetVehicleUseCase {
  constructor(private repository: VehicleRespository) {}

  async execute({
    vehicleId,
  }: GetVehicleUseCaseRequest): Promise<GetVehicleUseCaseResponse> {
    const vehicle = await this.repository.findById(vehicleId)

    if (!vehicle) {
      throw new ResourceNotFoundError()
    }

    return { vehicle }
  }
}
