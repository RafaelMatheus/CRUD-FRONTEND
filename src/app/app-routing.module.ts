import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarClienteComponent } from './pages/listar-cliente/listar-cliente.component';

const routes: Routes = [{
  path: '', component: ListarClienteComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
