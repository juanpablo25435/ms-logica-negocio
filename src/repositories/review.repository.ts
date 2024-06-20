import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Review, ReviewRelations, FuneralService, Client} from '../models';
import {FuneralServiceRepository} from './funeral-service.repository';
import {ClientRepository} from './client.repository';

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype.id,
  ReviewRelations
> {

  public readonly funeralService: BelongsToAccessor<FuneralService, typeof Review.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof Review.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FuneralServiceRepository') protected funeralServiceRepositoryGetter: Getter<FuneralServiceRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(Review, dataSource);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.funeralService = this.createBelongsToAccessorFor('funeralService', funeralServiceRepositoryGetter,);
    this.registerInclusionResolver('funeralService', this.funeralService.inclusionResolver);
  }
}
