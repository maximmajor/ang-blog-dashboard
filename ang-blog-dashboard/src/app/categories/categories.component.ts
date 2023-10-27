import { Category } from './../models/category';
import { CategoriesService } from './../services/categories.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryArray!: Array<any>;
  formCategory!: string
  formStatus = 'Add'
  categoryId!: string

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit(formData: any) {
    let categoryData: Category = {
      category: formData.value.category,
    };


    if (this.formStatus == 'Add') {
      this.categoriesService.saveDate(categoryData);
      formData.reset();
    }
    else if (this.formStatus == 'Edit') {
      this.categoriesService.updateDate(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add'
    }


  }

  onEdit(category: any, categoryId: any) {
    console.log(category)
    this.formCategory = category
    this.formStatus = 'Edit'
    this.categoryId = categoryId
  }

  onDelete(categoryId: any) {
    this.categoriesService.deleteDate(categoryId);
    this.formStatus = 'Add'
  }
}
