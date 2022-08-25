import { User } from './user';

export interface Rating {
  ratingId?: number;
  ratingScore: number;
  ratingComment?: number;
  movieUser?: User;
}
