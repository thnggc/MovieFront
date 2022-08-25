export class RatingInput {
  movieId: number;
  userId: number;
  rating: {
    ratingComment: string;
    ratingScore: number;
  };
  constructor(obj: any) {
    this.movieId = obj.movieId;
    this.userId = obj.userId;
    this.rating = {
      ratingComment: obj.ratingComment,
      ratingScore: obj.ratingScore,
    };
  }
}
