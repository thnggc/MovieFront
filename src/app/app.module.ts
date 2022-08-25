import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { AllMoviesComponent } from './modules/movie/all-movies/all-movies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MovieDetailComponent } from './modules/movie/movie-detail/movie-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { RatingsComponent } from './modules/movie/ratings/ratings.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';

const routes: Routes = [
  { path: 'movies', component: AllMoviesComponent },
  { path: 'movie/:movieId', component: MovieDetailComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    AllMoviesComponent,
    MovieDetailComponent,
    RatingsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSortModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
