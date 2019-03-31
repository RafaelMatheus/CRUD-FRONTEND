import { Component, OnInit } from '@angular/core';
import { clienteEntity } from 'src/app/entity/cliente.entity';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  public clientes: clienteEntity[] = [{
    matricula:'213131',
    dataNascimento: new Date(),
    email: 'rafaelmatheusdecastro@hotmail.com.br',
    nome: 'rafael'
  },
  {
    matricula:'323311331',
    dataNascimento: new Date(),
    email: 'rafaelmatheusdecastro@hotmail.com.br',
    nome: 'rafael'
  }
  
];
  constructor() { }

  ngOnInit() {
  }

}
