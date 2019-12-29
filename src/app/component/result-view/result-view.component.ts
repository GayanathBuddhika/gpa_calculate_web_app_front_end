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
     totalCreditYear1: number;
     totalCreditYear2: number;
     totalCreditYear3: number;
     totalCreditYear4: number;

     finalGpa: number;
     calFianalGpa: boolean= false;
     msgAwardOfClass: string;

  constructor(
    private resultViewService: ResultViewService
  ) { }

  ngOnInit() {
   this.getResultByEpNumber();
  }

  //get result array by epa number and pass that data to related methode for find finalgpa
  getResultByEpNumber(){
     this.resultViewService.getResultByEpNumber("EP2032").subscribe(data => {
      this.results = data; 
      // pass this result array to this methode for catogarice results by year  
      this.catogariceSubjectsEyerBy(this.results);
      console.log(this.results);
      console.log(this.results[0].student.degreeProYear);
      console.log(this.firstYearResults.length);
      console.log(this.secondYearResults.length);
      console.log(this.thredYearResults.length);
      console.log(this.forthtYearResults.length);
    }, err => {

    });
 
  // find gpa for first year
        if(this.firstYearResults.length > 0){
          // pass first year results to this methode for find there has sem1 and sem2 result
          this.year1sem1sem2 = this.checkSemOneSemTwoinclude(this.firstYearResults);
            if(this.year1sem1sem2){
                // pass first year result to this methode for find there has repeeted subjects or absent subjects
                this.absentOrRepeetInYear1 = this.checkResultHasRepeetOrAbsent(this.firstYearResults);
                if(this.absentOrRepeetInYear1){  
                  // fass first year results to this methode for find first year gpa                
                  this.gpa1Year = this.findGpaInYear(this.firstYearResults);                
                  console.log("first year gpa", this.gpa1Year);
                }
            }
     
        }

  // find gpa for second  year
     if(this.secondYearResults.length > 0){
       // pass second year results to this methode for find there has sem1 and sem2 result
       this.year2sem1sem2 = this.checkSemOneSemTwoinclude(this.secondYearResults);
          if(this.year2sem1sem2){
             // pass second year result to this methode for find there has repeeted subjects or absent subjects
            this.absentOrRepeetInYear2 = this.checkResultHasRepeetOrAbsent(this.secondYearResults);
            if(this.absentOrRepeetInYear2){
               // fass second year results to this methode for find second year gpa
              this.gpa2Year = this.findGpaInYear(this.secondYearResults)
              console.log("second year gpa", this.gpa2Year);
            }
          }
    }

// find gpa for therd  year
     if(this.thredYearResults.length > 0){
       // pass therd year results to this methode for find there has sem1 and sem2 result
        this. year3sem1sem2 = this.checkSemOneSemTwoinclude(this.thredYearResults);         
          if(this.year3sem1sem2){
             // pass therd year result to this methode for find there has repeeted subjects or absent subjects
             this.absentOrRepeetInYear3 = this.checkResultHasRepeetOrAbsent(this.thredYearResults);
              if(this.absentOrRepeetInYear3){
                // fass therd year results to this methode for find therd year gpa
                this.gpa3Year = this.findGpaInYear(this.thredYearResults)
                console.log("thred year gpa", this.gpa3Year);
              }
          }
     }

// find gpa for fourth  year
     if(this.forthtYearResults.length > 0){
        // pass fourth year results to this methode for find there has sem1 and sem2 result
        this.year4sem1sem2 = this.checkSemOneSemTwoinclude(this.forthtYearResults);      
          if(this.year4sem1sem2){
             // pass fourth year result to this methode for find there has repeeted subjects or absent subjects
            this.absentOrRepeetInYear4 = this.checkResultHasRepeetOrAbsent(this.forthtYearResults);
            if(this.absentOrRepeetInYear4){
               // fass fourth year results to this methode for find fourth year gpa
              this.gpa4Year = this.findGpaInYear(this.forthtYearResults)
              console.log("forth year gpa", this.gpa4Year);
            }
          }
    }

    console.log("year1sem1sem2",this.year1sem1sem2);
     console.log("year2sem1sem2",this.year2sem1sem2);
      console.log("year3sem1sem2",this.year3sem1sem2);
       console.log("year4sem1sem2",this.year4sem1sem2);

    //calculate gpa for 3 year degree program student
    if(this.results[0].student.degreeProYear === 3){
      if(this.absentOrRepeetInYear1 && this.absentOrRepeetInYear2 && this.absentOrRepeetInYear3){
        this.calculateFinalGpaForThreeYeardf();
      }
    }
      //calculate gpa for 4 year degree program student
    if(this.results[0].student.degreeProYear === 4){
      if(this.absentOrRepeetInYear1 && this.absentOrRepeetInYear2 && this.absentOrRepeetInYear3 && this.absentOrRepeetInYear4){
        this. calculateFinalGpaForFourYeardf();
      }
    }


  }


