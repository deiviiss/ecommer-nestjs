import { IsNotEmpty, IsArray, IsMongoId, IsDate } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: `Customer order` })
  readonly customer: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({ description: `Date's order` })
  readonly date: Date;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ description: 'List products into order' })
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']), // implementOmitType
) {}
