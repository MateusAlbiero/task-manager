import { FinanceEntity } from '../../domain/entities/task.entity';

export type TaskOutput = {
  id: string;
  value: number;
  description: string;
  created_at: Date;
  updated_at: Date;
};

export class TaskOutputMapper {
  static toOutput(entity: FinanceEntity): TaskOutput {
    return entity.toJSON();
  }
}
