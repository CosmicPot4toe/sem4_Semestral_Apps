import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimationController, Animation } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScannerOriginal } from '@awesome-cordova-plugins/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  scan(){
	this.barcodeScannerOriginal.scan().then(barcodeData => {
		this.code=barcodeData.text;
		console.log('Barcode data', barcodeData, this.code);
		
	   }).catch(err => {
		   console.log('Error', err);
	   });
  }

  

 
}

takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
}
