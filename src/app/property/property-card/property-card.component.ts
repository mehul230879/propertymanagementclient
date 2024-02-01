import { Component, Input } from '@angular/core';
import { IProperty } from '../property-list/IProperty.interface';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {

  @Input() Property: IProperty | undefined;

  //Property: any = {
  //  "Id": 1,
  //  "Name": "Patel House",
  //  "Type": "House",
  //  "Price":20000
  //}
}
