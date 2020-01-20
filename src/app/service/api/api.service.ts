import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../constant.service';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(
    private http: HttpClient,
    private constantSvc: ConstantService
  ) { }


  getService(url): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(this.constantSvc.APIBaseURL + url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }


  mapService(url): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }


  postService(url, data): Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      this.http.post(this.constantSvc.APIBaseURL + url, data)
        .subscribe(res => {
            observer.next(res);
            observer.complete();
          },
          err => {
            observer.complete();
          }
        );
    });
  }

  getJson(name){
    let url = "./assets/json/image_json/"+name+".json";
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }

  getNlpJson(name){
    let url = "./assets/json/nlp_json/"+name+".json";
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }

  getNlpAudioJson(name){
    let url = "./assets/json/nlp_json/"+name+"_audio.json";
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }


  getVideoanalyze(name){
    let url = "./assets/json/video_json/"+name+".json";
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }

  gettextAnnotation(sdf){
    let url = "./assets/json/test_redability/text_readbility_stats.json";
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }


  gettextCoverageAnnotation(dd){
    let url = "./assets/json/text_coverage_json/text_coverage_area.json";
    return new Observable<any>((observer: Observer<any>) => {
      this.http.get(url).subscribe((res) => {
        observer.next(res);
        observer.complete();
      },(err) => {
        observer.complete();
      });
    });
  }
  

}
