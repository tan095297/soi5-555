import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  id: any;
  currentBook: any ;
  bookForm! : FormGroup ;

  constructor(private service : StaffService ,private router : Router, private activatedRouter : ActivatedRoute ) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      bookid : new FormControl(),
      bookname : new FormControl(),
      bookauther: new FormControl(),
      publisher : new FormControl(),
      price : new FormControl(),
    });

    this.activatedRouter.params.subscribe(params=>{
      this.id = params['id'];
    });

    this.service.getBookById(this.id).subscribe((res)=>{
      this.currentBook = res.data;
      this.bookForm.controls['bookid'].setValue(this.currentBook.bookid);
      this.bookForm.controls['bookname'].setValue(this.currentBook.bookname);
      this.bookForm.controls['bookauther'].setValue(this.currentBook.bookauther);
      this.bookForm.controls['publisher'].setValue(this.currentBook.publisher);
      this.bookForm.controls['price'].setValue(this.currentBook.price);
      
    });
  }


  updateBook(){
    let book = {
      bookid: this.bookForm.value.bookid,
      bookname: this.bookForm.value.name,
      bookauther:this.bookForm.value.bookauther,
      publisher: this.bookForm.value.publisher,
      price: this.bookForm.value.price
    }

    this.service.updateBook(book, this.id).subscribe((res)=>{
      window.alert("Edit Success");
      this.router.navigate(["/product"]);
    })
}

}
