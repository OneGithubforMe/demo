

var blockx=-50;
var ylist=[canvasHeight*0.2,canvasHeight*0.05]
var blocky=ylist[Math.floor(Math.random() * 2)];
var speed=20;
var rst=0;
var hit=0;
// ==========================================================================================================
var bump= new Audio('Audio files/Instructions/Gamebump.mp3');
var dodgeaudio=new Audio('Audio files/Instructions/Squat down to avoid touching the yellow boxes.mp3');
var dodgeplayed=0;
var hitaudio=new Audio('Audio files/Instructions/Jump and hit the red boxes with your head.mp3');
var hitplayed=0;
var inposeplayed=0;
var readyaudio=new Audio('Audio files/Instructions/Great-Lets start.mp3');
var readyplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];

var t0=null;
var t1=null;


let arrowup = new Image();
arrowup.src = "Arrow icons/Arrow 8-up.png";
let arrowsize = (canvasWidth*80)/720;
let arrowdown = new Image();
arrowdown.src = "Arrow icons/Arrow 8-down.png";

function Exercise(results) {
    // console.log('a');

    if(!readyplayed){
        t0=timecounter;
        readyaudio.play();
        readyplayed=1;
    }
    if(timecounter-t0>3){
    
        ylist=[canvasHeight*0.2,canvasHeight*0.05];
        var blockwidth=0.1*canvasWidth;
        var blockheight=0.05*canvasHeight;


        if(results.poseLandmarks[0].visibility>0.8 && results.poseLandmarks[7].visibility>0.8 && results.poseLandmarks[8].visibility>0.8 ){
            if (!(results.poseLandmarks[33].y > (blocky+blockheight)/canvasHeight) && (((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[7].x && (blockx+blockwidth)/canvasWidth<=results.poseLandmarks[8].x) || (blockx/canvasWidth>=results.poseLandmarks[7].x && blockx/canvasWidth<=results.poseLandmarks[8].x) || ((blockx+blockwidth)/canvasWidth>=results.poseLandmarks[7].x && blockx/canvasWidth<=results.poseLandmarks[8].x))){
                hitState=true;
            }
            else{
                hitState=false;
            }
        }
        ctx1.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
        ctx1.textAlign = "center";

        if (blocky==canvasHeight*0.2){
            if(!dodgeplayed){
                dodgeaudio.play();
                dodgeplayed=1;
            }
            // ctx1.fillStyle = "yellow";
            // ctx1.fillText("Dodge", 0.5*canvasWidth, 0.8*canvasHeight);
            
            ctx1.globalAlpha=0.6;
            ctx1.fillStyle='black';
            ctx1.fillRect(0.68*canvasWidth,canvasHeight*0.5,0.24*canvasWidth,canvasHeight*0.2);
            ctx1.globalAlpha=1;
            ctx1.fillStyle='#FFC107';
            ctx1.fillText("Squat &", 0.80*canvasWidth, 0.58*canvasHeight);
            ctx1.fillText("Dodge", 0.80*canvasWidth, 0.68*canvasHeight);
            ctx1.drawImage(arrowdown, 0.80*canvasWidth - arrowsize/2, 0.7*canvasHeight, arrowsize, arrowsize);
            ctx1.fillStyle='yellow';
            if (blockx/canvasWidth>=results.poseLandmarks[8].x || hitState){

                if(blockx>=canvasWidth || hitState){
                    rst=1;
                    hit=0;
                }
                else if (blockx>=results.poseLandmarks[8].x){
                    if(!hit){
                        count+=1;
                        if(count>0 && count%5==0){
                            motivation[Math.floor(Math.random()*motivation.length)].play();
                        }
                        bump.play();
                        hit=1;
                    }
                    ctx1.fillStyle=green;
                    // countElement.innerHTML=count;
                    // audio.play()
                }
            }
            else{
                rst=0;}
                
        }
        else{
            if(!hitplayed){
                hitaudio.play();
                hitplayed=1;
            }
            // ctx1.fillText("Hit", 0.5*canvasWidth, 0.8*canvasHeight);
            
            ctx1.globalAlpha=0.6;
            ctx1.fillStyle='black';
            ctx1.fillRect(0.70*canvasWidth,canvasHeight*0.3,0.20*canvasWidth,canvasHeight*0.2);
            ctx1.globalAlpha=1;
            ctx1.fillStyle='#FFC107';
            ctx1.fillText("Jump &", 0.80*canvasWidth, 0.38*canvasHeight);
            ctx1.fillText("Hit", 0.80*canvasWidth, 0.48*canvasHeight);
            ctx1.drawImage(arrowup,  0.80*canvasWidth - arrowsize/2, 0.30*canvasHeight-arrowsize, arrowsize, arrowsize);
            ctx1.fillStyle = "red";
            if (blockx>=canvasWidth ||hitState){
                if (hitState){
                    count+=1;
                    if(count>0 && count%5==0){
                        motivation[Math.floor(Math.random()*motivation.length)].play();
                    }
                    bump.play();
                    // countElement.innerHTML=count;
                    // audio.play();
                }
            rst=1;
            }
            else{
            rst=0;}
        }
        ctx1.fillRect(blockx, blocky, blockwidth, blockheight);

        
        if(rst){
            blockx=-blockwidth;
            blocky=ylist[Math.floor(Math.random() * 2)];


        }
        speed=blockwidth/5;
        blockx+=speed;
    
    }
}
  
  