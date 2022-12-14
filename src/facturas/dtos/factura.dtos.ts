import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFacturaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly folio: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly cantidad: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly notes: string;
}

export class UpdateFacturaDto extends PartialType(CreateFacturaDto) {}