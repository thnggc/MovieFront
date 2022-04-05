import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Constants } from "src/app/constants/constants";
import { Movie } from "../../models/movie";
import { User } from "../../models/user";

@Injectable({ providedIn: 'root' })
export class MovieService{

    constructor(
        private httpClient : HttpClient,
        private constants : Constants
    ){

    }
    public getAllUsers() {
        return this.httpClient.get<User[]>(this.constants.baseUrl + "/users")
    }

    public getAllMovies() {
        return this.httpClient.get<Movie[]>(this.constants.baseUrl + "/movies")
    }
}