import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppliesService } from './applies.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { GetAppliesDto } from './dto/get-applies.dto';

@ApiTags('applies')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'applies',
  version: '1',
})
export class AppliesController {
  constructor(private readonly appliesService: AppliesService) {}

  @Post()
  create(@Body() createApplyDto: CreateApplyDto) {
    return this.appliesService.create(createApplyDto);
  }

  @Get()
  findAll(@Query() query: GetAppliesDto) {
    return this.appliesService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appliesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appliesService.remove(+id);
  }
}
