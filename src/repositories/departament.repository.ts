import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Departament, DepartamentRelations, City} from '../models';
import {CityRepository} from './city.repository';

export class DepartamentRepository extends DefaultCrudRepository<
  Departament,
  typeof Departament.prototype.id,
  DepartamentRelations
> {

  public readonly cities: HasManyRepositoryFactory<City, typeof Departament.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Departament, dataSource);
    this.cities = this.createHasManyRepositoryFactoryFor('cities', cityRepositoryGetter,);
    this.registerInclusionResolver('cities', this.cities.inclusionResolver);
  }
}
