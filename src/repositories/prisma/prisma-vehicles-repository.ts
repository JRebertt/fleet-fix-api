import { prisma } from '@/lib/prisma'
import { Prisma, Vehicle } from '@prisma/client'
import { VehicleRespository } from '../vehicles-repository'

export class PrismaVehiclesRepository implements VehicleRespository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByLincensePlate(licensePlate: string): Promise<Vehicle | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: {
        licensePlate,
      },
    })

    return vehicle
  }

  async create(data: Prisma.VehicleUncheckedCreateInput) {
    const vehicle = await prisma.vehicle.create({
      data,
    })

    return vehicle
  }
}
