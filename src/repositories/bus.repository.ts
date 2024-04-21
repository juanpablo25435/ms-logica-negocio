import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Bus, BusRelations} from '../models';

export class BusRepository extends DefaultCrudRepository<
  Bus,
  typeof Bus.prototype.id,
  BusRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Bus, dataSource);
  }
}
