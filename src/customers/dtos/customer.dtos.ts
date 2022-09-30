import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: 'Name' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Lastname' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ description: 'Email' })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Direction' })
  @IsString()
  @IsNotEmpty()
  readonly direction: string;

  @ApiProperty({ description: 'Phonenumber' })
  @IsString()
  @IsNotEmpty()
  readonly telefono: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
