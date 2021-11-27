
const tiltEffectSettings = {
    max:25,
    perspective: 1000,
    scale: 1.2,
    speed: 3000,
    easing: "cubic-bezier(.03,.98,.52,.99)"
};



function cardMouseMove(event){
    const card = event.currentTarget;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth/2;
    const centerY = card.offsetTop+cardHeight/2;
    const mouseX = event.clientX -centerX;
    const mouseY = event.clientY -centerY;
    const rotateXUncapped = ((+1)*tiltEffectSettings.max*mouseY/(cardHeight/2));
    const rotateYUncapped = ((-1)*tiltEffectSettings.max*mouseX/(cardWidth/2));
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                        (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max : 
                        (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);

    card.style.transform = `translateY(-20px)  perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${tiltEffectSettings.scale},${tiltEffectSettings.scale},${tiltEffectSettings.scale}) `;
    card.style.filter = "grayscale(0)";
}
function cardMouseLeave(event){
    const card = event.currentTarget;
    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0) rotateY(0) scale3d(1,1,1)`;
    card.style.filter = "grayscale(1)";
    setTransition(event);
}
function cardMouseEnter(event){
    setTransition(event);
}
function setTransition(event){
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(()=> {
        card.style.transition = "";
    },tiltEffectSettings.speed);
}

function makeTitle(){
    let title = document.querySelector("#title");
    let strTitle = title.textContent;
    let letterArray = strTitle.split("");
    let char = 0;
    title.textContent = "";
    for(let i = 0; i<letterArray.length;i++)
    {
        title.innerHTML+="<span class=\"titleSpan\">"+letterArray[i]+"</span>";
    }
    let timer = setInterval(function(){
        let span = title.querySelectorAll("span")[char];
        span.classList.add("fade");

        char++;
        if(char === letterArray.length){
            clearInterval(timer);
        
        }
    },200);
}
(function(){

const cards =  document.querySelectorAll(".card");
cards.forEach(card => {
    card.addEventListener("mouseenter",cardMouseEnter);
    card.addEventListener("mousemove",cardMouseMove);
    card.addEventListener("mouseleave",cardMouseLeave); 
});
makeTitle();
})();