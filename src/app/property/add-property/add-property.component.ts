import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HousingService } from '../../services/housing.service';
import { IProperty } from '../property-list/IProperty.interface';
import { Property } from '../../model/property';


@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent implements OnInit {
/*  property: any = {};*/
  //@ViewChild('Myform') addPropertyForm!: NgForm;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();

    // Will come from masters
    propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
    furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']
    
    propertyView: IProperty = {
      Id: null,
      Name: '',
      Price: null,
      SellRent: null,
      Type: null
    };

  constructor( private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService ) {
   
   }
  

  ngOnInit() {
    this.CreateAddPropertyForm();
  }

  CreateAddPropertyForm() {
      this.addPropertyForm = this.fb.group({
        SellRent: ['1' , Validators.required],
        Type: [null, Validators.required],
        Name: [null, Validators.required],
        Price: [null, Validators.required]
      });
  }
 /* onSubmit(Myform: NgForm) {*/
  //console.log(Myform);
  onSubmit() {
    console.log(this.addPropertyForm);
    this.nextClicked = true;
    this.mapProperty();
    if(this.property.Name != ""){
    this.housingService.addProperty(this.property)
    this.router.navigate(['/sell-property']);
    }
  }

  mapProperty(): void {
    this.property.SellRent = 1;
    this.property.Type = this.Type.value;
    this.property.Name = this.Name.value;
    this.property.Price = this.Price.value;
  }
 /*  goBack() {
    this.route.navigate(['/']);
  } */

  get Type() {
    return this.addPropertyForm.get('Type') as FormControl;
  }

  get Name() {
    return this.addPropertyForm.get('Name') as FormControl;
  }

  get Price() {
    return this.addPropertyForm.get('Price') as FormControl;
  }
}

