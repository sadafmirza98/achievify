import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './users.model';
import { map } from 'rxjs/operators';

const baseUrl = 'tps://achievify-d7672-default-rtdb.asia-southeast1.firebasedatabase.app/goals.json';
//const userUrl = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  addUser(id: string, title: string, body: string) {
    const userData = { id: id, title: title, body: body };
    return this.http.post(baseUrl, userData);
  }
  fetchUsers() {
    return this.http.get<Record<string, Users>>(baseUrl).pipe(
      map((responseData: Record<string, Users>) => {
        const usersArray: Users[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            usersArray.push({ ...responseData[key] });
          }
        }
        return usersArray;
      })
    );
  }
  

  updateUsers(id: string, title: string, body: string) {
    const newUser = [
      {
        id: id,
        title: title,
        body: body,
      },
    ];
    return this.http.put(baseUrl, newUser);
  }

  deleteUsers() {
    return this.http.delete(baseUrl);
  }
}
