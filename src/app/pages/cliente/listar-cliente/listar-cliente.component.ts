import { Component, OnInit } from '@angular/core';
import { PageCliente, clienteEntity } from 'src/app/entity/cliente.entity';
import { ClienteService } from 'src/app/service/domain/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  public loader: boolean = false;
  public error: boolean  = true;
  private clientes: clienteEntity[];
  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.findAll();
  }

  findAll(page: string = '0',  linesporPage: string = '14', orderBy: string = 'DESC'){
    this.clienteService.findAll(page, linesporPage, orderBy ).subscribe(
      (response: PageCliente) => {
       this.loader = true;
       this.clientes = response.content;
      console.log(this.clientes);
    }, error=> {
       this.loader = false;
       this.error = true;
    })
  }

  trocarOrder(order: string) {
    
    this.findAll('0', '14', 'nome');
  }

  delete(matricula: string){
    
  }

}
