var i=0;
var hit=0;
const boxh=0.6*canvasHeight;
const boxl=0.1*canvasWidth;
var hitpart=null;
const textsize=0.05*canvasHeight;
var rst=0;
var leftcount=0;
var rightcount=0;
var reptition=2;
var boxx=null;
const boxy=0.2*canvasHeight;
var total=16;
var repcount=0;

var countaudio=[new Audio('Audio files/Count/1.mp3'),new Audio('Audio files/Count/2.mp3'),new Audio('Audio files/Count/3.mp3')];
var countplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];


function Exercise(results) {

    if(count!=total){
        ctx1.fillStyle='yellow';
        ctx1.font = "900 "+textsize+"px Arial";
        if(i==0){
            hitpart=[results.poseLandmarks[19],results.poseLandmarks[20]];
            boxx=0.15*canvasWidth;

            ctx1.fillRect(boxx, 0.1*canvasHeight,boxl, 0.05*canvasHeight);
            ctx1.fillStyle='black';
            ctx1.fillText('Punch',boxx,canvasHeight*0.15);
            if(results.poseLandmarks[19].visibility>0.8 || results.poseLandmarks[20].visibility>0.8){
                if (results.poseLandmarks[19].x<=0.15+0.1 || results.poseLandmarks[20].x<=0.15+0.1){
                    if(!hit){
                        count+=1;
                        if(count<4 && count>0){
                            countaudio[count-1].play();
                        }
                        else if(count%3==0){
                            motivation[Math.floor(Math.random()*motivation.length)].play();
                        }
                        hit=1;
                        repcount+=1;
                        leftcount+=1;

                    }
                }
                else{
                    hit=0;

                }
            }

        }
        else if(i==1){
            hitpart=[results.poseLandmarks[19],results.poseLandmarks[20]];
            boxx=0.75*canvasWidth;
            ctx1.fillRect(boxx, 0.1*canvasHeight,boxl, 0.05*canvasHeight);
            ctx1.fillStyle='black';
            ctx1.fillText('Punch',boxx,canvasHeight*0.15);
            if(results.poseLandmarks[19].visibility>0.8 || results.poseLandmarks[20].visibility>0.8){
                if (results.poseLandmarks[19].x>=0.75 || results.poseLandmarks[20].x>=0.75){
                    if(!hit){
                        
                        count+=1;
                        if(count<4 && count>0){
                            countaudio[count-1].play();
                        }
                        else if(count%3==0){
                            motivation[Math.floor(Math.random()*motivation.length)].play();
                        }
                        hit=1;
                        repcount+=1;
                        rightcount+=1;

                    }
                }
                else{
                    hit=0;

                }
            }
        }
        else if(i==2){
            hitpart=[results.poseLandmarks[31],results.poseLandmarks[32]];
            boxx=0.15*canvasWidth;
            ctx1.fillRect(boxx, 0.1*canvasHeight,boxl, 0.05*canvasHeight);
            ctx1.fillStyle='black';
            ctx1.fillText('Kick',boxx,canvasHeight*0.15);
            if(results.poseLandmarks[31].visibility>0.8 || results.poseLandmarks[32].visibility>0.8) {
                if (results.poseLandmarks[31].x<=0.15+0.1 || results.poseLandmarks[32].x<=0.15+0.1){
                    if(!hit){
                        
                        count+=1;
                        if(count<4 && count>0){
                            countaudio[count-1].play();
                        }
                        else if(count%3==0){
                            motivation[Math.floor(Math.random()*motivation.length)].play();
                        }
                        hit=1;
                        repcount+=1;
                        leftcount+=1;

                    }
                }
                else{
                    hit=0;

                }
            }

        }
        else if(i==3){
            hitpart=[results.poseLandmarks[31],results.poseLandmarks[32]];
            boxx=0.75*canvasWidth;
            ctx1.fillRect(boxx, 0.1*canvasHeight,boxl, 0.05*canvasHeight);
            ctx1.fillStyle='black';
            ctx1.fillText('Kick',boxx,canvasHeight*0.15);
            if(results.poseLandmarks[31].visibility>0.8 || results.poseLandmarks[32].visibility>0.8) {
                if (results.poseLandmarks[31].x>=0.75 || results.poseLandmarks[32].x>=0.75){
                    if(!hit){
                        
                        count+=1;
                        if(count<4 && count>0){
                            countaudio[count-1].play();
                        }
                        else if(count%3==0){
                            motivation[Math.floor(Math.random()*motivation.length)].play();
                        }
                        hit=1;
                        repcount+=1;
                        rightcount+=1;

                    }
                }
                else{
                    hit=0;

                }
            }
        }

    // Punching Bag - White
    ctx1.beginPath();
    ctx1.rect(boxx, boxy,boxl, boxh);
    ctx1.fillStyle = "lightgreen";
    ctx1.fill();
    ctx1.closePath();

    // Punching Bag - Red 
    // X coordinate keeps on moving down
    ctx1.beginPath();
    if(i==0 || i==2){

        ctx1.rect(boxx, boxy+(leftcount/(total/2))*0.6*canvasHeight, boxl, boxh -(leftcount/(total/2))*0.6*canvasHeight );
    }
    else{
        ctx1.rect(boxx, boxy+(rightcount/(total/2))*0.6*canvasHeight, boxl, boxh -(rightcount/(total/2))*0.6*canvasHeight );
    }
    ctx1.fillStyle = "red";
    ctx1.fill();
    ctx1.closePath();

    if(hit==0 & repcount==reptition){

        i=(i+1)%4;
        repcount=0;
    }
    ctx1.beginPath();
    ctx1.lineWidth=canvasWidth*0.01;
    ctx1.rect(boxx, boxy,boxl, boxh);
    ctx1.fillStyle = "black";
    ctx1.stroke();
    ctx1.closePath();

        
    // draw keypoints only for hands
    drawLandmarks(
        ctx1, hitpart,
        {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 20});
    


    }
    else{
        count=0;
        leftcount=0;
        rightcount=0;
        repcount=0;
    }
}