import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { UserDetailsComponent } from './Component/user-details/user-details.component';
import { NotFoundedComponent } from './Component/not-founded/not-founded.component';

const routes: Routes = [
  {path: 'User/:uId' , component : UserDetailsComponent},
  {path:'Home',component:HomeComponent},
  {path:'',redirectTo:'Home',pathMatch: 'full'},
  {path : '**' , component : NotFoundedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
