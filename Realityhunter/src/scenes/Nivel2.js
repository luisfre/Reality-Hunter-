
// You can write more code here

/* START OF COMPILED CODE */

class Nivel2 extends Phaser.Scene {

	constructor() {
		super("Nivel2");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	preload(){
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		this.load.text('noticias', 'assets/noticias_clasificadas.csv');
		this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });   
		 
		  this.load.spritesheet('tablet', 'assets/Nivel2/tabletsprite.png', { frameWidth: 1920, frameHeight: 1080 });
		  this.load.image('btncerrar', 'assets/botonx.png');
		  this.load.image('fondoconclu', 'assets/fondo.png');
		  this.load.image('LOGOjuego', 'assets/LOGOjuego.png');
		  this.load.image('botonhome', 'assets/botonhome.png');
		this.load.image('botonvolvernivel', 'assets/botonvolvernivel.png');
	
		this.load.image('botonverdadero', 'assets/botonverdadero.png');
		this.load.image('botonfalso', 'assets/botonfalso.png');
		this.load.image('fondonivel2', 'assets/Nivel2/fondonivel2.png');

	}
	

	/** @returns {void} */
	editorCreate() {
		
		// fondonivel2
		const fondonivel2 = this.add.image(977, 339, "fondonivel2");
		fondonivel2.scaleX = 0.8512181445801202;
		fondonivel2.scaleY = 0.8512181445801202;
	
		this.noticiaAleatoria = null;

		
		if(this.game.global.noticias.length==0){
			this.cargarNoticiasDesdeBackend();
		}
	
   

	




	const LOGOjuego = this.add.image(1056, 153, "LOGOjuego");
	LOGOjuego.setPosition(950, 150);
	LOGOjuego.setScale(0.8);

// Aplicar el script OnAwake al LOGO
const onAwakeScriptLOGO = new OnAwakeScript(LOGOjuego);

// Aplicar el script de movimiento desde la parte superior al LOGO
const moveInSceneActionScriptLOGO = new MoveInSceneActionScript(onAwakeScriptLOGO);
moveInSceneActionScriptLOGO.from = "TOP"; // El LOGO se moverá desde la parte superior

// Configurar la duración del movimiento (1 segundo, como el dino)
const moveInSceneActionScriptDurationConfigCompLOGO = new DurationConfigComp(moveInSceneActionScriptLOGO);
moveInSceneActionScriptDurationConfigCompLOGO.duration = 1000; // Duración de 1 segundo







	// ************************botón recargar*********************************************************************************************


		this.events.emit("scene-awake");
	}

	

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		const hoverSound = this.sound.add('hoverSound');
		const clickSound = this.sound.add('clickSound');
		this.respuesta="";
		const urlParams = new URLSearchParams(window.location.search); 
	   this.game.global.conteoglobal=urlParams.get('conteoglobal');
		//this.game.global.conteoglobal=5
		
	
	
		console.log(this.game.global.conteoglobal);

	
		
        this.indicealeatorio=0;
		
		
		


		// ************************botón home*********************************************************************************************
		const btnhome = this.add.image(1200, 60, 'botonhome');
		
		btnhome.setPosition(1820, 80);
		btnhome.setScale(0.7);
		btnhome.setDepth(10);

			// Hacer el botón validar noticias
			btnhome.setInteractive();

			// Cambiar de color al pasar el mouse por encima
			btnhome.on('pointerover', function () {
				this.setTint(0x0E7FDD); 
				this.setScale(0.75);
				this.setAlpha(0.95);
				hoverSound.play();
			});

			// Volver al color original cuando el mouse sale
			btnhome.on('pointerout', function () {
				this.clearTint();
				this.setScale(0.7);// Elimina el tinte
				this.setAlpha(1);
			});
					

			// Acción cuando se hace clic en el botón
			btnhome.on('pointerdown', () => {
				clickSound.play();
				this.scene.start('MenupPrincial'); // Cambia a la escena deseada
			});
					
// *********************************************************************************************************************
		const btnvolver = this.add.image(840, 160, 'botonvolvernivel');
		
		btnvolver.setPosition(1700, 80);
		btnvolver.setScale(0.7);
		btnvolver.setDepth(10);

		// Hacer el botón validar noticias
		btnvolver.setInteractive();

		// Cambiar de color al pasar el mouse por encima
		btnvolver.on('pointerover', function () {
			this.setTint(0x0E7FDD); 
			this.setScale(0.75);
			this.setAlpha(0.95);
			hoverSound.play();
		});

		// Volver al color original cuando el mouse sale
		btnvolver.on('pointerout', function () {
			this.clearTint();
			this.setScale(0.7);// Elimina el tinte
			this.setAlpha(1);
		});
				

		// Acción cuando se hace clic en el botón
		btnvolver.on('pointerdown', () => {
			clickSound.play();
			this.scene.start('Nivel1'); // Cambia a la escena deseada
		});

