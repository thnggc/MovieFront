import { Rating } from "./rating";

export interface Movie{
    
        movieId? : number;
        movieName? : string
        movieYear?: number,
        genre?: string;
        movieDescription?: string;
        movieLink?: string;
        ratings? : Rating[]
    
}