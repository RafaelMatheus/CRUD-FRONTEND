import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageCliente, clienteEntity } from 'src/app/entity/cliente.entity';
import { ClienteService } from 'src/app/service/domain/cliente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  public loader: boolean = false;
  public error: boolean  = true;
  private clientes: clienteEntity[];
  public modalRef: BsModalRef;
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
      alert("Cadastro efetuado com sucesso!");
    }, error=>{
      alert("Não foi possivel cadastrar o cliente entre em contato com o suporte.");
    })
   
  }

  updateCliente(cliente: clienteEntity){
    console.log(cliente)
    alert(cliente);
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); // {3}
  }

  findAll(page: string = '0',  linesporPage: string = '9', orderBy: string = 'DESC'){
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

  trocarOrdem(order: string) {
    console.log(order)
    this.findAll('0', '14', order);
  }

  deleteCliente(matricula: string){
    this.clienteService.delete(matricula).subscribe(response=>{
      alert('cliente removido com sucesso! ');
      this.findAll();
      this.modalRef.hide();
    },error=>{
      alert('erro ao remover cliente entre em contato com o suporte. ');
    })
  }

}
