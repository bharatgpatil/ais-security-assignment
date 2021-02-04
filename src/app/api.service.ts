import {
  Injectable
} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  uri = 'http://localhost:4400';

  constructor(private http: HttpClient) {}

  getDomains() {
      return this.http.get(`${this.uri}/domains`);
  }

  
  getUrls() {
      return this.http.get(`${this.uri}/urls`);
  }

}