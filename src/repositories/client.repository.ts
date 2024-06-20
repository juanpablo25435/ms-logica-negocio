import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Client, ClientRelations, ClientPlan, City, FuneralService, Review} from '../models';
import {ClientPlanRepository} from './client-plan.repository';
import {CityRepository} from './city.repository';
import {FuneralServiceRepository} from './funeral-service.repository';
import {ReviewRepository} from './review.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly clientPlan: HasOneRepositoryFactory<ClientPlan, typeof Client.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof Client.prototype.id>;

  public readonly funeralServices: HasManyRepositoryFactory<FuneralService, typeof Client.prototype.id>;

  public readonly reviews: HasManyRepositoryFactory<Review, typeof Client.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientPlanRepository') protected clientPlanRepositoryGetter: Getter<ClientPlanRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('FuneralServiceRepository') protected funeralServiceRepositoryGetter: Getter<FuneralServiceRepository>, @repository.getter('ReviewRepository') protected reviewRepositoryGetter: Getter<ReviewRepository>,
  ) {
    super(Client, dataSource);
    this.reviews = this.createHasManyRepositoryFactoryFor('reviews', reviewRepositoryGetter,);
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
    this.funeralServices = this.createHasManyRepositoryFactoryFor('funeralServices', funeralServiceRepositoryGetter,);
    this.registerInclusionResolver('funeralServices', this.funeralServices.inclusionResolver);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.clientPlan = this.createHasOneRepositoryFactoryFor('clientPlan', clientPlanRepositoryGetter);
    this.registerInclusionResolver('clientPlan', this.clientPlan.inclusionResolver);
  }
}
