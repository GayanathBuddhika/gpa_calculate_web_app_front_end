import { ResultViewService } from './../../service/result-view.service';
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/model/Result';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {

  results : Result[];

  constructor(
    private resultViewService: ResultViewService
  ) { }

  ngOnInit() {
    this.resultViewService.getResultByEpNumber("EP2032").subscribe(data => {
     this.results = data;
     console.log(data);
    }, err => {

    });
  }


}
