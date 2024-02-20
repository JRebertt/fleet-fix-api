import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findManyUsers(page: number): Promise<User[]>
  findById(id: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
}
