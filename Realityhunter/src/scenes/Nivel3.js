
// You can write more code here

/* START OF COMPILED CODE */

class Nivel3 extends Phaser.Scene {

	constructor() {
		super("Nivel3");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	preload() {
		this.load.image('botonhome', 'assets/botonhome.png');
		this.load.audio('hoverSound', 'assets/hover.mp3');
		this.load.audio('clickSound', 'assets/click.mp3');
		this.load.image('LOGOjuego', 'assets/LOGOjuego.png');
        this.load.image('botonverificar', 'assets/botonverificar.png');
        this.load.image('fondonivel3', 'assets/Nivel3/fondonivel3.png');

		
	
	}

	/** @returns {void} */
	editorCreate() {
		const hoverSound = this.sound.add('hoverSound');
		const clickSound = this.sound.add('clickSound');

		// fondonivel3
		this.add.image(958, 537, 'fondonivel3');
		const LOGOjuego = this.add.image(1056, 153, 'LOGOjuego');
	LOGOjuego.setPosition(950, 90);
	LOGOjuego.setScale(0.6);

// Aplicar el script OnAwake al LOGO
const onAwakeScriptLOGO = new OnAwakeScript(LOGOjuego);

// Aplicar el script de movimiento desde la parte superior al LOGO
const moveInSceneActionScriptLOGO = new MoveInSceneActionScript(onAwakeScriptLOGO);
moveInSceneActionScriptLOGO.from = "TOP"; // El LOGO se moverá desde la parte superior

// Configurar la duración del movimiento (1 segundo, como el dino)
const moveInSceneActionScriptDurationConfigCompLOGO = new DurationConfigComp(moveInSceneActionScriptLOGO);
moveInSceneActionScriptDurationConfigCompLOGO.duration = 1000; // Duración de 1 segundo
		
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

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

    create() {
        this.editorCreate();
        const hoverSound = this.sound.add('hoverSound');
		const clickSound = this.sound.add('clickSound');
        const fuentesConfiables = [
            "Metroecuador",
                "El Comercio",
                "La Hora",
                "Ecuador Inmediato",
                "El Telégrafo",
                "Diario Expreso",
                "La República",
                "Semana",
                "El Financiero",
                "Portafolio",
                "Univisión Noticias",
                "America Magazine",
                "La Prensa",
                "Diario El Heraldo",
                "RTS",
                "Ecuavisa",
                "Teleamazonas",
                "La FM",
                "El Nacional",
                "Infobae",
                "El Tiempo"
            ];
            
            const fuentesNoConfiables = [
                "El Popular",
                "Tendencias 21",
                "La Lupa",
                "Bolsillo",
                "Alerta",
                "Ecuadorinmediato",
                "Noticias Curiosas",
                "El Chisme de la Semana",
                "La Verdad Oculta",
                "Actualidad Alternativa",
                "Noticias al Instante",
                "Viral News",
                "El Mundo de las Noticias"
            ];
            const razonesNoConfiables = [
                "La fuente frecuentemente presenta información sin verificación.",
                "Utilizan un lenguaje exagerado o sensacionalista.",
                "La fuente generalmente publica rumores o información no confirmada.",
                "La fuente a menudo priorizan la atención sobre la precisión.",
                "La fuente tienen un historial de difundir información incorrecta.",
                "No ofrecen contexto o análisis crítico de los hechos",
                "La fuente a menudo operan con falta de transparencia."
            ];
            const razonesConfiables = [
                "La fuente proporciona información verificada y respaldada por hechos.",
                "Presentan datos claros y bien fundamentados.",
                "Cumplen con estándares de calidad en la redacción.",
                "Utilizan fuentes verificables y citan adecuadamente.",
                "Fuente con un historial de confiabilidad y precisión.",
                "Fuente reconocida por mantener transparencia en su metodología de investigación.",
                "Ofrece un análisis equilibrado y objetivo de los eventos.",
                "Fuente reconocidas y respetada en la comunidad periodística."
            ];
    
        // Agregar título
        this.add.text(650, 270, 'INGRESE UNA NOTICIA PARA VERIFICAR', { fontSize: '32px', fill: '#2C3E50', fontStyle: 'bold' });
        this.add.text(350, 320, 'Ingrese el título:', { fontSize: '28px', fill: '#2C3E50', fontStyle: 'bold' });
        this.add.text(350, 450, 'Ingrese la noticia:', { fontSize: '28px', fill: '#2C3E50', fontStyle: 'bold' });
        this.add.text(1200, 350, 'La noticia es\nprobablemente:', { fontSize: '32px', fill: '#2C3E50', fontStyle: 'bold' });
        // Crear contenedor para el primer input (título)
        this.createInputContainer(680, 400, 'inputTitleText', 'scrollHandleTitle', 'scrollBarTitle', 660, 80);
    
        // Crear contenedor para el segundo input (noticia)
        this.createInputContainer(680, 680, 'inputNewsText', 'scrollHandleNews', 'scrollBarNews', 660, 380);
    
        this.resultText = this.add.text(1100, 800, '', { fontSize: '24px', fill: '#2C3E50', fontStyle: 'bold'  });
        this.resultText2 = this.add.text(1100, 800, '', { fontSize: '24px', fill: '#2C3E50', fontStyle: 'bold'  });
        this.verificationResult = '';

        	// ************************botón verificar*********************************************************************************************
		const btnverificar = this.add.image(1200, 60, 'botonverificar');
		
		btnverificar.setPosition(850, 920);
		btnverificar.setScale(0.7);
		btnverificar.setDepth(10);

            // Hacer el botón validar noticias
            btnverificar.setInteractive();

            // Cambiar de color al pasar el mouse por encima
            btnverificar.on('pointerover', function () {
                this.setTint(0x0E7FDD); 
                this.setScale(0.75);
                this.setAlpha(0.95);
                hoverSound.play();
            });

            // Volver al color original cuando el mouse sale
            btnverificar.on('pointerout', function () {
                this.clearTint();
                this.setScale(0.7);// Elimina el tinte
                this.setAlpha(1);
            });
                    

            // Acción cuando se hace clic en el botón
         
            btnverificar.on('pointerdown', () => {
                clickSound.play();


                this.submitNews(this.inputTitleText.text + '\n' + this.inputNewsText.text)
                    .then(() => {
                        console.log("El valor es: " + this.verificationResult);
                        var fuent="";
                        var raz="''";

                        if(this.verificationResult=='VERDADERA'){
                             
      
      
                            var fuent = fuentesConfiables[Math.floor(Math.random() * fuentesConfiables.length)];
                            var raz = razonesConfiables[Math.floor(Math.random() * razonesConfiables.length)];

                        }else if(this.verificationResult=='FALSA'){

                            var fuent = fuentesNoConfiables[Math.floor(Math.random() * fuentesNoConfiables.length)];
                            var raz = razonesNoConfiables[Math.floor(Math.random() * razonesNoConfiables.length)];

                        }
                        if (this.resultText !== 'Error al conectar con el servidor.' && this.resultText !== '') {
                            this.insertarNoticia(this.inputTitleText.text, this.inputNewsText.text, fuent, raz, this.verificationResult);
                        }
                    });
            });  
                
       
    }
    createInputContainer(x, y, inputTextKey, scrollHandleKey, scrollBarKey, containerWidth, containerHeight) {
        // Crear el fondo del input
        const inputBackground = this.add.rectangle(x, y, containerWidth, containerHeight, 0xcccccc).setOrigin(0.5);
        
        const maskGraphics = this.make.graphics({});
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.fillRect(inputBackground.x - containerWidth / 2, inputBackground.y - containerHeight / 2, containerWidth, containerHeight);
        
        const mask = maskGraphics.createGeometryMask();
        
        this[inputTextKey] = this.add.text(inputBackground.x - containerWidth / 2 + 10, inputBackground.y - containerHeight / 2 + 10, '', {
            fontSize: '18px', fill: '#000', fontStyle: 'bold', wordWrap: { width: containerWidth - 20, useAdvancedWrap: true }
        }).setOrigin(0).setMask(mask);
        
        const maxWidth = containerWidth - 20;
        const maxHeight = containerHeight - 20;
        
        // Crear barra de desplazamiento
        this[scrollBarKey] = this.add.graphics();
        this[scrollBarKey].fillStyle(0xcccccc, 1);
        const scrollBarX = inputBackground.x + containerWidth / 2 + 15;
        const scrollBarY = inputBackground.y - containerHeight / 2;
        this[scrollBarKey].fillRect(scrollBarX, scrollBarY, 10, containerHeight);
        
        // Ajustar el mango de la barra de desplazamiento
        this[scrollHandleKey] = this.add.rectangle(scrollBarX + 5, scrollBarY + 25, 10, 50, 0x555555).setInteractive();
        this[scrollHandleKey].setOrigin(0.5);
        this.input.setDraggable(this[scrollHandleKey]);
        
        // Cambiar el color al arrastrar
        this[scrollHandleKey].on('pointerover', () => {
            this[scrollHandleKey].setFillStyle(0x888888);
        });
        
        this[scrollHandleKey].on('pointerout', () => {
            this[scrollHandleKey].setFillStyle(0x555555);
        });
        
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            const handleTopLimit = inputBackground.y - containerHeight / 2 + 25;
            const handleBottomLimit = inputBackground.y + containerHeight / 2 - 25;
        
            if (dragY < handleTopLimit) {
                dragY = handleTopLimit;
            } else if (dragY > handleBottomLimit) {
                dragY = handleBottomLimit;
            }
        
            gameObject.y = dragY;
        
            // Calcular el porcentaje de desplazamiento
            const scrollPercent = (gameObject.y - handleTopLimit) / (handleBottomLimit - handleTopLimit);
            this[inputTextKey].setY(inputBackground.y - containerHeight / 2 + 10 - (this[inputTextKey].height - maxHeight) * scrollPercent);
        });
        
        // Interceptar y manejar el evento Ctrl+V para pegar texto
        this.input.keyboard.on('keydown', (event) => {
            if (this.activeInput === inputTextKey) {
                if (event.ctrlKey && event.key === 'v') {
                    event.preventDefault();
        
                    navigator.clipboard.readText().then((pastedText) => {
                        let modifiedText = pastedText;
                        if (modifiedText.charAt(0) === 'v') {
                            modifiedText = modifiedText.slice(1);
                        }
        
                        this[inputTextKey].setText(this[inputTextKey].text + modifiedText);
                    }).catch(err => {
                        console.error('Error al leer desde el portapapeles: ', err);
                    });
                } else if (event.key === 'Backspace') {
                    this[inputTextKey].setText(this[inputTextKey].text.slice(0, -1));
                } else if (event.key.length === 1) {
                    this[inputTextKey].setText(this[inputTextKey].text + event.key);
                }
        
                // Verificar si el texto excede la altura máxima del contenedor
                if (this[inputTextKey].height > maxHeight) {
                    const scrollPercent = Math.abs(this[inputTextKey].y - (inputBackground.y - containerHeight / 2 + 10)) / (this[inputTextKey].height - maxHeight);
                    this[scrollHandleKey].setY(inputBackground.y - containerHeight / 2 + scrollPercent * (containerHeight - this[scrollHandleKey].height));
                }
            }
        });
        
        // Asignar el input activo al hacer clic y resaltar el contenedor
        inputBackground.setInteractive().on('pointerdown', () => {
            if (this.activeContainer) {
                // Restablecer el color del contenedor anterior
                this.activeContainer.setFillStyle(0xcccccc);
            }
    
            // Resaltar el contenedor actual
            inputBackground.setFillStyle(0xc5d7ea); // Color amarillo claro para destacar
            this.activeContainer = inputBackground; // Guardar el contenedor activo
            this.activeInput = inputTextKey;
        });
    }



