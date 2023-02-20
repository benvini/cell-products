import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {
  AllocateCellDto
} from './dto/cell-dto';
import {CellType, ChilledProducts, OthersProducts, HazardousProducts} from '../shared/constants'; 
import {Cell} from './cell.entity';

@Injectable()
export class CellService {
    private readonly table: any[] = [];
    constructor() {
    this.table = [];
    let idIterator = 0;
    for (let i = 0; i < 10; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 10; j++) {
        row.push({
          type: CellType.OTHERS,
          products: [],
          maxCapacity: 10,
          productId: '',
          quantity: 0,
          id: idIterator.toString(),
        });
        idIterator++;
      }
      this.table.push(row);
    }

    for (let i = 0; i < 10; i++) {
      this.table[i][8].type = CellType.HAZARDOUS;
    }

    this.table[7][8].type = CellType.CHILLED;
    this.table[8][8].type = CellType.CHILLED;
    this.table[9][8].type = CellType.CHILLED;

    const coolCellPositions = [
      [7, 7],
      [7, 8],
      [7, 9],
      [8, 7],
      [8, 8],
      [9, 7],
      [9, 8],
    ];
    coolCellPositions.forEach((pos) => {
      const [i, j] = pos;
      this.table[i][j].type = CellType.CHILLED;
    });

    this.table[0][1].products.push({
      name: 'bread',
      quantity: 3,
      type: CellType.OTHERS,
    });
    this.table[3][3].products.push({
      name: 'bamba',
      quantity: 5,
      type: CellType.OTHERS,
    });
  }

  getCellById(id: string): Cell {
    const index = this.table.findIndex((cell) => cell.id === id);
    if (index === -1) {
      throw new NotFoundException(`Cell with id ${id} not found`);
    }
    return this.table.find((cell) => cell.id === id);
  }

  getAllCells(): Cell[] {
    return this.table;
  }

  getTypeByProduct(allocateCellDto: AllocateCellDto): string {
    let productType = CellType.OTHERS;
    if (ChilledProducts.includes(allocateCellDto.productId)) {
        productType = CellType.CHILLED;
    }
    if (HazardousProducts.includes(allocateCellDto.productId)) {
        productType = CellType.HAZARDOUS;
    }
    return productType;
  }

  allocateCell(allocateCellDto: AllocateCellDto): any {
    const allocateCellDtoType = this.getTypeByProduct(allocateCellDto);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.table[i][j].type === allocateCellDtoType
            && (this.table[i][j].quantity + allocateCellDto.quantity < this.table[i][j].maxCapacity)) {
            this.table[i][j].products.push(allocateCellDto);
            this.table[i][j].quantity+= allocateCellDto.quantity;
            return allocateCellDto.productId;
        }
      }
    }
    throw new BadRequestException('No place for this product.');
  }
}