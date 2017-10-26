/**
 * Created by divya.raghunathan on 1/25/2017.
 */

import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import * as libraryDeclarations from './library.declarations';

/**
 * Module for reusuable Angular components, directives, services and utilities
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  declarations : [
    ...libraryDeclarations.Components,
    ...libraryDeclarations.Directives,
    ...libraryDeclarations.Pipes
  ],
  exports: [
    ...libraryDeclarations.Components,
    ...libraryDeclarations.Directives,
    ...libraryDeclarations.Pipes
  ],
  entryComponents : [
    ...libraryDeclarations.EntryComponents
  ]
})
export class AngularLibraryModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AngularLibraryModule,
      providers: [
        ...libraryDeclarations.Providers
      ]
    };
  }
}
