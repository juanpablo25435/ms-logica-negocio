import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicePlan, ServicePlanRelations, PlanServicePlan, AdditionalService} from '../models';
import {PlanServicePlanRepository} from './plan-service-plan.repository';
import {AdditionalServiceRepository} from './additional-service.repository';

export class ServicePlanRepository extends DefaultCrudRepository<
  ServicePlan,
  typeof ServicePlan.prototype.id,
  ServicePlanRelations
> {

  public readonly servicePlanIncluded: HasManyRepositoryFactory<PlanServicePlan, typeof ServicePlan.prototype.id>;

  public readonly additionalServices: HasManyRepositoryFactory<AdditionalService, typeof ServicePlan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PlanServicePlanRepository') protected planServicePlanRepositoryGetter: Getter<PlanServicePlanRepository>, @repository.getter('AdditionalServiceRepository') protected additionalServiceRepositoryGetter: Getter<AdditionalServiceRepository>,
  ) {
    super(ServicePlan, dataSource);
    this.additionalServices = this.createHasManyRepositoryFactoryFor('additionalServices', additionalServiceRepositoryGetter,);
    this.registerInclusionResolver('additionalServices', this.additionalServices.inclusionResolver);
    this.servicePlanIncluded = this.createHasManyRepositoryFactoryFor('servicePlanIncluded', planServicePlanRepositoryGetter,);
    this.registerInclusionResolver('servicePlanIncluded', this.servicePlanIncluded.inclusionResolver);
  }
}
