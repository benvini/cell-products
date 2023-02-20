import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AllocateCellDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
