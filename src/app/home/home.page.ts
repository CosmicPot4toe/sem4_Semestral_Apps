import { AnimationController, Animation } from '@ionic/angular';
import { Router } from '@angular/router';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding, FileInfo } from '@capacitor/filesystem';

import { AuthService } from '../Services/fb/auth.service';
import { RamService } from '../Services/api/ram/ram.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	path: string= "TestImages";
	photos: string []=[];
	
	@ViewChild('welcom',{ read : ElementRef }) com!:ElementRef;
	private anim!:Animation

	@ViewChild('E',{ read : ElementRef }) E!:ElementRef;
	private EE!:Animation
	
	char:any[] = [];
	args={} as any;

	constructor(private animCtrl:AnimationController,public authService:AuthService
		,public route:Router,private rickNmorty:RamService) {}

	
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
	  this.getPhoto();
		this.args.page = 0;
		this.getChars()
  }

  async takePhoto(){
  

	debugger;
	const image = await Camera.getPhoto({
	  quality: 90,
	  allowEditing: false,
	  resultType: CameraResultType.Uri,
	  source: CameraSource.Camera
	});
	if(image){
	this.savePhoto(image.base64String!);
}
  
	// Can be set to the src of an image now
	//imageElement.src = imageUrl;
  };

  async savePhoto(photo: string){
	await Filesystem.writeFile({
    path: 'text.jpg',
    data: 'photo',
    directory: Directory.Documents,
    
  });


}

getPhoto(){
	Filesystem.readdir({
		path: this.path,
		directory: Directory.Documents
	}
	).then(files => {
		this.loadPhotos(files.files);
	}).catch(err =>{
		console.log(err);
		Filesystem.mkdir({
			path: this.path,
			directory: Directory.Documents
		})
	})
}

loadPhotos(phots:FileInfo[]){
// 	photos.forEach(File =>{
// 		Filesystem.readFile({
// 			path: '${this.path}/${file.name}',
// 			directory: Directory.Documents
// 		})
// 	});
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
