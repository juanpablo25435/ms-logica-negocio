import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Client, ClientRelations, ClientPlan, City} from '../models';
import {ClientPlanRepository} from './client-plan.repository';
import {CityRepository} from './city.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly clientPlan: HasOneRepositoryFactory<ClientPlan, typeof Client.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientPlanRepository') protected clientPlanRepositoryGetter: Getter<ClientPlanRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>,
  ) {
    super(Client, dataSource);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.clientPlan = this.createHasOneRepositoryFactoryFor('clientPlan', clientPlanRepositoryGetter);
    this.registerInclusionResolver('clientPlan', this.clientPlan.inclusionResolver);
  }
}
