import { Controller, Get, Query } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller({
  path: 'skills',
  version: '1',
})
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiQuery({
    name: 'q',
    type: String,
    description: 'Query string. Optional',
    required: false,
  })
  findOne(@Query('q') id?: string) {
    return this.skillsService.findOne(id);
  }
}
