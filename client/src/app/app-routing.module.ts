import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {FavoritesComponent} from "./favorites/favorites.component";
import {CreateComponent} from "./create/create.component";

const routes: Routes = [
  {path: '', component: CatalogComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'create', component: CreateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
