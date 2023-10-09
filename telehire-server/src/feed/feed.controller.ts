import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Resume, Vacancy } from '@prisma/client';
import { FeedService } from './feed.service';

@ApiTags('feed')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'feed',
  version: '1',
})
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get('/candidates/:vacancyId')
  candidates(@Param('vacancyId') vacancyId: string): Promise<Resume[]> {
    return this.feedService.candidates(+vacancyId);
  }

  @Get('/vacancies/:resumeId')
  vacancies(@Param('resumeId') resumeId: string): Promise<Vacancy[]> {
    return this.feedService.vacancies(+resumeId);
  }
}
