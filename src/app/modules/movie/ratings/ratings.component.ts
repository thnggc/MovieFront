import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movie';
import { Rating } from '../models/rating';
import { RatingInput } from '../models/ratingInput';
import { User } from '../models/user';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss'],
})
export class RatingsComponent implements OnInit {
  constructor(private movieService: MovieService, private fb: FormBuilder) {}
  @Input()
  public movie!: Movie;

  @Output()
  public onSaveEvent: EventEmitter<number> = new EventEmitter();
  public users!: User[];
  public scores: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public form: FormGroup;

  ngOnInit(): void {
    this.loadUsers();
    this.form = this.fb.group({
      userId: [, Validators.required],
      movieId: [this.movie?.movieId, Validators.required],
      ratingComment: ['', Validators.required],
      ratingScore: [, Validators.required],
    });
  }

  private loadUsers(): void {
    this.movieService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
    });
  }

  public save(): void {
    this.movieService
      .saveRating(
        new RatingInput({
          ...this.form.getRawValue(),
          movieId: this.movie.movieId,
        })
      )
      .subscribe({
        next: () => {
          this.form.reset();
          this.onSaveEvent.emit(this.movie.movieId);
        },
      });
  }
}
