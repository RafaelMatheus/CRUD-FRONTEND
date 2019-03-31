import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clienteEntity, PageCliente } from 'src/app/entity/cliente.entity';
import { API_CONFIG } from 'src/app/config/apiConfig';

@Injectable({
    providedIn: 'root'
})
export class ClienteService{
    constructor(private http: HttpClient){}

    findAll(page: string = '', linesPerPage: string = '14' , orderBy: string = 'nome' , order: string = 'DESC'): Observable<PageCliente>{
        return this.http.get<PageCliente>(
            `${API_CONFIG.baseUrlLocal}/clientes?page=${page}&linesPerPage=${linesPerPage}&orderby=${orderBy}&direction=${order}`);
    }

}