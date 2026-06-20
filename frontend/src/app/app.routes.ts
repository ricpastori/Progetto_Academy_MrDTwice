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
    title: 'Mr D Twice | Scopri i luoghi più belli d’Italia',
    data: { appShell: { tone: 'soft' } },
  },
  {
    path: 'chi-siamo',
    component: AboutPage,
    title: 'Chi siamo | Mr D Twice',
    data: { appShell: { tone: 'surface' } },
  },
  {
    path: 'regioni',
    component: RegionsPage,
    title: 'Regioni d’Italia | Mr D Twice',
    data: { appShell: { tone: 'soft' } },
  },
  {
    path: 'regioni/regione-dettaglio',
    component: RegionDetailPage,
    title: 'Dettaglio regione | Mr D Twice',
    data: { appShell: { tone: 'soft' } },
  },
  {
    path: 'regioni/regione-dettaglio/regione-tags',
    component: RegionTagPage,
    title: 'Luoghi della regione | Mr D Twice',
    data: { appShell: { layout: 'fluid', tone: 'soft' } },
  },
  {
    path: 'content',
    component: ContentDetails,
    title: 'Dettaglio luogo | Mr D Twice',
    data: { appShell: { tone: 'muted' } },
  },
  {
    path: '**',
    component: NotFoundPage,
    title: 'Pagina non trovata | Mr D Twice',
    data: { appShell: { tone: 'surface' } },
  },
];
