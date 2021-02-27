
// ==========================================================================================================
function inbox(landmark,bx,by,bh,bl){
    if (landmark.x>=bx && landmark.x<=bx+bl && landmark.y>=by && landmark.y<=by+bh){
        return true;
    }
    return false;
}
var blinker=0;
setInterval(function(){blinker+=1;},500);

var waiting=0;
var touched=0;
var inpose=0;
var poselist=[];
var down=0;
var xcenter=null;
var ycenter=null;
var radius=null;
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12],[11,13],[13,15],[12,14],[14,16]];
var skeleton=white;
var t0=null;
var t1=null;
var bump= new Audio('Audio files/Instructions/Gamebump.mp3');
// ==========================================================================================================
var readyaudio=new Audio('Audio files/Instructions/Touch the ball with your hands.mp3');
var readyplayed=0;
var inposeaudio=new Audio('Audio files/Instructions/Lay on back with your knees bent.mp3');
var inposeplayed=0;
var countaudio=[new Audio('Audio files/Count/1.mp3'),new Audio('Audio files/Count/2.mp3'),new Audio('Audio files/Count/3.mp3')];
var countplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];



function Exercise(results) {
    if(!inposeplayed){
        inposeaudio.play();
        inposeplayed=1;
    }
    if (results.poseLandmarks[11].y>0.5 || results.poseLandmarks[12].y>0.5){
        if (!inpose){
            drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                {color: skeleton});
 drawLandmarks(ctx1, [results.poseLandmarks[11],results.poseLandmarks[12],results.poseLandmarks[13],results.poseLandmarks[14],results.poseLandmarks[15],results.poseLandmarks[16],results.poseLandmarks[23],results.poseLandmarks[24],results.poseLandmarks[25],results.poseLandmarks[26],results.poseLandmarks[27],results.poseLandmarks[28]],
                 {color: skeleton, fillColor:skeleton,lineWidth: 4, radius: 6});
            a=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
            b=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
            if ((a<110 || b<110) && ((results.poseLandmarks[11].y>results.poseLandmarks[25].y)||(results.poseLandmarks[12].y>results.poseLandmarks[26].y))){
                if(t0==null){
                    t0=timecounter;
                }
                t1=timecounter;
                if (t1-t0<3){
                    poselist.push(results.poseLandmarks);
                }
                else{
                    t0=null;
                    if(!readyplayed){
                        readyaudio.play();
                        readyplayed=1;
                    }
                    skeleton=green;
                    inpose=1;
                    for (let index = 0; index < poselist.length; index++) {
                        if (poselist[index][23].visibility>0.8) {
                            xcenter+=poselist[index][23].x;
                            ycenter+=(poselist[index][25].y-Math.abs(poselist[index][23].y-poselist[index][25].y));
                        }
                        else{
                            xcenter+=poselist[index][24].x;
                            ycenter+=(poselist[index][26].y-Math.abs(poselist[index][24].y-poselist[index][26].y));
                        }
                        
                    }
                    xcenter=xcenter*canvasWidth/poselist.length;
                    ycenter=ycenter*canvasHeight/poselist.length;
                    radius=canvasHeight*0.05;
                }
            }
        }
        else{
            drawLandmarks(
                ctx1, [results.poseLandmarks[19],results.poseLandmarks[20]],
                {color: '#00FF00', fillColor: '#FF0000', lineWidth: 4, radius: 15});
            
        
        
            
            lefthand=Math.pow((xcenter-results.poseLandmarks[19].x*canvasWidth),2) + Math.pow((ycenter-results.poseLandmarks[19].y*canvasHeight),2);
            righthand=Math.pow((xcenter-results.poseLandmarks[20].x*canvasWidth),2) + Math.pow((ycenter-results.poseLandmarks[20].y*canvasHeight),2);
            if(lefthand<=(radius*radius) || righthand<=(radius*radius)){
                if(!touched){
                    count+=1;
                    bump.play();
                    if(count<4 && count>0){
                        countaudio[count-1].play();
                    }
                    else if(count%3==0){
                        motivation[Math.floor(Math.random()*motivation.length)].play();
                    }
                    touched=1;
                }
                
            }
            if(!touched){
                ctx1.beginPath();
                ctx1.fillStyle='yellow';
                ctx1.arc(xcenter, ycenter, radius, 0, 2 * Math.PI);
                ctx1.fill();
                ctx1.fillStyle='black';
                ctx1.lineWidth=5;
                ctx1.arc(xcenter,ycenter, radius, 0, 2 * Math.PI);
                ctx1.stroke();
            }
            else{
                if(t0==null){
                    t0=blinker;
                    ctx1.beginPath();
                    ctx1.fillStyle=green;
                    ctx1.arc(xcenter, ycenter, radius, 0, 2 * Math.PI);
                    ctx1.fill();
                    ctx1.fillStyle='black';
                    ctx1.lineWidth=5;
                    ctx1.arc(xcenter,ycenter, radius, 0, 2 * Math.PI);
                    ctx1.stroke();

                }
                if(blinker-t0>=1){
                    touched=0;
                    t0=null;

                }
                
            }
        }
    }
    else{
        drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
            {color: skeleton});
drawLandmarks(ctx1, [results.poseLandmarks[11],results.poseLandmarks[12],results.poseLandmarks[13],results.poseLandmarks[14],results.poseLandmarks[15],results.poseLandmarks[16],results.poseLandmarks[23],results.poseLandmarks[24],results.poseLandmarks[25],results.poseLandmarks[26],results.poseLandmarks[27],results.poseLandmarks[28]],
             {color: skeleton, fillColor:skeleton,lineWidth: 4, radius: 6});
        skeleton='white';
        inpose=0;
        xcenter=null;
        ycenter=null;
        poselist=[];
        t0=null;
    }

      


    // console.log(results.poseLandmarks);
  }
  
  
