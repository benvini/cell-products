import { Module } from '@nestjs/common';
import { CellController } from './cell.controller';
import { CellService } from './cell.service';

@Module({
  controllers: [CellController],
  providers: [CellService],
})
export class CellModule {}
