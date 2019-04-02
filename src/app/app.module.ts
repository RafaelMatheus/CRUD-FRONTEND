import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { ClienteService } from './service/domain/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { CadastrarClienteComponent } from './pages/cliente/cadastrar-cliente/cadastrar-cliente.component';
import { FormClienteComponent } from './pages/cliente/form-cliente/form-cliente.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ListarClienteComponent,
    CadastrarClienteComponent,
    FormClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
