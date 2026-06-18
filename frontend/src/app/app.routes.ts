import { Routes } from '@angular/router';
import { HomePage } from './features/page/home-page/home-page';
import { NotFoundPage } from './features/page/not-found-page/not-found-page';
import { PlaceDetailPage } from './features/page/place-detail-page/place-detail-page';
import { RegionDetailPage } from './features/page/region-detail-page/region-detail-page';
import { RegionsPage } from './features/page/regions-page/regions-page';
import { AboutPage } from './features/page/about-page/about-page';
import { RegionTagPage} from './features/page/region-tag-page/region-tag-page';

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
    path: 'regioni/regione-dettaglio',
    component: RegionDetailPage,
  },
  {
    path: 'regioni/regione-dettaglio/regione-tags',
    component: RegionTagPage,
  },

  {
    path: 'luoghi',
    component: PlaceDetailPage,
  },
  {
    path: '**',
    component: NotFoundPage,
  },
];
