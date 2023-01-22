import { IsNotEmpty, IsArray, IsDate, IsPositive } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: `Customer` })
  readonly customerId: number;

  // @ApiProperty({ description: `Date's order` })
  // @IsNotEmpty()
  // @IsDate()
  // readonly date: Date;

  // @ApiProperty({ description: 'List products into order' })
  // @IsNotEmpty()
  // @IsArray()
  // readonly products: string[];
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
