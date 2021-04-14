import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ListOwnersComponent } from './list-owners/list-owners.component'
import { OwnerInfoComponent } from './owner-info/owner-info.component'

const routes: Routes = [
  { path: '', component: ListOwnersComponent },
  { path: 'owner', component: OwnerInfoComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
