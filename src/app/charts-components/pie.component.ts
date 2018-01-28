import { Component,ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  selector: 'pie-component',
  template: `
    <div class='pie-container'>
        <canvas #myPie></canvas>
    </div>
  `
})
export class PieComponent {

  constructor(public activatedRoute : ActivatedRoute){}
  chart = null;
  private pieChartdata;

  @ViewChild('myPie') myPie: ElementRef

  ngOnInit() {
    this.activatedRoute.data.subscribe((s) => {
      this.pieChartdata = this.PieCharDataGenerator(s.data);

      if (this.chart) {
        this.chart.data.datasets[0].data = this.pieChartdata.data;
        this.chart.data.labels = this.pieChartdata.labels;
        this.chart.update();
      }
    })
  }


  PieCharDataGenerator(deliveryData) {
    var data = deliveryData.reduce((xs, key) => {
      xs[key.tag] = 1 + (xs[key.tag] || 0)
      return xs;
    }, {});

    return {
      data : Object.values(data),
      labels : Object.keys(data),
    }
  }

  ngAfterViewInit() {

    this.chart = new Chart(this.myPie.nativeElement.getContext('2d'), {
        type: 'pie',
        data: {
        datasets: [{
            data: this.pieChartdata.data,
            backgroundColor: backgroundColor,
        }],
        labels: this.pieChartdata.labels,
      }
    });


  }

}
