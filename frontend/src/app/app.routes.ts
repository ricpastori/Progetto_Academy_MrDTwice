import { Routes } from '@angular/router';
import { HomePage } from './features/page/home-page/home-page';
import { NotFoundPage } from './features/page/not-found-page/not-found-page';
import { PlaceDetailPage } from './features/page/place-detail-page/place-detail-page';
import { RegionDetailPage } from './features/page/region-detail-page/region-detail-page';
import { RegionsPage } from './features/page/regions-page/regions-page';
import { AboutPage } from './features/page/about-page/about-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'chi-siamo',
    component: AboutPage,
  },
  {
    path: 'regioni',
    component: RegionsPage,
  },
  {
    path: 'regioni/:id',
    component: RegionDetailPage,
  },
  {
    path: 'luoghi/:id',
    component: PlaceDetailPage,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
