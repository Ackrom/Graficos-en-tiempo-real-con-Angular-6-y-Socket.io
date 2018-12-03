import { Injectable } from '@angular/core';
import  * as socketIo from "socket.io-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor() { 
    this.socket = socketIo(this.url);
  }

  url = 'http://localhost:5000';
  socket;

  getCurrencyPrices():Observable<any>{
    return new Observable<any>(observer=>{
      this.socket.on('message',(data)=>observer.next(data));
    });
  }
  getACurrency(name:string):Observable<any>{
    return new Observable<any>(observer=>{
      this.socket.on(name,(data)=>observer.next(data));
    });
  }
}
