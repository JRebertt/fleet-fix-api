import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { CreateVehicleUseCase } from '../create-veicle'

export function makeCreateVehicleUseCase() {
  const repository = new PrismaVehiclesRepository()
  const registerVehicleUseCase = new CreateVehicleUseCase(repository)

  return registerVehicleUseCase
}