    submitNews(news) {
        if (news.length > 0) {
            return fetch('http://127.0.0.1:5000/predict', {  // Cambia la URL si es necesario
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ news: news })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                const realProb = data.real_probability.toFixed(2);
                const fakeProb = data.fake_probability.toFixed(2);
    
                // Limpiar texto previo si existe
                if (this.resultText) this.resultText.destroy();
                if (this.resultText2) this.resultText2.destroy();
    
                // Texto estilizado para las probabilidades
                const probTextStyle = { fontSize: '40px', fill: '#0f0', fontStyle: 'bold', align: 'center' };
                const probTextStyle2 = { fontSize: '40px', fill: '#f00', fontStyle: 'bold', align: 'center' };
                this.resultText = this.add.text(1080, 650, `Probabilidad de Real:\n ${realProb}%`, probTextStyle);
                this.resultText2 = this.add.text(1070, 750, `Probabilidad de Falsa:\n ${fakeProb}%`, probTextStyle2);
                // Lógica para determinar si la noticia es verdadera o falsa
                let resultColor = '';
                let posicionresultado = ''; 
        
                if (realProb > fakeProb) {
                    this.verificationResult = 'VERDADERA';
                    resultColor = '#0f0'; // Verde para verdadera
                    posicionresultado = 1080;
                } else {
                    this.verificationResult = 'FALSA';
                    resultColor = '#f00'; // Rojo para falsa
                    posicionresultado = 1200;
                }
    
                // Mostrar el resultado con un texto estilizado
                this.add.text(posicionresultado, 450, this.verificationResult, { fontSize: '90px', fill: resultColor, fontStyle: 'bold' });
    
                // Crear barras de progreso para las probabilidades
                this.createProbabilityBars(realProb, fakeProb);
    
            })
            .catch(error => {
                console.error('Error:', error);
                this.resultText.setText('Error al conectar con el servidor.');
            });
        }
    }
    
    // Crear barras de progreso para las probabilidades
    createProbabilityBars(realProb, fakeProb) {
        // Primero calculamos el total del 100%
        const totalWidth = 300; // El ancho total de la barra de 100%
        const barHeight = 40;   // Altura de la barra
        
        // Convertimos las probabilidades a proporciones del total
        const realWidth = (realProb / 100) * totalWidth; // Ancho de la barra de "Real"
        const fakeWidth = (fakeProb / 100) * totalWidth; // Ancho de la barra de "Falsa"
    
        // Crear la barra contenedora
        let borderBar = this.add.graphics();
        borderBar.lineStyle(3, 0xcccccc, 1);
        borderBar.strokeRect(1150, 580, totalWidth, barHeight); // Borde para la barra completa
        
        // Dibujar la parte verde para "Real"
        let realBar = this.add.graphics();
        realBar.fillStyle(0x00ff00, 1); // Color verde para real
        realBar.fillRect(1150, 580, realWidth, barHeight); // Llenar la barra en proporción a la probabilidad real
    
        // Dibujar la parte roja para "Falsa", que comienza donde termina la parte verde
        let fakeBar = this.add.graphics();
        fakeBar.fillStyle(0xff0000, 1); // Color rojo para falsa
        fakeBar.fillRect(1150 + realWidth, 580, fakeWidth, barHeight); // Llenar desde donde termina "Real"
    }

    // Enviar noticia para insertar en el CSV
  insertarNoticia(title, news, fuente, razon, fakeNewClass) {
    console.log(fakeNewClass);
   // const textWithMarker = news.replace(/\n/g, '@@@');
    const textSingleLine = news.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();

    const data = {
        title: title,
        text: textSingleLine,
        fuente: fuente,
        razon: razon,
        fake_new_class: fakeNewClass
    };

    fetch('http://127.0.0.1:5000/insert_news', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            console.log('Mensaje:', data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
