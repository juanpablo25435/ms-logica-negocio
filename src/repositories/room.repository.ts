import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Room, RoomRelations, City} from '../models';
import {CityRepository} from './city.repository';

export class RoomRepository extends DefaultCrudRepository<
  Room,
  typeof Room.prototype.id,
  RoomRelations
> {

  public readonly roomCity: BelongsToAccessor<City, typeof Room.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Room, dataSource);
    this.roomCity = this.createBelongsToAccessorFor('roomCity', cityRepositoryGetter,);
    this.registerInclusionResolver('roomCity', this.roomCity.inclusionResolver);
  }
}
