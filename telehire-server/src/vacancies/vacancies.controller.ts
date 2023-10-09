import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { VacanciesService } from './vacancies.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('vacancies')
@Controller({
  path: 'vacancies',
  version: '1',
})
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto) {
    return this.vacanciesService.create(createVacancyDto);
  }

  @Get()
  findAll() {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacanciesService.findOne(+id);
  }
}
