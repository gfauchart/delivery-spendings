import { Component,ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as moment from 'moment';


var backgroundColor = [
   "rgba(44, 62, 80, 0.05)",
   "rgba(52, 152, 219, 0.2)",
   "rgba(230, 126, 34, 0.2)",
   "rgba(155, 89, 182, 0.2)",
   "rgba(26, 188, 156, 0.2)",
   "rgba(241, 196, 15, 0.2)",
];


@Component({
  selector: 'line-component',
  template: `
    <div class='line-container'>
        <canvas #myLine></canvas>
    </div>
  `
})
export class LineComponent {


  @ViewChild('myLine') myLine: ElementRef

  chart = null;
  private lineChartdata;

  constructor(public activatedRoute : ActivatedRoute){}


  dataGenerator(deliveryData) {

    let startMonth = this.activatedRoute.snapshot.queryParams.startMonth || 32;

    let end = moment().startOf('month');
    let start = moment().subtract(startMonth, 'month').startOf('month');
    var map = {};
    var tags = {};

    do  {
      //console.log(start.calendar())
      map[start.format('MM/YYYY')] = {
        occurence: 0,
        shopOccurence: {},
        ts: start.valueOf()
      }
    } while (start.add(1, 'month').isSameOrBefore(end))

    deliveryData.forEach(data => {
      //console.log(moment.unix(parseInt(data.timestamp, 10)).format('MM/YYYY'));
      let obj = map[moment(new Date(parseInt(data.timestamp, 10))).format('MM/YYYY')];
      if (obj) {
        tags[data.tag] = true;
        obj.shopOccurence[data.tag] = (obj.shopOccurence[data.tag] || 0) + 1;
        obj.occurence += 1;
      }
    });

    let orderedData = Object.values(map).sort((a:any,b:any) => a.ts - b.ts);

    let dataSet = [{
      label: '# of orders',
      data: orderedData.map((data : any) => data.occurence),
      backgroundColor: backgroundColor[0],
    }];

    Object.keys(tags).forEach((tag, idx)=>{
      dataSet.push({
        label: tag,
        data: orderedData.map((data : any) => data.shopOccurence[tag] || 0),
        backgroundColor: backgroundColor[1+idx],
      })
    })

    return {
      labels: orderedData.map((data : any) => moment(new Date(parseInt(data.ts, 10))).format('MM/YYYY')),
      datasets: dataSet
    }

  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((s) => {
      this.lineChartdata = this.dataGenerator(s.data);

      if (this.chart) {
        this.chart.data = this.lineChartdata;
        this.chart.update();
      }
    })
  }

  ngAfterViewInit() {

    this.chart = new Chart(this.myLine.nativeElement.getContext('2d'), {
      type: 'line',
      data: this.lineChartdata
    });

  }

}
