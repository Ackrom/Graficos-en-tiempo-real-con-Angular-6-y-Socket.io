import { Component, OnInit, Input } from '@angular/core';
import { MarketService } from 'src/app/services/market.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {


  constructor(private mk:MarketService){}
  
  @Input("titulo")
  title:string = "";

  graphInit = false;
  graph;

  ngOnInit(){

    this.mk.getCurrencyPrices()
    .subscribe(data=>{
      console.log(data);
      this._initGraph(data);
      this.addData(data);
    });
  }

  addData(data){
    this.graph.data[0].values = [];
    this.graph.data[0].labels = [];
    for(const value of data){
      this.graph.data[0].values.push(value.price);
      this.graph.data[0].labels.push(value.name);
    }
  }
  
  _initGraph(data){
    if(this.graphInit)
      return;
      
    this.graph = {
      data: [{
        values: [],
        labels: [],
        type: 'pie'
      }],
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

    this.graphInit = true;
  }
}
