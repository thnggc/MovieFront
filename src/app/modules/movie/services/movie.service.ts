import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Constants } from 'src/app/constants/constants';
import { Movie } from '../models/movie';
import { Rating } from '../models/rating';
import { RatingInput } from '../models/ratingInput';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private httpClient: HttpClient, private constants: Constants) {}
  public getAllUsers() {
    return this.httpClient.get<User[]>(this.constants.baseUrl + '/users');
  }

  public getAllMovies() {
    return this.httpClient
      .get<Movie[]>(this.constants.baseUrl + '/movies')
      .pipe(
        map((movies) => {
          return movies.map((movie) => {
            return <Movie>{
              ...movie,
              overallRating: this.ratingElseUnrated(
                (movie?.ratings?.reduce(
                  (sum, { ratingScore }) => sum + ratingScore,
                  0
                ) || 0) / (movie?.ratings?.length || 1)
              ),
            };
          });
        })
      );
  }

  public getMovie(movieId: string) {
    return this.httpClient
      .get<Movie>(this.constants.baseUrl + '/movie/' + movieId)
      .pipe(
        map((movie) => {
          return <Movie>{
            ...movie,
            overallRating: this.ratingElseUnrated(
              (movie?.ratings?.reduce(
                (sum, { ratingScore }) => sum + ratingScore,
                0
              ) || 0) / (movie?.ratings?.length || 1)
            ),
          };
        })
      );
  }

  public saveRating(ratingInput: RatingInput) {
    return this.httpClient.post<Rating>(
      this.constants.baseUrl + '/rating',
      ratingInput
    );
  }

  private ratingElseUnrated(rating: number): string {
    if (rating !== 0) {
      return rating.toString();
    }
    return 'Unrated';
  }
}
