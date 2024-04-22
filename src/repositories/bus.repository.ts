import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Bus, BusRelations, Garage} from '../models';
import {GarageRepository} from './garage.repository';

export class BusRepository extends DefaultCrudRepository<
  Bus,
  typeof Bus.prototype.id,
  BusRelations
> {

  public readonly garage: BelongsToAccessor<Garage, typeof Bus.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('GarageRepository') protected garageRepositoryGetter: Getter<GarageRepository>,
  ) {
    super(Bus, dataSource);
    this.garage = this.createBelongsToAccessorFor('garage', garageRepositoryGetter,);
    this.registerInclusionResolver('garage', this.garage.inclusionResolver);
  }
}
