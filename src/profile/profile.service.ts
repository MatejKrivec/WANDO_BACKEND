import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async createProfile(data: Prisma.ProfileCreateInput) {
    return this.prisma.profile.create({ data });
  }

  async getAllProfiles() {
    return this.prisma.profile.findMany();
  }

  async getProfileById(id: number) {
    return this.prisma.profile.findUnique({ where: { id } });
  }

  async updateProfile(id: number, data: Prisma.ProfileUpdateInput) {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async deleteProfile(id: number) {
    return this.prisma.profile.delete({ where: { id } });
  }
}
