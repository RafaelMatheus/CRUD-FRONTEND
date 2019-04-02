import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clienteEntity, PageCliente } from 'src/app/entity/cliente.entity';
import { API_CONFIG } from 'src/app/config/apiConfig';

@Injectable({
    providedIn: 'root'
})
export class ClienteService{
    private urlApi: string = API_CONFIG.baseUrlLocal
    constructor(private http: HttpClient){}

    findAll(page: string = '', linesPerPage: string = '14' , orderBy: string = 'data_cadast' , order: string = 'DESC'): Observable<PageCliente>{
        return this.http.get<PageCliente>(
            `${this.urlApi}/clientes?page=${page}&linesPerPage=${linesPerPage}&orderby=${orderBy}&direction=${order}`);
    }

    insert(cliente: clienteEntity): Observable<any>{
        return this.http.post(`${this.urlApi}/clientes`, cliente)
    }

    delete(matricula: string): Observable<any>{
        return this.http.delete(`${this.urlApi}/clientes/${matricula}`);
    }

    update(cliente: clienteEntity): Observable<any>{
        return this.http.put(`${this.urlApi}/clientes/${cliente.matricula}`, cliente);
    }

    search(page: string = '', linesPerPage: string = '14' , orderBy: string = 'data_cadast' , order: string = 'DESC', nome: string = ''): Observable<PageCliente>{
        console.log(nome)
        return this.http.get<PageCliente>(
            `${this.urlApi}/clientes/search?page=${page}&linesPerPage=${linesPerPage}&orderby=${orderBy}&direction=${order}&nome=${nome}`);
    }

}