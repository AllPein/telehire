import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateResumeDto } from './dto/create-resume.dto';
import { SetActiveResumeDto } from './dto/set-active-resume.dto';
import { ResumesService } from './resumes.service';

@ApiTags('user resumes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'resumes',
  version: '1',
})
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumesService.create(createResumeDto);
  }

  @Get()
  findAll() {
    return this.resumesService.findAll();
  }
  @Get('my')
  my() {
    return this.resumesService.my();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    const type = request.cookies['user_logged_in_as'];
    return this.resumesService.findOne(+id, type);
  }

  @Post('setActive')
  setActive(@Body() data: SetActiveResumeDto) {
    return this.resumesService.setActive(data);
  }
}
