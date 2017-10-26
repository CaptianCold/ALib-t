import {ReflectiveInjector} from '@angular/core';
import {BreadcrumbLink,BreadcrumbService} from './breadcrumbs.service';
//import {BreadcrumbLink} from './breadcrumb-link';



describe('BreadcrumbsService tests', () => {
  let breadcrumbService: BreadcrumbService;

  beforeEach(() => {
    let injector = ReflectiveInjector.resolveAndCreate([
      BreadcrumbService
    ]);

    breadcrumbService = injector.get(BreadcrumbService);
  });

  it('should have empty list of breadcrumbs when initialized', () => {
    expect(breadcrumbService.getBreadcrumbLinks()).not.toBeNull();
    expect(breadcrumbService.getBreadcrumbLinks().length).toEqual(0);
  });

  it('should add new crumbs', () => {

    breadcrumbService.appendBreadcrumbLink(new BreadcrumbLink('Home', 'Home', false));
    let linkParams = ['Profiles', 'Summary'];
    breadcrumbService.appendBreadcrumbLink(new BreadcrumbLink('Profile1', 'Profile', true, linkParams, 'c:/pic1.jpg'));
    expect(breadcrumbService.getBreadcrumbLinks().length).toEqual(2);
    expect(breadcrumbService.getBreadcrumbLinks()[0].imgSrc).not.toBeDefined();
    expect(breadcrumbService.getBreadcrumbLinks()[0].routeParams).toEqual([]);

    expect(breadcrumbService.getBreadcrumbLinks()[1].clickable).toEqual(true);
    expect(breadcrumbService.getBreadcrumbLinks()[1].imgSrc).toEqual('c:/pic1.jpg');
    expect(breadcrumbService.getBreadcrumbLinks()[1].routeParams).toEqual(linkParams);

  });

  it('should not allow to add new crumb with same id', () => {

    breadcrumbService.appendBreadcrumbLink(new BreadcrumbLink('HomeId', 'Home', false));
    expect(breadcrumbService.getBreadcrumbLinks().length).toEqual(1);
    breadcrumbService.appendBreadcrumbLink(new BreadcrumbLink('HomeId', 'Profile', false));
    expect(breadcrumbService.getBreadcrumbLinks().length).toEqual(1);
  });

  it('should remove breadcrumb with id', () => {

    breadcrumbService.appendBreadcrumbLink(new BreadcrumbLink('HomeId', 'Home', false));
    breadcrumbService.appendBreadcrumbLink(new BreadcrumbLink('ProfileId1', 'Profile', false));

    breadcrumbService.removeBreadcrumbLink('InvalidId');
    expect(breadcrumbService.getBreadcrumbLinks().length).toEqual(2);

    breadcrumbService.removeBreadcrumbLink('HomeId');
    expect(breadcrumbService.getBreadcrumbLinks().length).toEqual(1);

    breadcrumbService.removeBreadcrumbLink('ProfileId1');
    expect(breadcrumbService.getBreadcrumbLinks().length).toEqual(0);

  });
});

