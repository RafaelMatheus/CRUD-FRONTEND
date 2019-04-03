import { Component, OnInit, TemplateRef } from '@angular/core';
import { PageCliente, clienteEntity } from 'src/app/entity/cliente.entity';
import { ClienteService } from 'src/app/service/domain/cliente.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { MENSAGENS } from 'src/app/config/message'; 
import { UpdateSenha } from 'src/app/entity/UpdateSenha.dto';



@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {
  public loader: boolean = false;
  public error: boolean  = true;
  public isUser: boolean = false;
  public isShow: boolean = true;
  public isRegistro: boolean = true;
  public clientes: clienteEntity[];
  public modalRef: BsModalRef;
  public order: string;
  public value: any;
  public clienteNew: clienteEntity = <clienteEntity>{};
  public clienteUpdate: clienteEntity = <clienteEntity>{};
  public pageClientes: PageCliente = <any>{};
  public updateSenha: UpdateSenha = <UpdateSenha>{};
  public matriculaClienteUpdate: number;

  constructor(private clienteService: ClienteService, 
    private modalService: BsModalService, 
    private toastr: ToastrService) { }


  ngOnInit() {
    this.findAll();
  }

  selecionaCliente(cliente: clienteEntity){
    this.clienteUpdate = cliente;
  }

  selecionarClienteUpdateSenha(matricula: clienteEntity){
  
    this.matriculaClienteUpdate = matricula.matricula;
  }

  zeraCliente(){
    this.clienteUpdate = <clienteEntity>{};
  }

  addCliente(cliente: clienteEntity){
    this.clienteService.insert(cliente).subscribe(response => {
      this.findAll();
      this.toastr.success(MENSAGENS.SUCESSO);
      this.modalRef.hide();
      this.clienteNew = <clienteEntity>{};
    }, error=>{
      this.loader = false;
      this.error = true;
      this.toastr.error(MENSAGENS.ERROR+' Email existente');
      this.modalRef.hide();
      this.clienteNew = <clienteEntity>{};
    })
   
  }

  updateCliente(cliente: clienteEntity){
    this.clienteService.update(cliente).subscribe(response=>{
      this.findAll();
      this.toastr.success(MENSAGENS.SUCESSO);
      this.modalRef.hide();
    }, error=>{
      this.loader = false;
      this.error = true;
      this.toastr.error(MENSAGENS.ERROR + error.message);
      this.modalRef.hide();
    })
    
  }

  public changePassword(updateSenha: UpdateSenha){
    this.updateSenha.matricula = 52
    this.clienteService.changePassword(updateSenha).subscribe( response=> {
      this.toastr.success(MENSAGENS.SUCESSO);
      this.modalRef.hide();
    },error=>{
      this.toastr.error(MENSAGENS.ERROR + error.message);
      this.modalRef.hide();
      console.log(error)
    })
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template); 
  }



  findAll(page: string = '0',  linesporPage: string = '10', orderBy: string = 'data_cadast', order: string = "DESC"){
    this.loader = true;
    this.order = order;
    this.isShow = true;
    this.clienteService.findAll(page, linesporPage, orderBy, order ).subscribe(
      (response: PageCliente) => {
       this.clientes = response.content;
       this.isUser = true;
       this.pageClientes = response;
       this.loader = false;
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
      this.toastr.success(MENSAGENS.SUCESSO);
      this.findAll();
      this.modalRef.hide();
    },error=>{
      this.loader = false;
      this.error = true;
      this.toastr.error(MENSAGENS.ERROR + error.message);
      this.modalRef.hide();
    })
  }

  isUserAdd(): boolean{
    return this.isUser;
  }

  onKey(event: any, page: string = '0',  linesporPage: string = '9', orderBy: string = 'data_cadast', order='DESC') { // without type info
    this.value = event.target.value;
    this.isShow = false;
    if(this.value === ''){
      this.findAll();
      console.log(this.isShow)
    }
    this.clienteService.search(page, linesporPage, orderBy, order, this.value).subscribe( 
      (response: PageCliente) =>{
      this.clientes = response.content
    }, error=>{
      console.log(error.message)
    })
  }
  pageChanged(event: any){
    this.findAll(event.page);
  }
  isPasswordEquals(novaSenha: string, confirmacaoSenha: string): boolean{
    if(novaSenha === confirmacaoSenha){
      return false;
    }
    return true;
  }

  totalPages() {
    const pages = [];
    for( let i = 0; i < this.pageClientes.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

}
