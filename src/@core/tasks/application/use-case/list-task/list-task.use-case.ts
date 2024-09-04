import {
  PaginationOutput,
  PaginationOutputMapper,
} from '../../../../@shared/application/pagination-output';
import { IUseCase } from '../../../../@shared/application/use-case.interface';
import {
  TaskSearchParams,
  FinanceSearchResult,
  IFinanceRepository,
} from '../../../domain/contracts/task.interface';
import {
  TaskOutput,
  TaskOutputMapper,
} from '../../common/task.output';
import { ListFinanceInput } from './list-task.use-case.input';

export class ListFinanceUseCase
  implements IUseCase<ListFinanceInput, ListFinancesOutput>
{
  constructor(private readonly _financeRepo: IFinanceRepository) {}

  async execute(input: ListFinanceInput): Promise<ListFinancesOutput> {
    const entities = await this._financeRepo.search(
      new TaskSearchParams(input)
    );

    return this.toOutput(entities);
  }

  private async toOutput(
    searchResult: FinanceSearchResult
  ): Promise<ListFinancesOutput> {
    const { items: _items } = searchResult;

    const items = _items.map((i) => {
      return TaskOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

export type ListFinancesOutput = PaginationOutput<TaskOutput>;
