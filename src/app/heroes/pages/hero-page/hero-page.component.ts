import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        // delay(3000),
        switchMap( ({ id }) => this.heroesService.getHeroById( id )),
      )
      .subscribe( hero => {

        if (!hero) return this.router.navigate([ '/heroes/list' ]);

        this.hero = hero;
        console.log({hero});
        return;
      })

  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }

}
