import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.jpeg';
  selectedImage: any;
  categories!: Array<any>;
  postForm: FormGroup;
  post: any;
  formStatus: string = 'Add New';
  docId!: any;

  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((val: any) => {
      this.postService.loadDataOneData(val.id).subscribe((post) => {
        this.route.queryParams.subscribe((val: any) => {
          this.docId = val.id;
          this.postService.loadDataOneData(val.id).subscribe((post) => {
            this.post = post;

            this.postForm = this.fb.group({
              title: [
                this.post.title,
                [Validators.required, Validators.minLength(10)],
              ],
              permalink: [this.post.permalink, Validators.required],
              excerpt: [
                this.post.excerpt,
                [Validators.required, Validators.minLength(50)],
              ],
              category: [
                `${this.post.category.categoryId}-${this.post.category.category}`,
                Validators.required,
              ],
              postImg: ['', Validators.required],
              content: [this.post.content, Validators.required],
            });
            this.imgSrc = this.post.postImgPath;
            this.formStatus = 'Edit';
          });
        });
      });
    });

    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      permalink: ['', [Validators.required]],
      excerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
      postImg: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.categoriesService.loadData().subscribe((val) => {
      this.categories = val;
    });
  }

  get fc() {
    return this.postForm.controls;
  }

  onTitleChanged($event: any) {
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-');
    console.log(this.permalink);
  }

  showPreview($event: any): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImage = $event.target.files[0];
  }

  onSubmit() {
    const splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      category: {
        categoryId: splitted[0],
        category: splitted[1],
      },
      postImgPath: '',
      excerpt: this.postForm.value.excerpt,
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date(),
    };
    this.postService.uploadImage(
      this.selectedImage,
      postData,
      this.formStatus,
      this.docId
    );
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.jpeg';
  }
}
