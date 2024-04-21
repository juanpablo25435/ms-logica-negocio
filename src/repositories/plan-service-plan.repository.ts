import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PlanServicePlan, PlanServicePlanRelations, Plan, ServicePlan} from '../models';
import {PlanRepository} from './plan.repository';
import {ServicePlanRepository} from './service-plan.repository';

export class PlanServicePlanRepository extends DefaultCrudRepository<
  PlanServicePlan,
  typeof PlanServicePlan.prototype.id,
  PlanServicePlanRelations
> {

  public readonly includedPlan: BelongsToAccessor<Plan, typeof PlanServicePlan.prototype.id>;

  public readonly includedService: BelongsToAccessor<ServicePlan, typeof PlanServicePlan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('ServicePlanRepository') protected servicePlanRepositoryGetter: Getter<ServicePlanRepository>,
  ) {
    super(PlanServicePlan, dataSource);
    this.includedService = this.createBelongsToAccessorFor('includedService', servicePlanRepositoryGetter,);
    this.registerInclusionResolver('includedService', this.includedService.inclusionResolver);
    this.includedPlan = this.createBelongsToAccessorFor('includedPlan', planRepositoryGetter,);
    this.registerInclusionResolver('includedPlan', this.includedPlan.inclusionResolver);
  }
}
