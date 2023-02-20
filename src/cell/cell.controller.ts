import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CellService } from './cell.service';
import {
  AllocateCellDto
} from './dto/cell-dto';

@Controller('cells')
export class CellController {
  constructor(private readonly cellService: CellService) {}

  @Get()
  getAllCells() {
    return this.cellService.getAllCells();
  }

  @Get(':id')
  getCellById(@Param('id') id: string) {
    return this.cellService.getCellById(id);
  }

  @Post()
  allocateCell(@Body() allocateCellDto: AllocateCellDto) {
    return this.cellService.allocateCell(allocateCellDto);
  }
}