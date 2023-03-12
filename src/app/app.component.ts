import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/** The class AppComponent is decorated with the UntilDestroy decorator, which automatically unsubscribes from observables when the component is destroyed. */
@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /** Get a reference to the MatSidenav component in the template */
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router) {}

  ngAfterViewInit() {
    /**
     * Observes the viewport width using BreakpointObserver. If the viewport width is less than or equal to 800px, it sets the MatSidenav mode to "over" and closes it. Otherwise, it sets the mode to "side" and opens it. This is to provide a responsive layout for the application.
     */
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

      /**
       * Listens to NavigationEnd events from the Router and checks if the MatSidenav mode is "over". If it is, it closes the MatSidenav. This is to ensure that the navigation menu is hidden on mobile devices when navigating to a new page.
       */
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
