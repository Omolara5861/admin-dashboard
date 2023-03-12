import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { environment } from 'src/environments/environment';

/**This is an Angular component that defines the functionality of a gallery of images. It uses an Unsplash API service to fetch the images and also provides a search functionality that filters the images based on a keyword. */
@Component({
  selector: 'app-gallary',
  templateUrl: './gallary.component.html',
  styleUrls: ['./gallary.component.scss']
})
export class GallaryComponent implements OnInit {
//Property that stores the fetched images and display them to the Ui
  imageLists: any;

  //Property used to search for images. Images that match this property would be returned
  keyword: string =  '';


  constructor(private apiService: ApiService,
    private http: HttpClient,
    private notifier: NotifierService) { }

  ngOnInit() {
    /** Call getImage() method from the ApiService and assign the images fetched to @imageList property*/
    this.apiService.getImage().subscribe((res: any) => {
      this.imageLists = res;
    });
  }


/**
 * This method is called when the user enters a keyword in the search box. It uses the HttpClient to make a GET request to the Unsplash API, passing in the client_id and query parameters. If the request is successful, the response is assigned to the imageLists property, filtered based on the keyword entered by the user. If the request fails, an error notification is shown using the NotifierService.
 */
  searchImages() {
    return this.http.get(
      `https://api.unsplash.com/search/photos?client_id=${environment.key}&query=${this.keyword}`).subscribe(
        (res: any) => {
          if (res) {
            this.imageLists=res.results;
            console.log(res.results);
          }
        },
        (err: any) => {
          this.notifier.showNotification('An error occurred while fetching the images', 'OK', 'error');
          console.log(err);
        }
      );
  }
}
