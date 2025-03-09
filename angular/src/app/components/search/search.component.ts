import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  constructor(private router: Router){}

  doSeach(searchText: string){
    this.router.navigateByUrl(`/search/${searchText}`);
  }
}
