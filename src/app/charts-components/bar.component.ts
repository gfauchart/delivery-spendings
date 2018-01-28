import { Component,ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';

var backgroundColor = [
   "rgba(255, 99, 132, 0.2)",
   "rgba(255, 159, 64, 0.2)",
   "rgba(255, 205, 86, 0.2)",
   "rgba(75, 192, 192, 0.2)",
   "rgba(54, 162, 235, 0.2)",
   "rgba(153, 102, 255, 0.2)",
   "rgba(201, 203, 207, 0.2)"
];


@Component({
  selector: 'bar-component',
  template: `
    <div class='bar-container'>
        <canvas #myBar></canvas>
    </div>
  `
})
export class BarComponent {

  constructor(public activatedRoute : ActivatedRoute){}

  @ViewChild('myBar') myBar: ElementRef;
  chart = null;

  private barChartData;

  ngOnInit() {
    this.activatedRoute.data.subscribe((s) => {
      this.barChartData = this.BarChartDataGenerator(s.data);

      if (this.chart) {
        this.chart.data.datasets[0].data = this.barChartData.data;
        this.chart.data.labels = this.barChartData.labels;
        this.chart.update();
      }
    })
  }

  BarChartDataGenerator(deliveryData) {

    let startMonth = this.activatedRoute.snapshot.queryParams.startMonth || 32;

    let end = moment().startOf('year');
    let start = moment().subtract(startMonth, 'month').startOf('year');
    var map = {};

    do  {
      //console.log(start.calendar())
      map[start.format('YYYY')] = {
        total: 0,
        ts: start.valueOf()
      }
    } while (start.add(1, 'month').isSameOrBefore(end))

    deliveryData.forEach(data => {
      let obj = map[moment(new Date(parseInt(data.timestamp, 10))).format('YYYY')];
      if (obj) {
        obj.total += data.price
      }
    });

    let orderedData = Object.values(map).sort((a:any,b:any) => a.ts - b.ts);

    let labels = orderedData.map((data : any) => moment(new Date(parseInt(data.ts, 10))).format('YYYY'));
    let data = orderedData.map((n : any) => n.total);

    labels.push('Total');
    data.push(data.reduce(function(a, b) { return a + b; }, 0.0));
    data = data.map(n => n.toFixed());

    return {
      labels : labels,
      data : data
    };

  }

  ngAfterViewInit() {

    Chart.defaults.global.legend.display = false;

    this.chart = new Chart(this.myBar.nativeElement.getContext('2d'), {
        type: 'horizontalBar',
        data: {
          datasets: [{
              data: this.barChartData.data,
              backgroundColor: backgroundColor,
          }],
          labels: this.barChartData.labels,
        },
          options:{
           scales:{
              xAxes:[
                 {
                    ticks:{
                       beginAtZero: true,
                       callback: function(label, index, labels) {
                            return label+'£';
                        }
                    }
                 }
              ]
           },
        }
    });


  }

}
