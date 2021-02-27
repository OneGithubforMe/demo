

// ==========================================================================================================
function inbox(landmark,bx,by,bh,bl){
    if (landmark.x>=bx && landmark.x<=bx+bl && landmark.y>=by && landmark.y<=by+bh){
        return true;
    }
    return false;
}



var readyaudio=new Audio('Audio files/Instructions/Great-Lets start.mp3');
var readyplayed=0;
var instructaudio=[new Audio('Audio files/Instructions/Pushup.mp3'),new Audio('Audio files/Instructions/Squat.mp3'),new Audio('Audio files/Instructions/Jump.mp3')];
var instructplayed=0;

var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];



let arrowup = new Image();
arrowup.src = "Arrow icons/Arrow 8-up.png";
let arrowsize = (canvasWidth*80)/720;
let arrowdown = new Image();
arrowdown.src = "Arrow icons/Arrow 8-down.png";

// Run main function
// ==========================================================================================================


var exercise=[{y:0.7*canvasHeight,l:0.3*canvasWidth,h:0.2*canvasHeight},{y:0.4*canvasHeight,l:0.3*canvasWidth,h:0.5*canvasHeight},{y:0.1*canvasHeight,l:0.3*canvasWidth,h:0.55*canvasHeight}]
var xcordinate=[0.05,0.35,0.65];
var i=2;
var rectx=0;
var xidx=Math.floor(Math.random()*3);
rectx=xcordinate.splice(xidx,1)[0];
var hit=0;
var t0=null;
var t1=null;

function Exercise(results) {

    exercise=[{y:0.7*canvasHeight,l:0.3*canvasWidth,h:0.2*canvasHeight},{y:0.3*canvasHeight,l:0.3*canvasWidth,h:0.6*canvasHeight},{y:0.05*canvasHeight,l:0.3*canvasWidth,h:0.60*canvasHeight}];
    

        bx=rectx;
        bl=exercise[i].l/canvasWidth;
        by=exercise[i].y/canvasHeight;
        bh=exercise[i].h/canvasHeight;
        // ctx2.beginPath();
        // ctx2.globalAlpha=0.6;
        // ctx2.fillStyle='black';
        // ctx2.fillRect(0,0,canvasWidth,canvasHeight*0.1);
        // ctx2.globalAlpha=1;
        ctx1.beginPath();
        ctx1.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
        ctx1.textAlign = "center";
        // ctx1.fillStyle='yellow';
        if (i==0){
            // instruct.innerHTML='Do pushup';
            if(!instructplayed){
                instructplayed=1;
                instructaudio[i].play();
            }
            ctx1.globalAlpha=0.6;
            ctx1.fillStyle='black';
            ctx1.fillRect((rectx+0.05)*canvasWidth,canvasHeight*0.47,0.2*canvasWidth,canvasHeight*0.095);
            ctx1.closePath();
            ctx1.globalAlpha=1;
            ctx1.fillStyle='#FFC107';
            ctx1.fillText("Pushup", (rectx+0.15)*canvasWidth, 0.55*canvasHeight);
            ctx1.drawImage(arrowdown, (rectx+0.05+0.1)*canvasWidth - arrowsize/2, 0.55*canvasHeight, arrowsize, arrowsize);
            if (results.poseLandmarks[11].visibility>0.8 && results.poseLandmarks[12].visibility>0.8 && inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl)){
                if(t0==null){
                    t0=timecounter;
                }

                
                
            }
        }
        else if(i==1){
            // instruct.innerHTML='Squat';
            if(!instructplayed){
                instructplayed=1;
                instructaudio[i].play();
            }
            ctx1.globalAlpha=0.6;
            ctx1.fillStyle='black';
            ctx1.fillRect((rectx+0.06)*canvasWidth,canvasHeight*0.07,0.18*canvasWidth,canvasHeight*0.095);
            ctx1.closePath();
            ctx1.globalAlpha=1;
            ctx1.fillStyle='#FFC107';
            ctx1.fillText("Squat", (rectx+0.15)*canvasWidth, 0.15*canvasHeight);
            ctx1.drawImage(arrowdown,  (rectx+0.05+0.1)*canvasWidth - arrowsize/2, 0.15*canvasHeight, arrowsize, arrowsize);
            if (((results.poseLandmarks[23].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[25].visibility>0.8) || (results.poseLandmarks[26].visibility>0.8 && results.poseLandmarks[24].visibility>0.8 && results.poseLandmarks[28].visibility>0.8)) && (inbox(results.poseLandmarks[25],bx,by,bh,bl) || inbox(results.poseLandmarks[26],bx,by,bh,bl))){
                a=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
                b=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
                if((a<120 || b<120) && (inbox(results.poseLandmarks[11],bx,by,bh,bl) && inbox(results.poseLandmarks[12],bx,by,bh,bl))){
                    if(t0==null){
                        t0=timecounter;
                    }

                }
                
                // countElement.innerHTML=count;
                
            }
        }
        else{
            // instruct.innerHTML='Jump';
            if(!instructplayed){
                instructplayed=1;
                instructaudio[i].play();
            }
            ctx1.globalAlpha=0.6;
            ctx1.fillStyle='black';
            ctx1.fillRect((rectx+0.075)*canvasWidth,canvasHeight*0.77,0.15*canvasWidth,canvasHeight*0.095);
            ctx1.closePath();
            ctx1.globalAlpha=1;
            ctx1.fillStyle='#FFC107';
            ctx1.fillText("Jump", (rectx+0.15)*canvasWidth, 0.85*canvasHeight);
            ctx1.drawImage(arrowup, (rectx+0.05+0.1)*canvasWidth - arrowsize/2, 0.75*canvasHeight-arrowsize/1.3 , arrowsize, arrowsize);
            if (results.poseLandmarks[0].visibility>0.8  && results.poseLandmarks[33].y<by && results.poseLandmarks[12].x>=bx && results.poseLandmarks[11].x<=bx+bl){
                if(t0==null){
                    t0=timecounter;
                }

                
            }
        }
        t1=timecounter;
        if(t0==null){
            ctx1.strokeStyle='yellow';
        }
        else{
            ctx1.strokeStyle=green;
        }
        if(t0!=null && t1-t0>=1){
            hit=1;
        }
        if (hit){
                
            i=(i+1)%3;
            count+=1;
            xidx=Math.floor(Math.random()*2);
            tmpx=xcordinate.splice(xidx,1)[0];
            xcordinate.push(rectx);
            rectx=tmpx;
            hit=0;
            t0=null;
            instructplayed=0;

        }
        
        ctx1.beginPath();
        ctx1.lineWidth=5;
        ctx1.rect(rectx*canvasWidth,exercise[i].y,exercise[i].l,exercise[i].h);
        ctx1.stroke();
        ctx1.closePath();
        // drawLandmarks(ctx1, results.poseLandmarks,
        //                   {color: clr, lineWidth: 2});
       
    

  }
  
 