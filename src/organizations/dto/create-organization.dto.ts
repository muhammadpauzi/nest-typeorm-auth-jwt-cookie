import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
}
