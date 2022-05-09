import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() contenido:any;

  constructor() { }

  ngOnInit(): void {
  }

  cerrarToast(){
    let toast:any=document.getElementById("toast");
    toast.style.display = "none";
  }

}
