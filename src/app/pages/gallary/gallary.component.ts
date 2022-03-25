import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {

 imageLists: any;
 keyword: string = '';


  constructor(private apiService: ApiService,
    private http : HttpClient,
    private notifier: NotifierService) {}

  ngOnInit() {
    this.apiService.getImage().subscribe((res: any) => {
      this.imageLists = res;
      console.log(res);
    });
  }

  searchImages() {

    return this.http.get(
      `https://api.unsplash.com/search/photos?client_id=${environment.key}&query=${this.keyword}`).subscribe(
      (res: any) => {
        if(res) {
      this.imageLists = res.results;
      console.log(res.results);
        }
      },
      (err: any) => {
        this.notifier.showNotification('An error occured while fetching the images', 'OK', 'error');
        console.log(err);
      }
    );
  }
}
