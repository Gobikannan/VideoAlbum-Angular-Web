import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'albums', pathMatch: 'full' },
  { path: 'albums', loadChildren: () => import('../albums/albums.module').then(m => m.AlbumsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      useHash: true,
      enableTracing: false
    } // <-- debugging purposes only
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
