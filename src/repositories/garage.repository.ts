import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Garage, GarageRelations, City} from '../models';
import {CityRepository} from './city.repository';

export class GarageRepository extends DefaultCrudRepository<
  Garage,
  typeof Garage.prototype.id,
  GarageRelations
> {

  public readonly city: BelongsToAccessor<City, typeof Garage.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Garage, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
  }
}
