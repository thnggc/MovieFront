import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  Component,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
    'movieName',
    'movieYear',
    'genre',
    'movieDescription',
    'overallRating',
  ];
  pageOptions: number[] = [15, 30, 45];
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private movieService: MovieService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadData(): void {
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

  ngOnInit(): void {
    this.loadData();
  }

  updateDataSource(movies: Movie[]): void {
    this.dataSource.data = movies;
  }

  public onRowSelected(row: Movie) {
    this.router.navigate(['/movie', row.movieId]);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
