import { Driver, Prisma } from '@prisma/client'
import { DriverRespository } from '../driver-repository'
import { prisma } from '@/lib/prisma'

export class PrismaDriversRepository implements DriverRespository {
  async findByCpf(cpf: string) {
    const driver = await prisma.driver.findUnique({
      where: {
        cpf,
      },
    })

    if (!driver) {
      return null
    }

    return driver
  }

  async findManyDrivers(page: number) {
    const pageSize = 20
    const skip = (page - 1) * pageSize

    const drivers = await prisma.driver.findMany({
      skip,
      take: pageSize,
    })

    return drivers
  }

  async findById(id: string) {
    const driver = await prisma.driver.findUnique({
      where: {
        id,
      },
    })

    if (!driver) {
      return null
    }

    return driver
  }

  async findByUserId(id: string) {
    const userDriver = await prisma.driver.findUnique({
      where: {
        user_id: id,
      },
    })

    if (!userDriver) {
      return null
    }

    return userDriver
  }

  async create(data: Prisma.DriverUncheckedCreateInput) {
    const driver = await prisma.driver.create({
      data,
    })

    return driver
  }

  async delete(id: string) {
    await prisma.driver.delete({
      where: {
        id,
      },
    })

    return { message: 'Motorista deletado com sucesso' }
  }

  async update(driver: Driver) {
    const updatedDriver = await prisma.driver.update({
      where: {
        id: driver.id,
      },
      data: driver,
    })
    return updatedDriver
  }
}
