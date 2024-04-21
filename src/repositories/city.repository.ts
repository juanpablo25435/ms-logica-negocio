import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {City, CityRelations, Departament, Garage, Room} from '../models';
import {DepartamentRepository} from './departament.repository';
import {GarageRepository} from './garage.repository';
import {RoomRepository} from './room.repository';

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id,
  CityRelations
> {

  public readonly departament: BelongsToAccessor<Departament, typeof City.prototype.id>;

  public readonly garages: HasManyRepositoryFactory<Garage, typeof City.prototype.id>;

  public readonly rooms: HasManyRepositoryFactory<Room, typeof City.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('DepartamentRepository') protected departamentRepositoryGetter: Getter<DepartamentRepository>, @repository.getter('GarageRepository') protected garageRepositoryGetter: Getter<GarageRepository>, @repository.getter('RoomRepository') protected roomRepositoryGetter: Getter<RoomRepository>,
  ) {
    super(City, dataSource);
    this.rooms = this.createHasManyRepositoryFactoryFor('rooms', roomRepositoryGetter,);
    this.registerInclusionResolver('rooms', this.rooms.inclusionResolver);
    this.garages = this.createHasManyRepositoryFactoryFor('garages', garageRepositoryGetter,);
    this.registerInclusionResolver('garages', this.garages.inclusionResolver);
    this.departament = this.createBelongsToAccessorFor('departament', departamentRepositoryGetter,);
    this.registerInclusionResolver('departament', this.departament.inclusionResolver);
  }
}
