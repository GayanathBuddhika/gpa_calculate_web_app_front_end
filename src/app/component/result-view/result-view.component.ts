import { ResultViewService } from './../../service/result-view.service';
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/model/Result';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.css']
})
export class ResultViewComponent implements OnInit {

  results: Result[] = [];
  firstYearResults: Result[] = [];
  secondYearResults: Result[] = [];
  thredYearResults: Result[] = [];
  forthtYearResults: Result[] = [];
   year1sem1sem2: boolean = false;
    year2sem1sem2: boolean = false;
     year3sem1sem2: boolean = false;
      year4sem1sem2:boolean= false;
  absentOrRepeetInYear1: boolean= false;
   absentOrRepeetInYear2: boolean= false;
    absentOrRepeetInYear3: boolean= false;
     absentOrRepeetInYear4: boolean= false;
     gpa1Year: number;
     gpa2Year: number;
     gpa3Year: number;
     gpa4Year: number;
  constructor(
    private resultViewService: ResultViewService
  ) { }

  ngOnInit() {
    this.resultViewService.getResultByEpNumber("EP2032").subscribe(data => {
      this.results = data;
      // let numb = this.results[0].course.courseCode.match(/\d/g);
      this.catogariceSubjectsEyerBy(this.results);
      console.log(this.results.length);
      console.log(this.firstYearResults.length);
      console.log(this.secondYearResults.length);
      console.log(this.thredYearResults.length);
      console.log(this.forthtYearResults.length);
    }, err => {

    });
  }



  catogariceSubjectsEyerBy(results: Result[]) {

    results.forEach((result, i) => {
      let codeNumber = result.course.courseCode.match(/\d/g);
      switch (codeNumber[0]) {
        case "1":
          this.firstYearResults.push(result);
          break;
        case "2":
          this.secondYearResults.push(result);
          break;
        case "3":
          this.thredYearResults.push(result);
          break;
        case "4":
          this.forthtYearResults.push(result);
          break;
      }

      console.log(codeNumber);

    });

    if(this.firstYearResults.length > 0){
     this.year1sem1sem2 = this.checkSemOneSemTwoinclude(this.firstYearResults);
     if(this.year1sem1sem2){
        this.absentOrRepeetInYear1 = this.checkResultHasRepeetOrAbsent(this.firstYearResults);
        if(this.absentOrRepeetInYear1){
          this.gpa1Year = this.findGpaInYear(this.firstYearResults)
          console.log("first year gpa", this.gpa1Year);
        }
     }
     
    }

     if(this.secondYearResults.length > 0){
     this.year2sem1sem2 = this.checkSemOneSemTwoinclude(this.secondYearResults);
          if(this.year2sem1sem2){
        this.absentOrRepeetInYear2 = this.checkResultHasRepeetOrAbsent(this.secondYearResults);
        if(this.absentOrRepeetInYear2){
          this.gpa2Year = this.findGpaInYear(this.secondYearResults)
          console.log("second year gpa", this.gpa2Year);
        }
     }
    }

     if(this.thredYearResults.length > 0){
        this. year3sem1sem2 = this.checkSemOneSemTwoinclude(this.thredYearResults);

          if(this.year3sem1sem2){
             this.absentOrRepeetInYear3 = this.checkResultHasRepeetOrAbsent(this.thredYearResults);
              if(this.absentOrRepeetInYear3){
                this.gpa3Year = this.findGpaInYear(this.thredYearResults)
                console.log("second year gpa", this.gpa3Year);
              }
          }
     }

     if(this.forthtYearResults.length > 0){
        this.year4sem1sem2 = this.checkSemOneSemTwoinclude(this.forthtYearResults);      
          if(this.year4sem1sem2){
            this.absentOrRepeetInYear4 = this.checkResultHasRepeetOrAbsent(this.forthtYearResults);
            if(this.absentOrRepeetInYear4){
              this.gpa4Year = this.findGpaInYear(this.forthtYearResults)
              console.log("second year gpa", this.gpa4Year);
            }
          }
    }

    console.log("year1sem1sem2",this.year1sem1sem2);
     console.log("year2sem1sem2",this.year2sem1sem2);
      console.log("year3sem1sem2",this.year3sem1sem2);
       console.log("year4sem1sem2",this.year4sem1sem2);

  }

  checkSemOneSemTwoinclude(results: Result[]){
    let sem1 = false;
    let sem2 = false;
    let sem1sem2 = false;
    results.forEach(result => {
    let codeNumber = result.course.courseCode.match(/\d/g);
     switch(codeNumber[1]){
       case "1":
         sem1 = true;
         break;
         case "2":
         sem2 = true;
         break;         
     }
   });

   if(sem1 && sem2){
    sem1sem2 = true;
   }else{
     sem1sem2 = false;
   }

   return sem1sem2;
  }

  checkResultHasRepeetOrAbsent(results: Result[]){
    let repeetOrAbsent: any;
    results.forEach(result => {
    
    if(result.result === "E" || result.result == "abc"){
      repeetOrAbsent = false;
    }else{
      repeetOrAbsent = true;
    }

    })

    return repeetOrAbsent;
  }

  findGpaInYear(results: Result[]){
    let sumOfCredits: number = 0;
    let creditPoint: number =0;
    let cpGp: number = 0;
    let sumCpGp: number = 0;
    let gpa: number =0;
    let gradePoit: number = 0;
    results.forEach(result => {
     let codeNumber = result.course.courseCode.match(/\d/g);
     creditPoint = parseInt(codeNumber[2]);
    // console.log("credit poit **", codeNumber[2]);
     sumOfCredits+=creditPoint; 
     switch(result.result){
    
     case "A+":
        gradePoit = 4.00;
        break;
     case "A":
        gradePoit = 4.00;
        break;
     case "A-":
        gradePoit = 4.00;
        break;
    case "B+":
        gradePoit = 3.30;
        break;
    case "B":
        gradePoit = 3.00;
        break;
    case "B-":
        gradePoit = 2.70;
        break;
    case "C+":
        gradePoit = 2.30;
        break;
    case "C":
        gradePoit = 2.00;
        break;
     case "C-":
        gradePoit = 1.70;
        break;
    case "D+":
        gradePoit = 1.30;
        break;
    case "D":
        gradePoit = 1.00;
        break;
    case "E":
        gradePoit = 0.00;
        break;  
     }
 //console.log("gggggggggggg", gradePoit);
   cpGp= creditPoint * gradePoit;
   sumCpGp += cpGp;
    });

    // calculate gpa
    gpa = sumCpGp/sumOfCredits;
 console.log("first year gpa", gpa);
 console.log("number of credit point",sumOfCredits );
 console.log("number of credit point * gp",sumCpGp );
    return gpa;
   
  }

}
