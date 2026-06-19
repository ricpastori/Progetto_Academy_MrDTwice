import { Routes } from '@angular/router';
import { HomePage } from './features/page/home-page/home-page';
import { NotFoundPage } from './features/page/not-found-page/not-found-page';
import { ContentDetails } from './features/page/content-details/content-details';
import { RegionDetailPage } from './features/page/region-detail-page/region-detail-page';
import { RegionsPage } from './features/page/regions-page/regions-page';
import { AboutPage } from './features/page/about-page/about-page';
import { RegionTagPage } from './features/page/region-tag-page/region-tag-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    data: { appShell: { tone: 'soft' } },
  },
  {
    path: 'chi-siamo',
    component: AboutPage,
    data: { appShell: { tone: 'surface' } },
  },
  {
    path: 'regioni',
    component: RegionsPage,
    data: { appShell: { tone: 'soft' } },
  },
  {
    path: 'regioni/regione-dettaglio',
    component: RegionDetailPage,
    data: { appShell: { tone: 'soft' } },
  },
  {
    path: 'regioni/regione-dettaglio/regione-tags',
    component: RegionTagPage,
    data: { appShell: { layout: 'fluid', tone: 'soft' } },
  },
  {
    path: 'content',
    component: ContentDetails,
    data: { appShell: { tone: 'muted' } },
  },
  {
    path: '**',
    component: NotFoundPage,
    data: { appShell: { tone: 'surface' } },
  },
];
