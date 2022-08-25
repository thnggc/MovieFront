import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  loadedMovie: Movie;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {
    this.loadedMovie = {};
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.loadData(paramMap?.get('movieId') || '');
    });
  }

  public loadData(movieId: string) {
    //case no id found
    if (this.loadData.length === 0) {
      this.loadedMovie = {};
    }
    // load movie data
    else {
      this.movieService.getMovie(movieId).subscribe({
        next: (movie: Movie) => {
          this.loadedMovie = movie;
        },
      });
    }
  }
}
