import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { BtnState } from 'src/app/model/project';




@Component({
  selector: 'app-todo-button',
  templateUrl: './todo-button.component.html',
  styleUrls: ['./todo-button.component.scss'],
})
export class TodoButtonComponent implements OnInit, OnDestroy {
  /**
   * EventEmitter for when there is a change in status
   */
  @Output() statusChange = new EventEmitter<BtnState>();
  @Input() btnState$!: BehaviorSubject<BtnState>;
  btnState$$!: Subscription;

  countDown!: number;
  /**
   * Current state of Button
   */
  btnStatus!: BtnState;
  btnText!: string;
  btnState = BtnState;

  constructor(
  ) {  }

  /**
   * Setter function to set the current button state and perform the necessary action
   *
   * @param val
   */
  set status(val: any) {
    this.btnStatus = val;
    this.statusChange.emit(this.btnStatus);
    if (this.btnStatus === BtnState.loadedAndDelaying) {
      this.countDownMethod();
      this.btnText = 'wait';
    }
    else if(this.btnStatus === BtnState.loaded) {
      this.btnText = 'reload';
    }
    else if(this.btnStatus === BtnState.loading) {
      this.btnText = 'loading';
    }
    else if(this.btnStatus === BtnState.error) {
      this.btnText = 'Load Error.Retry';
    }
  }

  ngOnInit() {
    this.btnState$$ = this.btnState$.subscribe((btnState: BtnState) => {
      this.status = btnState;
    });
  }

  /**
   * Counts down till the provided duration
   *
   * @param duration
   */
  countDownMethod(duration: number = 11) {
    interval(1000)
    .pipe(
      take(duration),
      map(count => duration - count - 1)
      )
      .subscribe(seconds => {
        this.countDown = seconds;
        if(seconds === 0) {
          this.status = BtnState.loaded;
        }
    });
  }

  /**
   * On click handler for TodoButton
   */
  onStateChange() {
    this.status = BtnState.loading;
  }

  ngOnDestroy() {
    this.btnState$$.unsubscribe();
  }
}
