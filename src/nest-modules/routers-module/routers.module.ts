import { Global, Module } from '@nestjs/common';
import { RouterModule as NestRouterModule } from '@nestjs/core';
import { FinancesModule } from '../tasks-module/tasks.module';

@Global()
@Module({})
export class RoutersModule extends NestRouterModule {
  static register() {
    return super.register([
      {
        path: 'v1',
        children: [
          {
            path: 'finances',
            module: FinancesModule,
          },
        ],
      },
    ]);
  }
}
