import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage} from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  [x: string]: any;

  constructor(private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService, private router: Router) { }

  uploadImage(selectedImage: any, postData: any, formStatus: string | undefined, id: undefined) {
const filePath =`postIMG/${Date.now()}`


this.storage.upload(filePath, selectedImage).then(() => {
  console.log('Post Image Uploaded Successfully')
this.storage.ref(filePath).getDownloadURL().subscribe(URL=>{
  postData.postImgPath = URL
  console.log(postData)

  if(formStatus == 'Edit'){
    this.updateData(id, postData);
  }else{
    this.saveData(postData)
  }

  
})
})
  }
  saveData(postData: any){
    this.afs.collection('posts').add(postData).then((docRef =>{
      this.toastr.success('Data Insert Successfully')
    }))

  }

  loadData(){
      
    return this.afs.collection('posts').snapshotChanges().pipe(
       map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )

  }


  loadDataOneData(id: any){
    return this.afs.doc(`posts/${id}`).valueChanges()
  }

  updateData(id: any, postData: any){
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toastr.success('Data Updated Successfully')
      this.router.navigate(['/posts'])
    })

  }
}
