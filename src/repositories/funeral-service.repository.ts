import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {FuneralService, FuneralServiceRelations, Beneficiary, Client, City, Review} from '../models';
import {BeneficiaryRepository} from './beneficiary.repository';
import {ClientRepository} from './client.repository';
import {CityRepository} from './city.repository';
import {ReviewRepository} from './review.repository';

export class FuneralServiceRepository extends DefaultCrudRepository<
  FuneralService,
  typeof FuneralService.prototype.id,
  FuneralServiceRelations
> {

  public readonly beneficiary: BelongsToAccessor<Beneficiary, typeof FuneralService.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof FuneralService.prototype.id>;

  public readonly city: BelongsToAccessor<City, typeof FuneralService.prototype.id>;

  public readonly reviews: HasManyRepositoryFactory<Review, typeof FuneralService.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BeneficiaryRepository') protected beneficiaryRepositoryGetter: Getter<BeneficiaryRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('CityRepository') protected cityRepositoryGetter: Getter<CityRepository>, @repository.getter('ReviewRepository') protected reviewRepositoryGetter: Getter<ReviewRepository>,
  ) {
    super(FuneralService, dataSource);
    this.reviews = this.createHasManyRepositoryFactoryFor('reviews', reviewRepositoryGetter,);
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
    this.city = this.createBelongsToAccessorFor('city', cityRepositoryGetter,);
    this.registerInclusionResolver('city', this.city.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.beneficiary = this.createBelongsToAccessorFor('beneficiary', beneficiaryRepositoryGetter,);
    this.registerInclusionResolver('beneficiary', this.beneficiary.inclusionResolver);
  }
}
