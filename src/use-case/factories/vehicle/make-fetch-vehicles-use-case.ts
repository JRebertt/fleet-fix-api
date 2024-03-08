import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { FetchVehiclesUseCase } from '../../fetch-vehicles'

export function makeFetchVehiclesUseCase() {
  const repository = new PrismaVehiclesRepository()
  const fetchVehiclesUseCase = new FetchVehiclesUseCase(repository)

  return fetchVehiclesUseCase
}
