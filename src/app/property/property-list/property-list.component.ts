
import { Component, OnInit } from '@angular/core';
import { HousingService } from '../../services/housing.service';
import { IProperty } from './IProperty.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties: Array<IProperty> = [];


  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit() {
    this.getProperties();
    
  }

  getProperties() {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }








    this.housingService.getAllProperties(this.SellRent).subscribe(
      (result) => {
        this.properties = result;
        const newProperty = JSON.parse(localStorage.getItem('newProp'));

        if (newProperty.SellRent === this.SellRent) {
          this.properties = [newProperty, ...this.properties];
        }
        console.log(result);
        console.log('Executed succss');
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'propertymanagement.client';

}
