import { Component, Injectable, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { User } from '../../models/user';
import { MovieService } from '../services/movie.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
})
export class AllMoviesComponent implements OnInit {
  users?: User[];
  private subscription : Subscription[] = [];
  page : number
  pageSize : number;
  collectionSize :number;
  movies? : Movie[];
  moviesView?: Movie[];
  constructor(private movieService : MovieService ){
    this.page = 1;
    this.pageSize = 10;
    this.collectionSize = 0;

  }
  

  ngOnInit(): void {
    this.subscription.push(this.movieService.getAllUsers().subscribe(
      {
        next: (users : User[]) => {
          this.users = users
        }
      }
    ))

    this.subscription.push(
      this.movieService.getAllMovies().subscribe({
        next: (movies : Movie[]) => {
          this.movies = movies;
          this.collectionSize = movies.length;
          this.refreshMovieView()
        }
      })
    )
  }

  public refreshMovieView() : void{
    this.moviesView = this.movies?.map((country, i) => ({id: i + 1, ...country}))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  public printInfo(movie : Movie): void{
    console.log(movie)
  }
  
}


