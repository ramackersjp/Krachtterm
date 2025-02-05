document.querySelector('#blaf').onclick = function () {
    let inputField = document.querySelector('#inputfield input'); 

    if (inputField.value.trim().length === 0) {  
        alert("Please enter a swear word!");
    } else {
        document.querySelector('.wordcloud').innerHTML += `
         <div class="button">
            ${inputField.value}
         </div>
        `;
    }
    
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("service_worker.js").then(registration=>{
          console.log("SW Registered!");
        }).catch(error=>{
          console.log("SW Registration Failed");
        });
    }else{
      console.log("Not supported");
    }

    var x = document.getElementById("myAudio"); 
    
        function playAudio() { 
            if (x) {
                x.play().catch(error => console.log("Audio play failed:", error));
            }
        }
        document.getElementById("placeWordForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevents form submission
            playAudio();
    });
};