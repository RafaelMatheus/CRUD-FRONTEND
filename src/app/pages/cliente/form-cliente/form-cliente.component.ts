import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { clienteEntity } from 'src/app/entity/cliente.entity';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  @Input() btn ;
  @Output() outputModal = new EventEmitter();
  @Input() cliente: clienteEntity = <clienteEntity>{};
  @Output() outputCliente: EventEmitter<clienteEntity> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  fecharModal(){
    this.outputModal.emit('aaa');
  }

  onSubmit() {
    this.outputCliente.emit(this.cliente);
  }

}
