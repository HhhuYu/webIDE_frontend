import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl: string;
    constructor(private http: HttpClient) {
        this.baseUrl = environment.BASE_URL;
    }

    getAll() {
        return this.http.get<User[]>(`${this.baseUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${this.baseUrl}/users/${id}`);
    }
}