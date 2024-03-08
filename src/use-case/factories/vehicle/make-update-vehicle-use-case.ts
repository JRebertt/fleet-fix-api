import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { UpdateVehicleUseCase } from '../../update-vehicle'

export function makeUpdateVehicleUseCase() {
  const repository = new PrismaVehiclesRepository()
  const updateVehicleUseCase = new UpdateVehicleUseCase(repository)

  return updateVehicleUseCase
}
