import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {AdditionalService, AdditionalServiceRelations, ServicePlan, Plan} from '../models';
import {ServicePlanRepository} from './service-plan.repository';
import {PlanRepository} from './plan.repository';

export class AdditionalServiceRepository extends DefaultCrudRepository<
  AdditionalService,
  typeof AdditionalService.prototype.id,
  AdditionalServiceRelations
> {

  public readonly principalService: BelongsToAccessor<ServicePlan, typeof AdditionalService.prototype.id>;

  public readonly plan: BelongsToAccessor<Plan, typeof AdditionalService.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicePlanRepository') protected servicePlanRepositoryGetter: Getter<ServicePlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(AdditionalService, dataSource);
    this.plan = this.createBelongsToAccessorFor('plan', planRepositoryGetter,);
    this.registerInclusionResolver('plan', this.plan.inclusionResolver);
    this.principalService = this.createBelongsToAccessorFor('principalService', servicePlanRepositoryGetter,);
    this.registerInclusionResolver('principalService', this.principalService.inclusionResolver);
  }
}
