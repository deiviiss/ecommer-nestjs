import {
  IsString,
  IsNotEmpty,
  IsUrl,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Category's name` })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `Category's image` })
  readonly image: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class FilterCategorysDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
