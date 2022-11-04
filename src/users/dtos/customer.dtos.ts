import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: `Customer's name` })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: `Customer lastname` })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty({ description: 'Phone' })
  @IsNumber()
  @IsNotEmpty()
  readonly phone: number;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
