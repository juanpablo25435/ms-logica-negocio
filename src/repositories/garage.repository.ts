import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Garage, GarageRelations, City, Bus} from '../models';
import {CityRepository} from './city.repository';
import {BusRepository} from './bus.repository';

export class GarageRepository extends DefaultCrudRepository<
  Garage,
  typeof Garage.prototype.id,
  GarageRelations
> {

  public readonly city: BelongsToAccessor<City, typeof Garage.prototype.id>;

  public readonly buses: HasManyRepositoryFactory<Bus, typeof Garage.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('BusRepository') protected busRepositoryGetter: Getter<BusRepository>,
  ) {
    super(Garage, dataSource);
    this.buses = this.createHasManyRepositoryFactoryFor('buses', busRepositoryGetter,);
    this.registerInclusionResolver('buses', this.buses.inclusionResolver);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
  }
}
