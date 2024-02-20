import { PrismaVehiclesRepository } from '@/repositories/prisma/prisma-vehicles-repository'
import { RegisterVehicleUseCase } from '../create-veicle'

export function makeRegisterVehicleUseCase() {
  const vehiclesRepository = new PrismaVehiclesRepository()
  const registerVehicleUseCase = new RegisterVehicleUseCase(vehiclesRepository)

  return registerVehicleUseCase
}
