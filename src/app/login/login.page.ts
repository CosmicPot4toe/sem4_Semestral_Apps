import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AnimationController, Animation, LoadingController  } from '@ionic/angular';
import { AuthService } from '../Services/fb/auth.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	
	
	@ViewChild('div',{ read : ElementRef }) div!:ElementRef;
	private load!:Animation
	
	logForm!:FormGroup;

	constructor(private animCtrl:AnimationController,
		public formBuilder:FormBuilder,public loadingCtrl:LoadingController,public authService:AuthService) { }

	ngOnInit(){
		this.logForm = this.formBuilder.group({
			email:['',[
				Validators.required,
				Validators.email,
				Validators.pattern("[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$")
			]],
			pw:['',[
				Validators.required,
				Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
			]]
		})
	}
	get errorControl(){
		return this.logForm?.controls;
	}

	async login(){
		const loading =await this.loadingCtrl.create();
		await loading.present();
		if(this.logForm?.valid){
			loading.dismiss()
		}else{
			loading.dismiss()
		}
	}

	ionViewDidLeave(){ //flick is GONE
		this.load.stop();
	}
	ngAfterViewInit(){
		this.load = this.animCtrl
			.create()
			.addElement(this.div.nativeElement)
			.duration(310)
			.fromTo('transform', 'translateX(0px)', 'translateX(-120%)');
	}

}
