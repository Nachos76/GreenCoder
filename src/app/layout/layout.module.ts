import { AsideComponent } from './aside/aside.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from '../modules/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainLayoutRoutingModule } from '@app/pages/main-layout/main-layout-routing.module';

@NgModule({
  declarations: [
    FooterComponent,
    ToolbarComponent,
    AsideComponent,
    MainComponent,
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MainLayoutRoutingModule,
  ],
  exports: [
    FooterComponent,
    ToolbarComponent,
    AsideComponent,
    MainComponent,
    NavigationComponent,
  ],
})
export class LayoutModule {}
