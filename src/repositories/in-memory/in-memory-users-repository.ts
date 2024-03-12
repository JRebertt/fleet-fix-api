import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findManyUsers(page: number) {
    const vehicles = this.items.slice((page - 1) * 20, page * 20)

    return vehicles
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      role: data.role ?? 'ADMIN',
      password_hash: data.password_hash,
      created_at: new Date(),
      user_id: 'some-user-id',
    }

    this.items.push(user)

    return user
  }
}
