import {
  ArrayNotEmpty,
  ArrayUnique,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import Role from '../role/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @ArrayUnique()
  roles: Role[];
}

export default CreateUserDto;