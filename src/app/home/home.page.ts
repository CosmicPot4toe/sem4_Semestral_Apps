import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


import { Camera, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dato:String|null=null;
	
	@ViewChild('div',{ read : ElementRef }) div!:ElementRef;
	private anim!:Animation

	@ViewChild('E',{ read : ElementRef }) E!:ElementRef;
	private EE!:Animation
	
	code:any;
  constructor(private activeRoute:ActivatedRoute,private animCtrl:AnimationController,private barcodeScannerOriginal: BarcodeScannerOriginal,public navCtrl: NavController, private camera: Camera) {}
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
  }

//   scan(){
// 	this.barcodeScannerOriginal.scan().then(barcodeData => {
// 		this.code=barcodeData.text;
// 		console.log('Barcode data', barcodeData, this.code);
		
// 	   }).catch(err => {
// 		   console.log('Error', err);
// 	   });
//   }

  


const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });

  // image.webPath will contain a path that can be set as an image src.
  // You can access the original file using image.path, which can be
  // passed to the Filesystem API to read the raw data of the image,
  // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
  var imageUrl = image.webPath;

  // Can be set to the src of an image now
  imageElement.src = imageUrl;
};
 
}



