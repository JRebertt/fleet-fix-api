import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { DeleteVehicleUseCase } from '../../delete-vehicle'

export function makeDeleteVehicleUseCase() {
  const repository = new PrismaVehiclesRepository()
  const deleteVehicleUseCase = new DeleteVehicleUseCase(repository)

  return deleteVehicleUseCase
}
