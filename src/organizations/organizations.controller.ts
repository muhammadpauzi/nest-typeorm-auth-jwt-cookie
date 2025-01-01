import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { OrganizationResponseDto } from './dto/organization-response.dto';
import { plainToInstance } from 'class-transformer';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('organizations')
@Roles(Role.Superadmin)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  @ApiOkResponse({
    type: OrganizationResponseDto,
  })
  async create(
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    return plainToInstance(
      OrganizationResponseDto,
      await this.organizationsService.create(createOrganizationDto),
    );
  }

  @Get()
  @ApiOkResponse({
    type: OrganizationResponseDto,
    isArray: true,
  })
  async findAll(): Promise<OrganizationResponseDto[]> {
    return plainToInstance(
      OrganizationResponseDto,
      await this.organizationsService.findAll(),
    );
  }

  @Get(':id')
  @ApiOkResponse({
    type: OrganizationResponseDto,
  })
  async findOne(@Param('id') id: string): Promise<OrganizationResponseDto> {
    return plainToInstance(
      OrganizationResponseDto,
      await this.organizationsService.findOne(+id),
    );
  }

  @Patch(':id')
  @ApiOkResponse({
    type: OrganizationResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<OrganizationResponseDto> {
    return plainToInstance(
      OrganizationResponseDto,
      await this.organizationsService.update(+id, updateOrganizationDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse()
  async remove(@Param('id') id: string): Promise<void> {
    return await this.organizationsService.remove(+id);
  }
}