// categorize result for years by using subject code
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

    });
    
  }

  // check that pased result set has sem1 and sem2 subjects
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

 // check that passed result set has absent or repeeted subject
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

// find gpa for year
  findGpaInYear(results: Result[]){
     let sumOfCredits: number = 0;
     let creditPoint: number =0;
    let cpGp: number = 0;
    let sumCpGp: number = 0;
    let gpa: number =0;
    let gradePoit: number = 0;
    results.forEach(result => {
      let codeNumber = result.course.courseCode.match(/\d/g);
      // get credit for a subject by using code number
      creditPoint = parseInt(codeNumber[2]);  
      // get total creadit point
      sumOfCredits+=creditPoint; 
     // assing total credit for related year
     switch(codeNumber[0]){
       case "1":
       this.totalCreditYear1 = sumOfCredits;
       break;
       case "2":
       this.totalCreditYear2 = sumOfCredits;
       break;
       case "3":
       this.totalCreditYear3 = sumOfCredits;
       break;
       case "4":
       this.totalCreditYear4 = sumOfCredits;
       break;
       
     }

     // get grate point for a subject by result
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
   // get (credit point * grade point) for a subject 
   cpGp= creditPoint * gradePoit;
   // get total value of (credit point * grade point) 
   sumCpGp += cpGp;
    });

    // calculate gpa
    gpa = sumCpGp/sumOfCredits;

    return gpa;
   
  }

// calculate gpa for three year degree program
  calculateFinalGpaForThreeYeardf(){
    
    let sumOfatp = 0.3*this.totalCreditYear1*this.gpa1Year + 0.3*this.totalCreditYear2*this.gpa2Year + 0.4*this.totalCreditYear3*this.gpa3Year ;
    let sumOfat = 0.3*this.totalCreditYear1 + 0.3*this.totalCreditYear2 + 0.4*this.totalCreditYear3;

    this.finalGpa = sumOfatp/sumOfat;
    this.calFianalGpa = true;
    console.log("final gpa for three year ", this.finalGpa)

  }

  // calculate gpa for four year degree program
  calculateFinalGpaForFourYeardf(){
    
    let sumOfatp = 0.2*this.totalCreditYear1*this.gpa1Year + 0.2*this.totalCreditYear2*this.gpa2Year + 0.3*this.totalCreditYear3*this.gpa3Year + 0.3*this.totalCreditYear4*this.gpa4Year;
    let sumOfat = 0.2*this.totalCreditYear1 + 0.2*this.totalCreditYear2 + 0.3*this.totalCreditYear3 + 0.3*this.totalCreditYear4;

    this.finalGpa = sumOfatp/sumOfat;
    this.calFianalGpa = true;
    console.log("final gpa for four year ", this.finalGpa)

  }

  // awardOfClasses(){
   
  //  if(this.finalGpa >= 3.7)
  //   this.msgAwardOfClass = "FIRST CLASS";
  //  }else(){


  //  }
  // }

}
