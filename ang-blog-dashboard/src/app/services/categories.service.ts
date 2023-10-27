import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, 
    private toastr: ToastrService, ) {

     }


  saveDate(data: unknown){
    this.afs.collection('categories').add(data).then(docRef =>{
      this.toastr.success('Data Insert Successfully ..!')

    }).catch(err => console.log(err))
  }

  loadData(){
      
    return this.afs.collection('categories').snapshotChanges().pipe(
       map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return {id, data}
        })
      })
    )

  }

  updateDate(id: string | undefined, EditData: Partial<unknown>){
    this.afs.doc(`categories/${id}`).update(EditData).then(docRef =>{
      this.toastr.success('Data Updated Successfully ..!')

    }).catch(err => console.log(err))

  }

  deleteDate(id: string | undefined){
    this.afs.doc(`categories/${id}`).delete().then(docRef =>{
      this.toastr.success('Data Deleted Successfully ..!')

    }).catch(err => console.log(err))

  }

}