// *********************************************************************************************************************
						
       // Crear el objeto y configurar su interacción
		const tablet = this.add.sprite(900, 560, 'tablet').setInteractive();
		tablet.setDepth(1);
		

		// Animación de resplandor usando escala
		this.animtabactive=this.tweens.add({
			targets: tablet, // Aumentar la escala en el eje X
			scaleY: { from: 1, to: 1.01 }, // Aumentar la escala en el eje Y
			duration: 500, // Duración de la animación
			ease: 'Power1', // Tipo de suavizado
			yoyo: true, // Volver a la posición inicial
			repeat: -1 // Repetir indefinidamente
		});
			// Definir la animación
			const anim =this.anims.create({
				key: 'objectAnimation',
				frames: this.anims.generateFrameNumbers('tablet', { start: 0, end: 10 }),
				frameRate: 10,
				repeat: 0 // -1 para que la animación se repita indefinidamente
			});
				
				// Definir la animación inversa
				const reverseAnim = this.anims.create({ 
					key: 'objectAnimationReverse',       
					frames: this.anims.generateFrameNumbers('tablet', { start: 10, end: 0 }), 
					frameRate: 10,                       
					repeat: 0                            
				});


		const hitArea = this.add.rectangle(550,980, 400, 100).setInteractive();
		hitArea.setDepth(2);
		hitArea.setAlpha(0.5);
		hitArea.setVisible(true);
		const botonxtablet = this.add.image(1590, 140, "btncerrar");
		botonxtablet.setScale(0.5);
		botonxtablet.setInteractive();
		botonxtablet.setDepth(4);
		botonxtablet.on('pointerover', function () {
			botonxtablet.setTint(0x0E7FDD);  // Cambiar el tinte del botón
			botonxtablet.setScale(0.55);
			botonxtablet.setAlpha(0.95);
			
			//console.log(this.game.config.controleffects); // Contexto de la escena sigue correcto
			hoverSound.play();
		}, this);
	
		// Volver al color original cuando el mouse sale
		botonxtablet.on('pointerout', function () {
			botonxtablet.clearTint();  // Elimina el tinte
			botonxtablet.setScale(0.5); // Volver al tamaño original
			botonxtablet.setAlpha(1); // Volver a la transparencia original
		}, this);
		botonxtablet.setVisible(false);
		
	

// *****************************RESULTADO****************************************************************************************

		const fondoconlusi= this.add.image(957, 539, 'fondoconclu');
		fondoconlusi.setScale(1.2);
		fondoconlusi.setDepth(100);
		fondoconlusi.setAlpha(0.95);
		fondoconlusi.setVisible(false);

		const botonxconclu = this.add.image(1590, 140, "btncerrar");
		botonxconclu.setScale(0.5);
		botonxconclu.setInteractive();
		botonxconclu.setDepth(100);
		botonxconclu.on('pointerover', function () {
			botonxconclu.setTint(0x0E7FDD);  // Cambiar el tinte del botón
			botonxconclu.setScale(0.55);
			botonxconclu.setAlpha(0.95);
			
			//console.log(this.game.config.controleffects); // Contexto de la escena sigue correcto
			hoverSound.play();
		}, this);
	
		// Volver al color original cuando el mouse sale
		botonxconclu.on('pointerout', function () {
			botonxconclu.clearTint();  // Elimina el tinte
			botonxconclu.setScale(0.5); // Volver al tamaño original
			botonxconclu.setAlpha(1); // Volver a la transparencia original
		}, this);

		botonxconclu.on('pointerdown', () => { 
			clickSound.play();  
			fondoconlusi.setVisible(false);
			botonxconclu.setVisible(false);
			this.titleText.setText(""); 
			this.reasonText.setText(""); 
			scrollablePanel.setVisible(false);  
			this.fondopantallatablet.setVisible(false);    
			if(this.game.global.conteoglobal>0){
				hitArea.setVisible(true); 
			}else{
				hitArea.setVisible(false); 
			}            
			                            
			botonxtablet.setVisible(false);
			btnfalso.setVisible(false); 
			btnverdadero.setVisible(false); 
			this.game.global.conteoglobal -=1;
			this.contarnoticias();
			this.elegirnoticia();
			this.game.global.noticias.splice(this.indiceAleatorio, 1);
		                  
			tablet.play('objectAnimationReverse');  

			                
		}); 
		botonxconclu.setVisible(false);

		// Crear el texto "Felicidades"
       this.titleText = this.add.text(950, 300, "", {
            fontSize: '100px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center'
        }).setOrigin(0.5); // Centrar el texto en su posición
		this.titleText.setDepth(100);
		

       


        // Crear el texto "razonnnnnn"
       this.reasonText = this.add.text(950, 400, "", {
            fontSize: '40px',
            color: '#ffffff',
            align: 'center',
			wordWrap: { width: 1500, useAdvancedWrap: true }
        }).setOrigin(0.5); // Centrar el texto en su posición
		this.reasonText.setDepth(100);
		

