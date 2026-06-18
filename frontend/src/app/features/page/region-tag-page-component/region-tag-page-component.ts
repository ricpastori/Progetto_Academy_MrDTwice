import { Component, effect, inject} from '@angular/core';
import { Content, ContentService } from '../../../services/content-service';
import { CardContentComponent } from '../../component/card-content-component/card-content-component';
from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-region-tag-page-component',
  imports: [CardContentComponent],
  templateUrl: './region-tag-page-component.html',
  styleUrl: './region-tag-page-component.css',
})
export class RegionTagPageComponent {


}
