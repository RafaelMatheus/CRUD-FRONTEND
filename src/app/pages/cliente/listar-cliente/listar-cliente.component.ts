import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageCliente, clienteEntity } from 'src/app/entity/cliente.entity';
import { ClienteService } from 'src/app/service/domain/cliente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MENSAGENS } from 'src/app/config/message';


@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  public loader: boolean = false;
  public error: boolean  = true;
  public isUser: boolean = false;
  private clientes: clienteEntity[];
  public modalRef: BsModalRef;
  public order: string;
  public value: any;
  clienteNew: clienteEntity = <clienteEntity>{};
  clienteUpdate: clienteEntity = <clienteEntity>{};
  constructor(private clienteService: ClienteService, 
    private modalService: BsModalService, 
    private toastr: ToastrService) { }


  ngOnInit() {
    this.findAll();
  }

  selecionaCliente(cliente: clienteEntity){
    this.clienteUpdate = cliente;
  }

  zeraCliente(){
    this.clienteUpdate = <clienteEntity>{};
  }

  addCliente(cliente: clienteEntity){
    console.log(cliente);
    this.clienteService.insert(cliente).subscribe(response => {
      this.findAll();
      alert(MENSAGENS.SUCESSO);
    }, error=>{
      this.loader = false;
      this.error = true;
      alert(MENSAGENS.ERROR);
    })
   
  }

  updateCliente(cliente: clienteEntity){
    this.clienteService.update(cliente).subscribe(response=>{
      this.findAll();
      alert(MENSAGENS.SUCESSO);
    }, error=>{
      this.loader = false;
      this.error = true;
      alert(MENSAGENS.ERROR);
    })
    
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }

  findAll(page: string = '0',  linesporPage: string = '9', orderBy: string = 'data_cadast', order: string = "DESC"){
    this.order = order;
    this.clienteService.findAll(page, linesporPage, orderBy, order ).subscribe(
      (response: PageCliente) => {
       this.loader = true;
       this.clientes = response.content;
       this.isUser = true;
      console.log(this.clientes);
    }, error=> {
       this.loader = false;
       this.error = true;
    })
  }

  trocarOrdem(orderBy: string) {
    if(this.order == 'ASC'){
      this.order = 'DESC';
    }
    else{
      this.order = 'ASC';
    }
    this.findAll('0', '14', orderBy, this.order);
  }

  deleteCliente(matricula: string){
    this.clienteService.delete(matricula).subscribe(response=>{
      alert(MENSAGENS.SUCESSO);
      this.findAll();
      this.modalRef.hide();
    },error=>{
      this.loader = false;
      this.error = true;
      alert(MENSAGENS.ERROR);
    })
  }

  isUserAdd(): boolean{
    console.log(this.isUser);
    return this.isUser;
  }

  onKey(event: any, page: string = '0',  linesporPage: string = '9', orderBy: string = 'data_cadast', order='DESC') { // without type info
    this.value = event.target.value;
    if(this.value == null){
      this.findAll();
    }
    this.clienteService.search(page, linesporPage, orderBy, order, this.value).subscribe( 
      (response: PageCliente) =>{
      this.clientes = response.content
    }, error=>{
      console.log(error.message)
    })
  }
}
