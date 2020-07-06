import { Component , OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import notify from 'devextreme/ui/notify';
import { map } from 'rxjs/operators';
type NewType = boolean;

type textstring = string;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'msm';
  public editorValueType: any;
  public isMultiline: NewType = true;
  public bindingProperty: textstring = 'Some value';
  public pageName: string;
  public controlNme: any;
  public myForm: FormGroup;
  public content: any = '' ;
  public namePattern: any;
  public pagelList: string[];

  constructor( private http: HttpClient ) {

  }
  public submit(): void {
const params = {pagename : this.pageName , controlName : this.controlNme , content : this.editorValueType };
let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Accept', 'application/json');
headers = headers.append('Access-Control-Allow-Origin', '*' );
headers = headers.append('responseType' , 'text');

 // const headers = new HttpHeaders({'Content-Type' : 'application/json' , 'Access-Control-Allow-Origin': '*' });
this.http.post<string>('http://localhost:8080/api/controlCreation' , params , {headers}  ).subscribe((data: any) => {
  console.log(data);
  // if (data.status) {
  notify({
        message: 'Data is saved successfully ',
        position: {
            my: 'center top',
            at: 'center top',
        },
    }, 'success', 3000);
 // }
  });
}
// tslint:disable-next-line:use-lifecycle-interface
public ngOnInit(): void {
  this.pagelList = ['page1' , 'page2' , 'page3'];
}
 public richTChange(value): void {
 // this.content = value;
}
  public onValueChanged(e: any): void {
    this.pageName = e.value;
    this.getPageDetails(e.value);
  }

  public getPageDetails(value): void {
  const params = {pagename : value};
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  headers = headers.append('Access-Control-Allow-Origin', '*' );
  this.http.post<string>('http://localhost:8080/api/getpageDetails' , params , {headers}).subscribe((data: any) => {
   console.log(data);
   this.controlNme = data.controlName;
   this.editorValueType = data.content;

  // tslint:disable-next-line:arrow-parens
  }, error => {
    notify({
      message: 'No Data exist',
      position: {
          my: 'center top',
          at: 'center top',
      },
  }, 'warning', 2000);
  }) ;
  }

 public onFormSubmit(e): void {
  e.preventDefault();
  this.submit();

  }
}
