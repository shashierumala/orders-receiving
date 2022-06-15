import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './services/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'orders-receiving';
  empId!: string
  displayError = false;
  error!: string;
  isLight = true;
themeName= 'light-theme'
  constructor( public router:Router, private errorService: ErrorHandlerService) { }

  ngOnInit(): void {
    this.errorService.errorMessage$.subscribe(val=>{
      if(val !== ''){
        this.error = val;
       this.displayError = true;
      }
    })
  }

  onLogout(){
    localStorage.removeItem('EmployeeID');
    localStorage.removeItem('DIST');
    localStorage.removeItem('EMPSystemName')
    localStorage.removeItem('order-summary');
    localStorage.removeItem('order-Info');
    this.router.navigate(['/login'])
  }

  toggleButton() {
    this.isLight = !this.isLight;
   
    this.themeName = this.isLight ? 'light-theme' : 'dark-theme';
   let themeElement = document.getElementById('theme-css');
   themeElement?.setAttribute('href', 'assets/themes/' +  this.themeName + '.css')
   console.log('assets/themes/' +  this.themeName + '.css')
    var element = document.body;
    element.classList.toggle("theme-background");
    //   console.log('testing dark mode', element)
  }

}
