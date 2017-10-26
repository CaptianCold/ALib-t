/**
 * Created by divya.raghunathan on 2/2/2017.
 */

import {ModalDialogComponent} from './components/dialogs/modal-dialog/modal-dialog.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {BreadcrumbService} from './components/breadcrumbs/breadcrumbs.service';
import {GreeterComponent} from './components/greeter/greeter.component';
import {HelloWorldComponent} from './components/hello-world/hello-world.component';
import {DynamicComponentFactory} from './services/dynamic-component-factory';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {HelloWorldService} from './components/hello-world/hello-world.service';
import {MenuButtonComponent} from './components/menu-button/menu-button.component';
import {FlexPanelComponent} from './components/flex-panel/flex-panel.component';
import {NumberSpinnerComponent} from './components/number-spinner/number-spinner.component';
import {SplitContainerComponent} from './components/split-container/split-container.component';
import {SearchBoxComponent} from './components/search-box/search-box.component';
import {ConfirmDialogComponent} from './components/dialogs/confirm-dialog.component';
import {DataScrollerComponent} from './components/data-scroller/data-scroller.component';
import {HelpContextDirective} from './components/help/help-context.directive';
import {HelpLinkComponent} from './components/help/help-link.component';
import {ContainsFilterPipe} from './pipes/contains-filter-pipe';
import {ExponentPipe} from './pipes/exponent-pipe';
import {SortArrayPipe} from './pipes/sort-array-pipe';
import {TextAreaAutoRowsDirective} from './directives/text-area-auto-rows.directive';
import {FocusDirective} from './directives/focus.directive';
import {ResizedDirective} from './directives/resized.directive';

export const Components = [
  HelloWorldComponent,
  GreeterComponent,
  BreadcrumbsComponent,
  ModalDialogComponent,
  SpinnerComponent,
  MenuButtonComponent,
  FlexPanelComponent,
  NumberSpinnerComponent,
  SplitContainerComponent,
  SearchBoxComponent,
  ConfirmDialogComponent,
  DataScrollerComponent,
  HelpLinkComponent
];

export const Directives = [
  TextAreaAutoRowsDirective,
  HelpContextDirective,
  FocusDirective,
  ResizedDirective
];

export const Pipes = [
  ContainsFilterPipe,
  ExponentPipe,
  SortArrayPipe
];

export const Providers = [
  BreadcrumbService,
  DynamicComponentFactory,
  HelloWorldService
];

export const EntryComponents = [
  ModalDialogComponent,
  ConfirmDialogComponent
];

