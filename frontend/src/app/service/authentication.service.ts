import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Task} from '../model/task.model';
import {Item} from '../model/item.model';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


@Injectable({
  providedIn: 'root'
})
export class AthenticationService {

  private host = 'http://localhost:8080';
  private jwtToken: string = null;
  private roles: Array<any> = [];

  constructor(private http: HttpClient) {
  }

  login(user) {
    return this.http.post(this.host + '/login', user, {observe: 'response'});
  }

  saveUser(user) {
    return this.http.post(this.host + '/register', user);
  }

  loadToken() {
    this.jwtToken = localStorage.getItem('token');
    if (this.jwtToken) {
      const jwtHelper = new JwtHelperService();
      this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
      return true;
    }

    return false;

  }

  saveToken(jwt: string) {
    this.jwtToken = jwt;
    localStorage.setItem('token', jwt);
    const jwtHelper = new JwtHelperService();
    this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  getLists() {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get(this.host + '/tasks', {headers: new HttpHeaders({Authorization: this.jwtToken})});
  }

  getList(id) {
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get<Task>(this.host + '/tasks/' + id, {headers: new HttpHeaders({Authorization: this.jwtToken})});
  }

  logout() {
    this.jwtToken = null;
    localStorage.removeItem('token');
  }


  svList(task) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    return this.http.post<Task>(this.host + '/tasks', task, {headers: new HttpHeaders({Authorization: this.jwtToken})});
  }

  eraseList(id: number) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    return this.http.delete(this.host + '/tasks/' + id, {headers: new HttpHeaders({Authorization: this.jwtToken})});
  }


  uptList(task) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    return this.http.put<Task>(this.host + '/tasks', task, {headers: new HttpHeaders({Authorization: this.jwtToken})});

  }

  svItem(item: Item, id: number) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    return this.http.post<Item>(this.host + '/items/addItem/' + id, item, {headers: new HttpHeaders({Authorization: this.jwtToken})});

  }

  getItem(id: number) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get<Item>(this.host + '/items/' + id, {headers: new HttpHeaders({Authorization: this.jwtToken})});

  }

  getAllitems(id: number) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.get<Item[]>(this.host + '/items/' + id, {headers: new HttpHeaders({Authorization: this.jwtToken})});

  }


  eraseOneItem(id: number) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.delete(this.host + '/items/' + id, {headers: new HttpHeaders({Authorization: this.jwtToken})});

  }

  done(id: number) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put<any>(this.host + '/items/markComplete/' + id, {headers: new HttpHeaders({Authorization: this.jwtToken})});

  }
  addLink(id: number, item: Item) {
    const headers = new HttpHeaders();
    headers.append('authorization', this.jwtToken);
    if (this.jwtToken == null) {
      this.loadToken();
    }
    return this.http.put<any>(this.host + '/items/addDependency/' + id, item, {headers: new HttpHeaders({Authorization: this.jwtToken})});

  }
}
