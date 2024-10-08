// src/services/auth.service.ts
import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

export class AuthService {
  private static SALT_ROUNDS = 10
  private static JWT_SECRET = process.env.JWT_SECRET!

  static async hashPassword(password: string): Promise<string> {
    return hash(password, this.SALT_ROUNDS)
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

  static generateToken(userId: string, role: Role): string {
    return sign({ userId, role }, this.JWT_SECRET, { expiresIn: '1d' })
  }

  static async createSalesperson(data: {
    name: string
    email: string
    password: string
    employeeCode: string
    phoneNumber: string
    city: string
  }) {
    const hashedPassword = await this.hashPassword(data.password)

    return prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: 'SALESPERSON',
        },
      })

      const salesperson = await prisma.salesperson.create({
        data: {
          userId: user.id,
          employeeCode: data.employeeCode,
          phoneNumber: data.phoneNumber,
          city: data.city,
        },
      })

      return { user, salesperson }
    })
  }

  static async createDistributor(data: {
    name: string
    email: string
    password: string
    shopName: string
    ownerName: string
    businessAddress: string
    contactNumber: string
    gst?: string
    pan?: string
  }) {
    const hashedPassword = await this.hashPassword(data.password)

    return prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          role: 'DISTRIBUTOR',
        },
      })

      const distributor = await prisma.distributor.create({
        data: {
          userId: user.id,
          shopName: data.shopName,
          ownerName: data.ownerName,
          businessAddress: data.businessAddress,
          contactNumber: data.contactNumber,
          gst: data.gst,
          pan: data.pan,
        },
      })

      return { user, distributor }
    })
  }

  // static async verifyEmail(token: string) {
  //   try {
  //     const decoded = verify(token, this.JWT_SECRET) as { userId: string; role: Role }
      
  //     const user = await prisma.user.update({
  //       where: { id: decoded.userId },
  //       data: { verified: true }
  //     })

  //     return {
  //       id: user.id,
  //       name: user.name,
  //       email: user.email,
  //       role: user.role
  //     }
  //   } catch (error) {
  //     throw new Error('Invalid token')
  //   }
  // }
}
