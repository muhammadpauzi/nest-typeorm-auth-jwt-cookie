import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/common/enums/role.enum';
import { Exclude, Expose } from 'class-transformer';

export class MeResponseDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty({ enum: Role })
  @Expose()
  role: Role;
}
