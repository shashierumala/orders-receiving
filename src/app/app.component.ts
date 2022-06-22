import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from './services/error-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'receiving';
  empId!: string;
  displayError = false;
  error!: string;
  isLight = true;
  themeName = 'light-theme';
  constructor(
    public router: Router,
    private errorService: ErrorHandlerService
  ) {
    const theme = localStorage.getItem('theme');
    if(theme !== null){
      this.isLight = theme === 'light' ?  false : true
      this.toggleButton();
    }
  }

  ngOnInit(): void {
    // const isDarkMode:string = localStorage.getItem('isDark') || '';

    // let themeElement = document.getElementById('theme-css');
    // themeElement?.setAttribute(
    //   'href',
    //   'assets/themes/' + this.themeName + '.css'
    // );
    // var element = document.body;
    // element.classList.toggle('body-background-dark');
    this.errorService.errorMessage$.subscribe((val) => {
      if (val !== '') {
        this.error = val;
        this.displayError = true;
      }
    });
  }

  onLogout() {
    localStorage.removeItem('EmployeeID');
    localStorage.removeItem('DIST');
    localStorage.removeItem('EMPSystemName');
    localStorage.removeItem('tag-summary');
    localStorage.removeItem('tag-list');
    this.router.navigate(['/login']);
  }

  toggleButton() {
    this.isLight = !this.isLight;
    this.themeName = this.isLight ? 'light-theme' : 'dark-theme';
    let themeElement = document.getElementById('theme-css');
    themeElement?.setAttribute(
      'href',
      'assets/themes/' + this.themeName + '.css'
    );
    var element = document.body;
    // const className = this.isLight ? 'body-background-light' : 'body-background-dark'
   // element.classList.toggle('body-background-dark');
    localStorage.setItem('theme', this.isLight ? 'light' : 'dark');
    console.log('themename', this.themeName)
    // if(this.themeName == 'dark-theme') {
    // localStorage.setItem('isDark', 'dark');
    // } else {
    //   localStorage.removeItem('isDark');
    // }
  }
}
