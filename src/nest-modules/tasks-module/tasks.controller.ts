import {
  Controller,
  Post,
  Inject,
  Body,
  Query,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { StoreFinanceUseCase } from '../../@core/tasks/application/use-case/create-task/store-task.use-case';
import { TaskOutput } from '../../@core/tasks/application/common/task.output';
import { StoreFinanceDto } from './dto/store_task_dto';
import {
  FinancePresenter,
  FinancePresenterCollection,
} from './tasks.presenter';
import { GetFinanceUseCase } from '../../@core/tasks/application/use-case/get-finance/get-finance.use-case';
import { ListFinanceUseCase } from '../../@core/tasks/application/use-case/list-finance/list-finance.use-case';
import { UpdateFinanceUseCase } from '../../@core/tasks/application/use-case/update-finance/update-finance.use-case';
import { UpdateFinanceDto } from './dto/update_task_dto';

@Controller('/')
export class FinancesController {
  @Inject(ListFinanceUseCase)
  private listUseCase: ListFinanceUseCase;

  @Inject(GetFinanceUseCase)
  private getUseCase: GetFinanceUseCase;

  @Inject(StoreFinanceUseCase)
  private storeUseCase: StoreFinanceUseCase;

  @Inject(UpdateFinanceUseCase)
  private updateUseCase: UpdateFinanceUseCase;

  @Get()
  async list(@Query() query: any) {
    return new FinancePresenterCollection(
      await this.listUseCase.execute(query)
    );
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const output = await this.getUseCase.execute({ id });
    return FinancesController.serialize(output);
  }

  @Post()
  async store(@Body() storePlanDto: StoreFinanceDto) {
    const output = await this.storeUseCase.execute(storePlanDto);
    return FinancesController.serialize(output);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdateFinanceDto
  ) {
    const output = await this.updateUseCase.execute({ ...updatePlanDto, id });
    return FinancesController.serialize(output);
  }

  static serialize(output: FinanceOutput) {
    return new FinancePresenter(output);
  }
}
