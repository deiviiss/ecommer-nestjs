import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFacturaDto {
  @IsString()
  @IsNotEmpty()
  readonly folio: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsNumber()
  @IsNotEmpty()
  readonly cantidad: number;

  @IsString()
  @IsNotEmpty()
  readonly notes: string;
}

export class UpdateFacturaDto extends PartialType(CreateFacturaDto) {}
