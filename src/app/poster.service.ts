import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Poster } from './poster';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PosterService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private _postersUrl = 'api/posters';
  private _ownPostersUrl = 'api/ownposters';
  private _imagesUrl = 'api/images';

  // private _postersUrl = 'http://localhost:8080/api/posters';
  // private _ownPostersUrl = 'http://localhost:8080/api/ownposters';
  // private _imagesUrl = 'http://localhost:8080/api/images';

  constructor(private http: HttpClient, private _authService: AuthService) { }

  createPoster(poster:Poster) {
    poster.datetime = new Date();
    return this.http.post<any>(this._postersUrl, poster);
  }

  deletePoster (poster: Poster | string){
    const _id = typeof poster === 'string' ? poster : poster._id;
    const url = `${this._postersUrl}/${_id}`;
    return this.http.delete<Poster>(url);
  }

  getPoster(_id) {
    const url = `${this._postersUrl}/${_id}`;
    return this.http.get<any>(url);
  }

  getPosters() {
    return this.http.get<any>(this._postersUrl);
  }

  getOwnPosters(userId) {
    const req = {"userId": userId}
    return this.http.post<any>(this._ownPostersUrl, req);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updatePosters(_id, poster): Observable<any> {
     return this.http.put<any>(this._postersUrl, poster);
  }

  updatePoster(_id: string, poster: Poster): Observable<any> {
    const url = `${this._postersUrl}/${_id}`;
    return this.http.put(url, poster, this.httpOptions).pipe(
      catchError(this.handleError<any>('updatePoster'))
    );
  }

  //upload an image with poster id as one of its identifier
  uploadImage(imageFile: File, poster) {
    const formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    formData.append('posterId', poster._id);
    return this.http.post<any>(this._imagesUrl, formData);
  }

  deleteImage(imgId) {
    const url = `${this._imagesUrl}/${imgId}`;
    return this.http.delete(url);
  }
}
