import {
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from './entities/organization.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import { generateRandomString } from '@/common/helpers/string';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    const organization = this.organizationRepository.create({
      name: createOrganizationDto.name,
    });

    return this.organizationRepository.save(organization);
  }

  async findAll() {
    return await this.organizationRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: number) {
    const organization = await this.organizationRepository.findOneBy({
      id: id,
    });

    if (!organization) throw new NotFoundException();

    return organization;
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = await this.organizationRepository.findOneBy({
      id: id,
    });

    if (!organization) throw new NotFoundException();

    organization.name = updateOrganizationDto.name;

    return this.organizationRepository.save(organization);
  }

  async remove(id: number) {
    const organization = await this.organizationRepository.findOneBy({
      id: id,
    });

    if (!organization) throw new NotFoundException();

    await this.organizationRepository.remove(organization);
  }
}
