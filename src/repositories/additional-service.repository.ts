import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AdditionalService, AdditionalServiceRelations, ServicePlan} from '../models';
import {ServicePlanRepository} from './service-plan.repository';

export class AdditionalServiceRepository extends DefaultCrudRepository<
  AdditionalService,
  typeof AdditionalService.prototype.id,
  AdditionalServiceRelations
> {

  public readonly principalService: BelongsToAccessor<ServicePlan, typeof AdditionalService.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicePlanRepository') protected servicePlanRepositoryGetter: Getter<ServicePlanRepository>,
  ) {
    super(AdditionalService, dataSource);
    this.principalService = this.createBelongsToAccessorFor('principalService', servicePlanRepositoryGetter,);
    this.registerInclusionResolver('principalService', this.principalService.inclusionResolver);
  }
}
