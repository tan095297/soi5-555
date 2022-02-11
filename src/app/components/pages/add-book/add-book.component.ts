import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  bookForm!: FormGroup;

  constructor(private service : StaffService , private router : Router) { }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      bookid : new FormControl(),
      name : new FormControl(),
      author : new FormControl(),
      publisher : new FormControl(),
      price : new FormControl(),
    })
  }

  addBook(){
    let book = {
      bookid: this.bookForm.value.bookid,
      name : this.bookForm.value.bookname,
      author : this.bookForm.value.bookauther,
      publisher :this.bookForm.value.publisher,
      price :this.bookForm.value.price
    };

    this.service.addBook(book).subscribe(res=>{
      console.log(res);
      if(res.msg="Add Complete"){
        window.alert("Add Complete");
        this.router.navigate(["/book"])
      }else{
        window.alert("Not Success");
        this.router.navigate(["/book/new"])
      }
      
    })
  }

}
