import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PersonajesComponent } from './Pages/films/personajes/personajes.component';

const routes: Routes = [
  
    { path: 'home', component: HomeComponent },
    //{ path: 'Charactersr' , component: PersonajesComponent },
    { path: 'Characters/filter' , component: PersonajesComponent },
    { path: 'Characters/:id_film' , component: PersonajesComponent },
    { path: '**', component: HomeComponent },
  
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

