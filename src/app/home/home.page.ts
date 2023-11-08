import { AnimationController, Animation } from '@ionic/angular';
import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { AuthService } from '../Services/fb/auth.service';
import { RamService } from '../Services/api/ram/ram.service';

import { QRService } from '../Services/api/qr-scan/qr.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	
	@ViewChild('welcom',{ read : ElementRef }) com!:ElementRef;
	private anim!:Animation

	@ViewChild('E',{ read : ElementRef }) E!:ElementRef;
	private EE!:Animation
	
	char:any[] = [];
	args={} as any;

	constructor(private animCtrl:AnimationController,public authService:AuthService
		,public route:Router,private rickNmorty:RamService, public qr:QRService) {}

	
	ngAfterViewInit(){
		this.anim = this.animCtrl
			.create()
			.addElement(this.com.nativeElement)
			.duration(1000)
			.fromTo('transform', 'translateX(300px)', 'translateX(0px)')
			.fromTo('opacity', '0', '1');
			this.anim.play();
		this.EE = this.animCtrl
			.create()
			.addElement(this.E.nativeElement)
			.duration(2000)
			.fromTo('transform', 'translateY(3000px)', 'translateY(0px)')
			this.EE.play();

	}
	
  ngOnInit(){
		this.args.page = 0;
		this.getChars();
  }

  scan(){
		this.qr.scan();
  }

	async logout(){
		await this.authService.logout().catch((error)=>console.log(error))
		.then(
			()=>{
				this.route.navigate(['/login'])
			}
		)
	}

	getChars(event?:any){
		this.rickNmorty.getChar(this.args).subscribe({
			next:(res:any)=>{
				this.char.push(...res.results)
				console.log()
			},
			error:(err:any)=>{

			}
			}
		)
	}
}
