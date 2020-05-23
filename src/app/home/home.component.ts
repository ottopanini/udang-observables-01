import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const observable: Observable<any> = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstSubscription = observable
      .pipe(map(data => 'Round: ' + (data + 1)))
      .subscribe(
      data => console.log(data),
      error => alert(error.message),
      () => console.log('completed'));
  }

  ngOnDestroy(): void {
    if (this.firstSubscription) {
      this.firstSubscription.unsubscribe();
    }
  }

}
