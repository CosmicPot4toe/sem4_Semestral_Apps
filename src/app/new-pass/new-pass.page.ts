import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.page.html',
  styleUrls: ['./new-pass.page.scss'],
})
export class NewPassPage implements OnInit {
  constructor(private router:Router) { }
	
	user="";

	contador= 0;
	recover(){
		// for(const x of this.usuarios ){
		// 	if(x.nombre===this.user){
		// 		this.contador = this.contador+1;
		// 		console.log("usuario existe")
		// 		this.router.navigate(['/login']);//si usuario existe
		// 		this.user="";
		// 	}
		// }
		// if(this.contador== 0){
		// 	console.log("usuario no existe");
		// }
	}


  ngOnInit() {
  }

}
