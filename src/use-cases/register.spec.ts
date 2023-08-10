import { InMemoryUsersRepository } from '@/repositories/inMemory/inMemory-users-repository'
import { describe } from 'node:test'
import { expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const user = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    const user = await registerUseCase.execute({
      name: 'Leonard',
      email: 'leonardo@gmail.com',
      password: '1235456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '1235456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUserRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUserRepository)

    await registerUseCase.execute({
      name: 'Leonard',
      email: 'leonardo@gmail.com',
      password: '1235456',
    })

    expect(
      async () =>
        await registerUseCase.execute({
          name: 'Leonard',
          email: 'leonardo@gmail.com',
          password: '1235456',
        }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