// *********************************************************************************************************************





this.elegirnoticia();
	//console.log(this.noticiaAleatoria);


	hitArea.on('pointerdown', () => {
		if(this.game.global.conteoglobal>0){

			tablet.play('objectAnimation');
		}


			});


















			this.fondopantallatablet = this.add.rectangle(915, 545, 1100, 730, 0xFF2C3E50); 
			this.fondopantallatablet.setOrigin(0.5);
			this.fondopantallatablet.setDepth(2);
			this.fondopantallatablet.setVisible(false);
		



		var scrollablePanel = this.rexUI.add.scrollablePanel({
			x: 915,
			y: 490,
			width: 1090,
			height: 600,

			scrollMode: 0,

			background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, 0xFF2C3E50),

			panel: {
				child: this.rexUI.add.fixWidthSizer({
					space: {
						left: 3,
						right: 3,
						top: 3,
						bottom: 3,
						item: 8,
						line: 8,
					}
				}),

				mask: {
					padding: 1
				},
			},

			slider: {
				track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x202E3A),
				thumb: this.rexUI.add.roundRectangle(0, 0, 20, 50, 0, 0xFF141C23),
			},

			space: {
				left: 30,
				right: 30,
				top: 10,
				bottom: 10,

				panel: 10,
			}
		})
			.layout();
		//.drawBounds(this.add.graphics(), 0xff0000);

		 // Hacer el scrollablePanel invisible inicialmente
	scrollablePanel.setVisible(false);
	scrollablePanel.setDepth(2);

	// Escuchar el evento 'animationcomplete' para mostrar el scrollablePanel
	tablet.on('animationcomplete', (animation) => {
				
		if (animation.key === 'objectAnimation') { 
		
				scrollablePanel.setVisible(true);
				this.fondopantallatablet.setVisible(true);
				hitArea.setVisible(false);
				botonxtablet.setVisible(true);
				btnfalso.setVisible(true);
				btnverdadero.setVisible(true);
				updatePanel(scrollablePanel, this.noticiaAleatoria.title,this.noticiaAleatoria.text,"Fuente:"+this.noticiaAleatoria.fuente);
				
				

			} 
	});
		
			 // Añadir controlador de eventos para cerrar el scrollablePanel
		botonxtablet.setInteractive().on('pointerdown', () => { 
			scrollablePanel.setVisible(false);  
			this.fondopantallatablet.setVisible(false);
			clickSound.play();                  
			hitArea.setVisible(true);                             
			botonxtablet.setVisible(false);
			btnfalso.setVisible(false); 
			btnverdadero.setVisible(false); 
		                  
			tablet.play('objectAnimationReverse');                
		}); 
        

		





	


// *********************************************************************************************************************
const btnfalso= this.add.image(840, 160, 'botonfalso');
		
btnfalso.setPosition(600, 850);
btnfalso.setScale(0.7);
btnfalso.setDepth(10);

// Hacer el botón validar noticias
btnfalso.setInteractive();

// Cambiar de color al pasar el mouse por encima
btnfalso.on('pointerover', function () {
	this.setTint(0x0E7FDD); 
	this.setScale(0.75);
	this.setAlpha(0.95);
	hoverSound.play();
});

// Volver al color original cuando el mouse sale
btnfalso.on('pointerout', function () {
	this.clearTint();
	this.setScale(0.7);// Elimina el tinte
	this.setAlpha(1);
});
		

