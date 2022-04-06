import {
  AfterViewInit,
  Component,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Movie } from '../models/movie';
import { User } from '../models/user';
import { MovieService } from '../services/movie.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-all-movies',
  templateUrl: './all-movies.component.html',
  styleUrls: ['./all-movies.component.scss'],
})
export class AllMoviesComponent implements OnInit, AfterViewInit {
  users?: User[];
  private subscription: Subscription[] = [];
  dataSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();
  displayedColumns: string[] = [
    'movieId',
    'movieName',
    'movieYear',
    'genre',
    'movieDescription',
    'overallRating',
  ];
  pageOptions: number[] = [15, 30, 45];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private movieService: MovieService) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.subscription.push(
      this.movieService.getAllUsers().subscribe({
        next: (users: User[]) => {
          this.users = users;
        },
      })
    );

    this.subscription.push(
      this.movieService.getAllMovies().subscribe({
        next: (movies: Movie[]) => {
          this.updateDataSource(movies);
        },
      })
    );
  }

  updateDataSource(movies: Movie[]): void {
    this.dataSource.data = movies;
  }

  public onRowSelected(row: Movie) {
    console.log(row);
  }
}
