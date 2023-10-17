import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory, Encoding, FileInfo } from '@capacitor/filesystem';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	path: string= "TestImages";
	photos: string []=[];
   dato:String|null=null;
	
	@ViewChild('div',{ read : ElementRef }) div!:ElementRef;
	private anim!:Animation

	@ViewChild('E',{ read : ElementRef }) E!:ElementRef;
	private EE!:Animation
	
  constructor(private activeRoute:ActivatedRoute,private animCtrl:AnimationController) {}
	ngAfterViewInit(){
		this.anim = this.animCtrl
			.create()
			.addElement(this.div.nativeElement)
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
    this.activeRoute.paramMap.subscribe(params=>{
      this.dato=params.get('data');//data viene de la url, dato es la variable que podemos usar aqui 
    });
	this.getPhoto();
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

}
}