// Acción cuando se hace clic en el botón
btnfalso.on('pointerdown', () => {
	clickSound.play();
	
	if(this.noticiaAleatoria.fake_new_class=="FALSA"){
		this.titleText.setText("CORRECTO");
		this.reasonText.setText(this.noticiaAleatoria.razon);
		fondoconlusi.setVisible(true);
		botonxconclu.setVisible(true);
		
		this.gainProgress();

	}else{

		this.titleText.setText("ERROR");
		this.reasonText.setText(this.noticiaAleatoria.razon);
		fondoconlusi.setVisible(true);
		botonxconclu.setVisible(true);
	
	}
	
});
btnfalso.setVisible(false);

	// *********************************************************************************************************************
	const btnverdadero= this.add.image(840, 160, 'botonverdadero');
		
	btnverdadero.setPosition(950, 850);
	btnverdadero.setScale(0.7);
	btnverdadero.setDepth(10);

	// Hacer el botón validar noticias
	btnverdadero.setInteractive();

	// Cambiar de color al pasar el mouse por encima
	btnverdadero.on('pointerover', function () {
		this.setTint(0x0E7FDD); 
		this.setScale(0.75);
		this.setAlpha(0.95);
		hoverSound.play();
	});

	// Volver al color original cuando el mouse sale
	btnverdadero.on('pointerout', function () {
		this.clearTint();
		this.setScale(0.7);// Elimina el tinte
		this.setAlpha(1);
	});
			

	// Acción cuando se hace clic en el botón
	btnverdadero.on('pointerdown', () => {
		clickSound.play();
		
		
if(this.noticiaAleatoria.fake_new_class=='VERDADERA'){
	this.titleText.setText("CORRECTO");
	
	this.reasonText.setText(this.noticiaAleatoria.razon);
	fondoconlusi.setVisible(true);
	botonxconclu.setVisible(true);
	 
	this.gainProgress();

}else{

	this.titleText.setText("ERROR");
	this.reasonText.setText(this.noticiaAleatoria.razon);
	fondoconlusi.setVisible(true);
	botonxconclu.setVisible(true);

}
	});
	btnverdadero.setVisible(false);
	
		
		
	  // Variables de progreso
	  this.progressValue = this.game.global.experienc; // Valor inicial del progreso
	  this.maxProgress = 1; // Máximo progreso (100%)

	  // Crear gráfico para la barra
	  this.progressBar = this.add.graphics();

	  // Crear el texto de credibilidad por encima de la barra
	  this.credibilityText = this.add.text(1400, 120, 'Credibilidad', {
		  fontSize: '32px',
		  color: '#ffffff',
	  }).setOrigin(0.5, 0.5); // Centrar el texto horizontalmente

	  // Dibujar la barra de fondo
	  this.drawProgressBar(1400, 80, 400, 20, 0xcccccc); // Fondo gris de la barra
	  this.drawProgress(1400, 80, 400, 20, this.progressValue);
	  this.contarnoticias();
	

	



	}
	update(time, delta) {

		
		
		if(this.game.global.conteoglobal>0){
			this.animtabactive.play()
		}else{
			this.animtabactive.stop();
		}
	
		
	}

	cargarNoticiasDesdeBackend() {
		return fetch('http://127.0.0.1:5000/load_news') // Reemplaza por la URL de tu backend
			.then(response => {
				if (!response.ok) {
					throw new Error('Error en la carga de noticias');
				}
				console.log('Noticias cargadas del servidor:', response);
				return response.json(); // Parsear el JSON de la respuesta
			})
			.then(data => {
				this.game.global.noticias = data; // Guardar las noticias en el array
				
				this.noticiasCargadas = true; // Marcar que las noticias ya se han cargado
			})
			.catch((error) => {
				console.error('Error:', error); // Manejo de errores
			});
	}


	contarnoticias(){
		if(this.container){
			this.container.destroy();
		}

		if(this.game.global.conteoglobal>=0){

// Crear un contenedor para el círculo y el texto
this.container = this.add.container(400, 900);

// Crear el círculo rojo de fondo
const circle = this.add.graphics();
circle.fillStyle(0xff0000, 1); // Color rojo
circle.fillCircle(0, 0,25); // Coordenadas (0, 0) relativo al contenedor

// Añadir el círculo al contenedor
this.container.add(circle);

// Crear el texto
const numberText = this.add.text(0, 0, this.game.global.conteoglobal, {
	fontSize: '40px',
	color: '#ffffff',
	fontStyle: 'bold',
	align: 'center'
});

// Centrar el texto en el contenedor
numberText.setOrigin(0.5, 0.5);

// Añadir el texto al contenedor
this.container.add(numberText);

// Animar el contenedor
this.tweens.add({
	targets: this.container,
	scaleX: { from: 1, to: 1.3 }, // Escala solo en X
	scaleY: { from: 1, to: 1.5 }, // Escala solo en Y
	angle: { from: 0, to: 10 }, // Leve rotación para dar dinamismo
	ease: 'Sine.easeInOut', // Movimiento suave en "S"
	duration: 800, // Más rápido
	repeat: -1, // Repetir indefinidamente
	yoyo: true, // Volver al tamaño original después de cada ciclo
});
this.container.setDepth(0);



		} 

		
}


