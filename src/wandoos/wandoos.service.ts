import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WandoosService {
  constructor(private prisma: PrismaService) {}

  async createWandoo(data: Prisma.WandoosCreateInput) {
    return this.prisma.wandoos.create({ data });
  }

  async getAllWandoos() {
    return this.prisma.wandoos.findMany();
  }

  async getWandooById(id: number) {
    return this.prisma.wandoos.findUnique({ where: { id } });
  }

  async updateWandoo(id: number, data: Prisma.WandoosUpdateInput) {
    return this.prisma.wandoos.update({
      where: { id },
      data,
    });
  }

  async deleteWandoo(id: number) {
    return this.prisma.wandoos.delete({
      where: { id },
    });
  }
}
