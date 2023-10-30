import { PostsService } from 'src/app/services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit{

  postArray!: Array<any>

constructor(private postService: PostsService,){

}  ngOnInit(): void {
    this.postService.loadData().subscribe(val => {
      console.log(val);
      this.postArray = val;
    })
  }

  onDelete(postImgPath: string, id: any){
    this.postService.deleteImage(postImgPath, id)

  }

  onFeatured(id: any, value: any){
    const featuredData = {
      isFeatured: value
    }
    console.log(featuredData)
    this.postService.markFeatured(id, featuredData)

  }
}