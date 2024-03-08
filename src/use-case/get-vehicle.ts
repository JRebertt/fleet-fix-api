import { VehicleRespository } from '@/repositories/vehicles-repository'
import { Vehicle } from '@prisma/client'
import { ResourceNotFoundError } from './error/resource-not-found-error'

interface GetVehicleUseCaseRequest {
  id: string
}

interface GetVehicleUseCaseResponse {
  vehicle: Vehicle
}

export class GetVehicleUseCase {
  constructor(private repository: VehicleRespository) {}

  async execute({
    id,
  }: GetVehicleUseCaseRequest): Promise<GetVehicleUseCaseResponse> {
    const vehicle = await this.repository.findById(id)

    if (!vehicle) {
      throw new ResourceNotFoundError()
    }

    return { vehicle }
  }
}
