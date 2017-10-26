import {
    ComponentFactory, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef,
    Type, ReflectiveInjector, ResolvedReflectiveProvider, Provider
} from '@angular/core';

/**
 * Runtime representation of a type that is constructable (non-abstract).
 */
export interface IConcreteType<T> extends Type<T> {
    new(...any:any[]): T;
}

@Injectable()
export class DynamicComponentFactory {
    constructor(private _componentFactoryResolver: ComponentFactoryResolver) {
    }

    createComponent<T>(
        componentType: IConcreteType<T>,
        viewContainerRef: ViewContainerRef,
        providers?: Array<Provider>): Promise<ComponentRef<T>> {
        let injector = viewContainerRef.parentInjector;
        if (providers && providers.length > 0) {
            let resolvedProviders: ResolvedReflectiveProvider[] =
                providers ? ReflectiveInjector.resolve(providers) : [];
            injector = ReflectiveInjector.fromResolvedProviders(resolvedProviders, injector);
        }

        let factory:ComponentFactory<T> = this._componentFactoryResolver.resolveComponentFactory(componentType);
        let componentRef: ComponentRef<T> = viewContainerRef.createComponent<T>(factory, viewContainerRef.length, injector);
        return Promise.resolve<ComponentRef<T>>(componentRef);
    }
}
