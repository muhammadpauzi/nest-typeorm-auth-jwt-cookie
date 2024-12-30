import { IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;

  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  password: string;
}
