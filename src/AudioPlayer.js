class AudioPlayer{

    constructor(domElement) {
        this.cancionIndice = 0;        
        this.canciones = ["./assets/songs/1.mp3","./assets/songs/CalvinHarris-Bounce-ft.mp3","./assets/songs/2.mp3","./assets/songs/3.mp3"];
        this.imagenes = ["./assets/covers/1.jpg","./assets/covers/Calvin-harris.jpg","./assets/covers/2.jpg","./assets/covers/3.jpg"];        
        this.imagen = document.getElementById("imagenes");

        this.domElement = domElement;
        this.src = this.domElement.dataset.src;
        this.audio = new Audio(this.src);
        this.controls = {
            domElement: this.domElement.querySelector(".controls")
        };

        this.progress = this.domElement.querySelector(".hp_slide .hp_range");
        this.Inicialtime = this.domElement.querySelector(".InicialTime");
        this.Finaltime = this.domElement.querySelector(".FinalTime");
        this.initControls();
        this.initProgressActions();
        this.llamarTiempo();

        this.audio.ontimeupdate = () => { this.updateUI() , this.UpdateTime(); }
    }

    initControls() {
        this.controls.play = this.controls.domElement.querySelector(".playBtn");
        const mute = this.controls.domElement.querySelector(".muteBtn");
        const next = this.controls.domElement.querySelector(".derecha");
        const previuos = this.controls.domElement.querySelector(".izquierda");

       
        if (this.controls.play) {
            this.initPlay(this.controls.play);
        }
        if (mute) {
            this.initMute(mute);
        }

        if (next) {
            this.initNext(next);
        }

        if (previuos) {
            this.initPrevious(previuos);
        }       
    }

    initVolume () {
        var e = document.querySelector('.volume-slider-con');
        var eInner = document.querySelector('.volume-slider');
        var audio = document.getElementById('player');
        console.log(audio);
        var drag = false;

        e.onclick = (e) => {
            drag = true;
            updateBar(ev.clientX);
         };

        document.addEventListener('mouseup',function(ev){
            console.log("entre en mouseup" + ev)
            drag = false;
           });

           var updateBar = function (x, vol) {
            var volume = e;
                 var percentage;
                 //if only volume have specificed
                 //then direct update volume
                 if (vol) {
                     percentage = vol * 100;
                 } else {
                     var position = x - volume.offsetLeft;
                     percentage = 100 * position / volume.clientWidth;
                 }
         
                 if (percentage > 100) {
                     percentage = 100;
                 }
                 if (percentage < 0) {
                     percentage = 0;
                 }
         
                 //update volume bar and video volume
                 eInner.style.width = percentage +'%';
                 audio.volume = percentage / 100;
         };

    }
    

    initMute(domElement) {
        domElement.onclick = () => {
            if (!this.audio.muted){
                this.audio.muted = true;
            } else{
                this.audio.muted = false;
            }
            
       }
   }

    initPlay(domElement ) {
         domElement.onclick = () => {

            if (!this.audio.paused) {
                this.pause();
            } else {
                this.play();
            }
        }
    }

    initNext(domElement ) {
        domElement.onclick = () => {

           if (!this.audio.paused) {
               this.pause();
               this.cancionIndice += 1;

               if (this.cancionIndice > this.canciones.length-1){
                this.cancionIndice = 0;
               } 
               this.src = this.canciones[this.cancionIndice];
               this.audio = new Audio(this.src);
               this.imagen.src = this.imagenes[this.cancionIndice];
               console.log(this.imagen.src);
               this.audio.ontimeupdate = () => { this.updateUI() , this.UpdateTime(); }
               this.play();

           } else {
               console.log("Algo esta mal mano");
           }
       }
   }

   initPrevious(domElement ) {
    domElement.onclick = () => {

       if (!this.audio.paused) {
           this.pause();
           this.cancionIndice -= 1;

           if (this.cancionIndice < 0){
            this.cancionIndice = this.canciones.length-1;
           } 
           this.src = this.canciones[this.cancionIndice];
           this.audio = new Audio(this.src);
           this.imagen.src = this.imagenes[this.cancionIndice];
           this.audio.ontimeupdate = () => { this.updateUI() , this.UpdateTime(); }
           this.play();

       } else {
           console.log("Algo esta mal mano");
       }
   }
}

    initProgressActions() {
        const cover = this.domElement.querySelector(".hp_slide");        
        cover.onclick = (e) => {
            console.log(e);
            const x = e.offsetX;
            const totalX = cover.clientWidth;
            const progress = x / totalX;
            this.setCurrentTime(progress);
            this.audio
        };
    }

    formatTime(seconds) {         
        let min = Math.floor((seconds / 60));         
        let sec = Math.floor(seconds - (min * 60));         
        if (sec < 10) {             
            sec = `0${sec}`;         
        } 
        return `${min}:${sec}`; 
    }

    UpdateTime(){
        this.Inicialtime.innerHTML = (this.formatTime(Math.floor(this.audio.currentTime)));
        this.audio.addEventListener('durationchange',(event) => {
            if(this.Finaltime.innerHTML === "NaN:NaN"){
                this.Finaltime.innerHTML = "0:00";
            } else {
                this.Finaltime.innerHTML = (this.formatTime(Math.floor(this.audio.duration)));
            }
            
        });
    }

    llamarTiempo(){
        setInterval(this.formatTime,500);
    }

    setCurrentTime(progress) {
        this.audio.currentTime = this.audio.duration * progress;
        console.log(this.audio.duration);
    }

    updateUI() {
        console.log("Updating UI");
        const total = this.audio.duration;
        const current = this.audio.currentTime;
        const progress = (current / total) * 100;
        this.progress.style.width = `${progress}%`;
    }

    play() {
        this.audio.play().then().catch(err => console.log(`Error al reproducir el archivo: ${err}`));
    }

    pause() {
        this.audio.pause();
    }
    
}
