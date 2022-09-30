import { IsString, IsNumber, IsNotEmpty, IsDate } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateFacturaDto {
  @ApiProperty({ description: 'Folio' })
  @IsString()
  @IsNotEmpty()
  readonly folio: string;

  @ApiProperty({ description: 'status' })
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({ description: 'Count' })
  @IsNumber()
  @IsNotEmpty()
  readonly cantidad: number;

  @ApiProperty({ description: 'Remember date' })
  @IsDate()
  @IsNotEmpty()
  readonly rememberAt: Date;

  @ApiProperty({ description: 'Observations' })
  @IsString()
  @IsNotEmpty()
  readonly notes: string;
}

export class UpdateFacturaDto extends PartialType(CreateFacturaDto) {}