elegirnoticia(){
			if(this.game.global.noticias.length>0)
				{
					this.indiceAleatorio = Math.floor(Math.random() * this.game.global.noticias.length);
					this.noticiaAleatoria = this.game.global.noticias[this.indiceAleatorio];



			}else{
				this.cargarNoticiasDesdeBackend().then(() => {
					if (this.game.global.noticias.length > 1) {
						this.indiceAleatorio = Math.floor(Math.random() * this.game.global.noticias.length);
						this.noticiaAleatoria = this.game.global.noticias[this.indiceAleatorio]; // Acceder a la noticia en la posición 1
						
					} else {
						console.log('No hay suficientes noticias para seleccionar.');
					}
				});

			}
			// Cargar noticias desde el backend y luego acceder a ellas

}


    // Función para dibujar la barra de progreso
    drawProgressBar(x, y, width, height, color) {
        this.progressBar.clear(); // Limpiar cualquier gráfico anterior
        this.progressBar.fillStyle(color, 1); // Color de la barra
        this.progressBar.fillRect(x - width / 2, y - height / 2, width, height); // Dibujar el rectángulo de fondo
    }

    // Función para dibujar el progreso actual
    drawProgress(x, y, width, height, percentage) {
        const progressWidth = width * percentage; // Ancho proporcional al porcentaje de progreso

        // Limpiar y dibujar la barra de fondo de nuevo
        this.progressBar.clear();
        this.drawProgressBar(x, y, width, height, 0xcccccc); // Fondo gris

        // Dibujar la barra de progreso
        this.progressBar.fillStyle(0x07235D, 1); // Color verde para el progreso
        this.progressBar.fillRect(x - width / 2, y - height / 2, progressWidth, height); // Dibujar el progreso
    }

    // Función para incrementar el progreso
    gainProgress() {
        if (this.progressValue < this.maxProgress) {
            this.progressValue += 0.01; // Incrementar el progreso (10%)
            this.progressValue = Phaser.Math.Clamp(this.progressValue, 0, this.maxProgress); // Limitar entre 0 y 1
            this.drawProgress(1400, 80, 400, 20, this.progressValue); // Actualizar la barra de progreso
            this.game.global.experienc+= 0.01;
			
       
            this.credibilityText.setText(`Credibilidad`); // Actualizar el texto
            
            console.log("Progreso actual:", this.progressValue); // Mostrar en consola
        } else {
            console.log("Progreso máximo alcanzado."); // Progreso completo
        }
    }






	/* END-USER-CODE */
}


var updatePanel = function (panel, titulo, text, fuente) {
    var sizer = panel.getElement('panel');
    var scene = panel.scene;

    sizer.clear(true);

    // Añadir el título
    var titleText = scene.add.text(0, 0, titulo, {
        fontSize: 40,
        color: '#FFFFFF',
		align: 'center',
		fontStyle: 'bold', 
        wordWrap: { width: 980 }, // Ajusta el ancho según sea necesario
    });
    sizer.add(titleText);

    // Añadir un salto de línea después del título
    sizer.add(scene.add.text(0, 0, '', { fontSize: 10 })); // Espacio vacío para el salto de línea

    // Añadir el texto principal
    var bodyText = scene.add.text(0, 0, text, {
        fontSize: 35,
        color: '#FFFFFF',
        wordWrap: { width: 980 }, // Ajusta el ancho según sea necesario
    });
    sizer.add(bodyText);

    // Añadir un salto de línea después del texto principal
    sizer.add(scene.add.text(0, 0, '', { fontSize: 10 })); // Espacio vacío para el salto de línea

    // Añadir la fuente
    var sourceText = scene.add.text(0, 0, fuente, {
        fontSize: 35,
        color: '#FFFFFF',
		fontStyle: 'bold',
        wordWrap: { width: 980 }, // Ajusta el ancho según sea necesario
    });
    sizer.add(sourceText);

    // Realiza el layout del panel
    panel.layout();
    panel.setDepth(3);
    return panel;
};

/* END OF COMPILED CODE */

// You can write more code here
