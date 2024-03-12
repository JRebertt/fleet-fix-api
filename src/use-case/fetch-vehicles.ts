import { VehicleRespository } from '@/repositories/vehicles-repository'
import { Vehicle } from '@prisma/client'

interface FetchVehiclesUseCaseRequest {
  page: number
}

interface FetchVehiclesUseCaseResponse {
  vehicles: Vehicle[]
}

export class FetchVehiclesUseCase {
  constructor(private vehicleRepository: VehicleRespository) {}

  async execute({
    page,
  }: FetchVehiclesUseCaseRequest): Promise<FetchVehiclesUseCaseResponse> {
    const vehicles = await this.vehicleRepository.findManyVehicles(page)

    return { vehicles }
  }
}
