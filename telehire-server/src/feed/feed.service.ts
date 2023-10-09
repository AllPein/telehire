import { Injectable, NotFoundException } from '@nestjs/common';
import { Resume, Vacancy } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FeedService {
  constructor(private readonly prisma: PrismaService) {}

  async candidates(vacancyId: Vacancy['id']): Promise<Resume[]> {
    const data = await this.prisma.vacancy.findUnique({
      where: { id: vacancyId },
      include: {
        skills: true,
      },
    });
    if (data === null) throw new NotFoundException();

    return await this.prisma.resume.findMany({
      where: {
        OR: [
          {
            position: {
              contains: data.position,
            },
          },
          ...data.skills.map((skill) => ({
            skills: {
              some: { name: skill.name },
            },
          })),
        ],
      },
      orderBy: {
        views: 'desc',
      },
      include: {
        skills: true,
        user: true,
      },
    });
  }

  async vacancies(resumeId: Resume['id']): Promise<Vacancy[]> {
    const data = await this.prisma.resume.findUnique({
      where: { id: resumeId },
      include: {
        skills: true,
      },
    });
    if (data === null) throw new NotFoundException();

    return await this.prisma.vacancy.findMany({
      where: {
        OR: [
          {
            position: {
              contains: data.position,
            },
          },
          ...data.skills.map((skill) => ({
            skills: {
              some: { name: skill.name },
            },
          })),
        ],
      },
      include: {
        skills: true,
        company: true,
        location: true,
      },
    });
  }
}
