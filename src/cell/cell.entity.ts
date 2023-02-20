import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { CellType } from 'src/shared/constants';

export class Cell {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  products: [];
  maxCapacity: number;

  type: string;

  constructor(productId: string, quantity: number, type: string) {
    this.productId = productId;
    this.quantity = quantity;
    this.type = type;
  }
}
