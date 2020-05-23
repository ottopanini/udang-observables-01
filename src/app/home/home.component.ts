import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';

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
        count++;
      }, 1000);
    });

    this.firstSubscription = observable.subscribe(data => console.log(data));
  }

  ngOnDestroy(): void {
    if (this.firstSubscription) {
      this.firstSubscription.unsubscribe();
    }
  }

}
