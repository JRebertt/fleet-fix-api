import { DriverRespository } from '@/repositories/driver-repository'
import { Driver } from '@prisma/client'

interface FetchDriversUseCaseRequest {
  page: number
}

interface FetchDriversUseCaseResponse {
  drivers: Driver[]
}

export class FetchDriversUseCase {
  constructor(private driverRepository: DriverRespository) {}

  async execute({
    page,
  }: FetchDriversUseCaseRequest): Promise<FetchDriversUseCaseResponse> {
    const drivers = await this.driverRepository.findManyDrivers(page)

    return { drivers }
  }
}
