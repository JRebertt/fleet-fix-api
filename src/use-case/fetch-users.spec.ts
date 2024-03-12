import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { FetchUsersUseCase } from './fetch-users'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: FetchUsersUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    sut = new FetchUsersUseCase(usersRepository)
  })

  it('should be able to fetch list vehicles', async () => {
    const password_hash = await hash('123456', 6)
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash,
    })

    await usersRepository.create({
      name: 'Keli Doe',
      email: 'kelidoe@example.com',
      password_hash,
    })

    const { users } = await sut.execute({
      page: 1,
    })

    expect(users).toHaveLength(2)
  })

  it('should be able to fetch paginated vehicle history', async () => {
    const password_hash = await hash('123456', 6)

    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        name: `John Doe${i}`,
        email: `johndoe${i}@example.com`,
        password_hash,
      })
    }

    const { users } = await sut.execute({
      page: 2,
    })

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      expect.objectContaining({
        name: `John Doe21`,
        email: 'johndoe21@example.com',
      }),
      expect.objectContaining({
        name: `John Doe22`,
        email: 'johndoe22@example.com',
      }),
    ])
  })
})
