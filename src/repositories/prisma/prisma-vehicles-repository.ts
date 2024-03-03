import { prisma } from '@/lib/prisma'
import { Prisma, Vehicle } from '@prisma/client'
import { VehicleRespository } from '../vehicles-repository'

export class PrismaVehiclesRepository implements VehicleRespository {
  async findById(id: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        id,
      },
    })

    return vehicle
  }

  async delete(id: string) {
    await prisma.vehicle.delete({
      where: {
        id,
      },
    })

    return { message: 'Veiculo deletado com sucesso' }
  }

  async findManyVehicles(page: number) {
    const pageSize = 20
    const skip = (page - 1) * pageSize

    const vehicles = await prisma.vehicle.findMany({
      skip,
      take: pageSize,
    })
    return vehicles
  }

  async findByLicensePlate(licensePlate: string) {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        licensePlate,
      },
    })

    return vehicle
  }

  async update(vehicle: Vehicle) {
    const updatedVehicle = await prisma.vehicle.update({
      where: {
        id: vehicle.id,
      },
      data: vehicle,
    })
    return updatedVehicle
  }

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    })

    return vehicle
  }
}
