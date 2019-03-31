import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { CadastrarClienteComponent } from './pages/cliente/cadastrar-cliente/cadastrar-cliente.component';

const routes: Routes = [
  {path: '', component: ListarClienteComponent},
  {path: 'cadastrar', component: CadastrarClienteComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
