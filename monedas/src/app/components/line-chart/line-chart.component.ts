import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from 'src/app/services/market.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private mk:MarketService){}
  
  @Input("titulo")
  title:string = "";
  @Input("currency")
  conection:string = "all";

  graphInit = false;
  graph;



  ngOnInit(){
    let name = (this.conection!="all")?'specific':this.conection;
    this.selectConection(name,this.conection)
    .subscribe(data=>{
      console.log(data);
      this._initGraph(data);
      for (let i = 0; i < data.length; i++)
        this.addData(i,data)
    });
  }

  addData(index,data){
    this.graph.data[index].x.push(data[index].date);
    this.graph.data[index].y.push(data[index].price);
  }
  selectConection(option:string,name?:string):Observable<any>{
    switch (option) {
      case 'all':
        return this.mk.getCurrencyPrices();
        
      case 'specific':
        return this.mk.getACurrency(name);
        
      default:
        return this.mk.getCurrencyPrices();
        
    }
  }
  _initGraph(data){
    if(this.graphInit)
      return;
      
    this.graph = {
      data: [],
      layout: {
        autosize:true, title: this.title,
        xaxis: {
          title: 'Tiempo',
          showgrid: false,
          zeroline: false
        },
        yaxis: {
          title: 'Precio',
          showline: false
        }
      }
    };
    for (let i = 0; i < data.length; i++) {
      this.graph.data.push(
        { x: [], y: [], type: 'scatter', mode:'lines', name:data[i].name }
      );
    }
    this.graphInit = true;
  }
}
