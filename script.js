    // Evolution
  
    /* DIGIMONS */
    let guilmon = document.querySelector('.front-guilmon')
    let veemon = document.querySelector('.front-veemon')
    let gabumon = document.querySelector('.front-gabumon')
  
    let allDigimons = [
    {
      nombre: "Gallantmont",
      power: "40",
      src: "./resources/digimons/Gallantmont.webp"
    },
    {
      nombre: "Exveemon",
      power: "32",
      src: "./resources/digimons/exVeemon.webp"
    },
    {
      nombre: "Garurumon",
      power: "37",
      src: "./resources/digimons/Garurumon.webp"
    }
  ];
  
    document.addEventListener('DOMContentLoaded', function() {
      let evolutionButton = document.getElementById('evolution');
      let card = document.querySelector('.card');
      let sideA = document.querySelector('.front');
  
      let sideB = document.querySelector('.front');
  
  
      let flipping = false;
  
      const digiName = document.getElementById('digiName');
      const digiPower = document.getElementById('digiPower');
  
      evolutionButton.addEventListener('click', function() {
        let numDigimon = -1;   //Enumeración de los digimons.
        
  
        console.log("El botón está activado.")
  
        let typeCards = document.querySelectorAll('.card') // CARD  
        let typeDigimons = document.querySelectorAll('.front') //IMG
        let data = document.querySelectorAll('.data')
        
  
        data.forEach(function(datas){
          if(isElementVisible(datas)){
            console.log(datas)
          }
        })
  
        let primerDigimonVisible;
        let primerCartaVisible;
        let primerData;
  
        data.forEach(function(datas){
          if(isElementVisible(datas)){
            primerData = datas
          }
        })
  
        typeDigimons.forEach(function(typeDigimon){
          if(isElementVisible(typeDigimon)){
            primerDigimonVisible = typeDigimon
            numDigimon++
            console.log(typeDigimon, "digimon: " + numDigimon)
          }
        })
        typeCards.forEach(function(typeCard){
          if(isElementVisible(typeCard)){
            primerCartaVisible = typeCard
            return
          }
        })
  
        // Crear un nuevo elemento span

      let newSpan = document.createElement('span')
      let power = allDigimons[numDigimon].power;
      newSpan.textContent = power
        
        console.log("Poder: ", newSpan)
  
        if (primerDigimonVisible && primerCartaVisible) {
              // Aquí puedes hacer lo que necesites con la primera carta visible
              console.log("La primera carta visible es: ", primerDigimonVisible);
              console.log("El primer div encontrado es: ", primerCartaVisible)
              console.log("Primer primer data: ", primerData)
        // EVOLUTION    
              if (!flipping) {
          flipping = true;
          primerCartaVisible.style.transform = 'rotateY(1440deg)'; // Gira 4 veces
          primerDigimonVisible.setAttribute("src", "./resources/digimons/partsCard/cardA.webp");
          primerDigimonVisible.style.transform = "rotateY(0deg)";
          
          setTimeout(function() {
  
            primerCartaVisible.style.transform = 'rotateY(0deg)';
            flipping = false;
          }, 20000); // Duración de la primera animación
          
          setTimeout(function() {
  
              // Cambia el fondo del lado A al finalizar la animación
              
  
              primerCartaVisible.style.transform = 'rotateY(180deg)';
              flipping = false;
              
              setTimeout(function() {
                primerCartaVisible.style.transform = 'rotateY(0deg)'; // Otra vuelta completa
                //
          primerDigimonVisible.setAttribute("src", allDigimons[numDigimon].src);    
          primerDigimonVisible.style.transform = "";
          
          primerData.textContent=allDigimons[numDigimon].nombre
          primerData.appendChild(newSpan);
          flipping = false;
                //
        }, 1000);   
  
            }, 2000); // Duración de la segunda animación
          }   
          } else {
              console.log("No se encontró ninguna carta visible.");
          }
        
        // Función para verificar si un elemento es visible en la pantalla
      function isElementVisible(element) {
          let rect = element.getBoundingClientRect();
          return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
      }
      
      // EVOLUTION 
      
      });
    });
  
    //Swipe
    const DECISION_THRESHOLD = 140
  
    let isAnimating = false
    let pullDeltaX = 0 // distance from the card being dragged
  
    function startDrag(event) {
      if (isAnimating) return
  
      // get the first article element
      const actualCard = event.target.closest('article')
      if (!actualCard) return
  
      // get initial position of mouse or finger
      const startX = event.pageX ?? event.touches[0].pageX
  
      // listen the mouse and touch movements
      document.addEventListener('mousemove', onMove)
      document.addEventListener('mouseup', onEnd)
  
      document.addEventListener('touchmove', onMove, { passive: true })
      document.addEventListener('touchend', onEnd, { passive: true })
  
      function onMove(event) {
        // current position of mouse or finger
        const currentX = event.pageX ?? event.touches[0].pageX
  
        // the distance between the initial and current position
        pullDeltaX = currentX - startX
  
        // there is no distance traveled in X axis
        if (pullDeltaX === 0) return
  
        // change the flag to indicate we are animating
        isAnimating = true
  
        // calculate the rotation of the card using the distance
        const deg = pullDeltaX / 20
  
        // apply the transformation to the card
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
  
        // change the cursor to grabbing
        actualCard.style.cursor = 'grabbing'
  
        // change opacity of the choice info
        const opacity = Math.abs(pullDeltaX) / 100
        const isRight = pullDeltaX > 0
  
        const choiceEl = isRight
          ? actualCard.querySelector('.choice.like')
          : actualCard.querySelector('.choice.nope')
  
        choiceEl.style.opacity = opacity
      }
  
      function onEnd(event) {
        // remove the event listeners
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)
  
        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)
  
        // saber si el usuario tomo una decisión
        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD
  
        if (decisionMade) {
          const goRight = pullDeltaX >= 0
  
          // add class according to the decision
          actualCard.classList.add(goRight ? 'go-right' : 'go-left')
          actualCard.addEventListener('transitionend', () => {
            actualCard.remove()
          })
        } else {
          actualCard.classList.add('reset')
          actualCard.classList.remove('go-right', 'go-left')
  
          actualCard.querySelectorAll('.choice').forEach(choice => {
            choice.style.opacity = 0
          })
        }
  
        // reset the variables
        actualCard.addEventListener('transitionend', () => {
          actualCard.removeAttribute('style')
          actualCard.classList.remove('reset')
  
          pullDeltaX = 0
          isAnimating = false
        })
  
        // reset the choice info opacity
        actualCard
          .querySelectorAll(".choice")
          .forEach((el) => (el.style.opacity = 0));
      }
    }
  
    document.addEventListener('mousedown', startDrag)
    document.addEventListener('touchstart', startDrag, { passive: true })
