import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  ValidateIf,
  IsUrl,
  IsMongoId,
} from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types'; // to use swagger
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Product's name` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `Product's description` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @Min(0)
  @ApiProperty({ description: `Product's price` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ description: `Product's stock` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `Product's image` })
  readonly image: string;

  // relación embebida
  // @IsNotEmpty()
  // @ValidateNested()
  // readonly category: CreateCategoryDto;

  // relación id
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: `Product's category` })
  readonly category: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: `Product's brand` })
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
