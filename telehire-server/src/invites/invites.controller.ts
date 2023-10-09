import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetAppliesDto } from 'src/applies/dto/get-applies.dto';
import { CaslGuard } from 'src/auth/guards/casl.guard';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InvitesService } from './invites.service';

@ApiTags('invites')
@ApiBearerAuth()
@Controller({
  path: 'invites',
  version: '1',
})
@UseGuards(CaslGuard)
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  create(@Body() createInviteDto: CreateInviteDto) {
    return this.invitesService.create(createInviteDto);
  }

  @Get()
  findAll(@Query() query: GetAppliesDto) {
    return this.invitesService.findAll(query);
  }
}
