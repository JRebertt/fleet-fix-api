import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { GetVehicleUseCase } from '../get-vehicle'

export function makeGetVehicleUseCase() {
  const repository = new PrismaVehiclesRepository()
  const getVehicleUseCase = new GetVehicleUseCase(repository)

  return getVehicleUseCase
}
