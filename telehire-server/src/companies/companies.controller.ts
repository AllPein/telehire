import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Company } from '@prisma/client';
import { AppAbility } from 'src/ability/ability.factory';
import { CaslAbility } from 'src/auth/decorators/ability.decorator';
import { CaslGuard } from 'src/auth/guards/casl.guard';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CreateLinkDto } from './dto/create-link.dto';
import { CompanyEntity } from './entities/company.entity';
import { Response } from 'express';

@ApiTags('Company')
@ApiBearerAuth()
@UseGuards(CaslGuard)
@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    type: CompanyEntity,
  })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get('/my')
  findMy() {
    return this.companiesService.findMyCompanies();
  }

  @Get('/accept-invite/:hash')
  async acceptInvite(@Param('hash') hash: string) {
    const company = await this.companiesService.acceptInvite(hash);

    return { companyId: company.id };
  }

  @Get(':id')
  findOne(@Param('id') id: Company['id'], @CaslAbility() ability: AppAbility) {
    return this.companiesService.findOne(+id, ability);
  }

  @Post('create-link')
  createLink(@Body() body: CreateLinkDto) {
    return this.companiesService.createLink(body);
  }
}
