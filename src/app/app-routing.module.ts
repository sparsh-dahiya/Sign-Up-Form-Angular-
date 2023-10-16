import { NgModule, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RemoveComponent } from './remove/remove.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {path:'addDetail',component:DetailsComponent},
  {path:'list' , component:TableComponent},
  {path:'remove' , component:RemoveComponent},
  {path:'about' , component:AboutComponent},
  {path:'' , redirectTo:'/about' , pathMatch:'full'},
  {path:'**' , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
