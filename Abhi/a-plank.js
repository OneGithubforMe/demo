
// ==========================================================================================================



var instructstate=0;
var t0=null;
var t1=null;
var plankpose=0;
var inposition=0;
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12],[11,13],[13,15],[12,14],[14,16]];
// ==========================================================================================================

var inposeaudio=new Audio('Audio files/Instructions/Get in Plank Position.mp3');
var inposeplayed=0;
var readyaudio=new Audio('Audio files/Instructions/Great-Lets start.mp3');
var readyplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];

var skeleton=white;
var keephips=new Audio('Audio files/Instructions/Keep your hipps high.mp3');



function Exercise(results) {
    if(!inposeplayed){
        inposeaudio.play();
        inposeplayed=1;
    }
    skeleton=white;
    if ((results.poseLandmarks[11].y>0.5 || results.poseLandmarks[12].y>0.5) && (Math.abs(results.poseLandmarks[11].x-results.poseLandmarks[23].x)/Math.abs(results.poseLandmarks[11].y-results.poseLandmarks[23].y)>1 || Math.abs(results.poseLandmarks[12].x-results.poseLandmarks[24].x)/Math.abs(results.poseLandmarks[12].y-results.poseLandmarks[24].y)>1) && ((results.poseLandmarks[23].x>results.poseLandmarks[25].x && results.poseLandmarks[25].x>results.poseLandmarks[27].x) || (results.poseLandmarks[27].x>results.poseLandmarks[25].x && results.poseLandmarks[25].x>results.poseLandmarks[23].x) || (results.poseLandmarks[24].x>results.poseLandmarks[26].x && results.poseLandmarks[26].x>results.poseLandmarks[28].x) || (results.poseLandmarks[28].x>results.poseLandmarks[26].x && results.poseLandmarks[26].x>results.poseLandmarks[24].x))){
        if ((results.poseLandmarks[11].visibility>0.8 && results.poseLandmarks[15].visibility>0.8 && results.poseLandmarks[13].visibility>0.8) || (results.poseLandmarks[12].visibility>0.8 && results.poseLandmarks[14].visibility>0.8 && results.poseLandmarks[16].visibility>0.8)){
            
            if (inposition){
                a=find_angle(results.poseLandmarks[11],results.poseLandmarks[13],results.poseLandmarks[15]);
                b=find_angle(results.poseLandmarks[12],results.poseLandmarks[14],results.poseLandmarks[16])
                if(((a<120 && a>70) || (b<120 && b>70)) && (results.poseLandmarks[11].y>=results.poseLandmarks[23].y || results.poseLandmarks[12].y>=results.poseLandmarks[24].y)){
                    
                        if(t0==null || !plankpose){
                            t0=timecounter;
                            plankpose=1;
                        }
                        skeleton=green;
                        t1=timecounter;
                        if((t1-t0)==1){
                            count+=1;
                            if(count>0 && count%3==0){
                                motivation[Math.floor(Math.random()*motivation.length)].play();
                            }
                            t0=null;
                        }
                    

                        
                }
                else{
                    plankpose=0;
                    keephips.play();


                }


            }
            else{
                // Play audio
                if(results.poseLandmarks[13].y>results.poseLandmarks[23].y || results.poseLandmarks[14].t>results.poseLandmarks[24].y){
                    if(t0==null){
                        t0=timecounter;
                    }
                    t1=timecounter;
                    if(t1-t0>=2){
                        t0=null;
                        inposition=1;
                        if(!readyplayed){
                            readyplayed=1;
                            readyaudio.play();
                        }
                    }

                }
            }
        }
    }
    else{
        skeleton='white';
        inposition=0;
    }
      


    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
        {color: skeleton});
    drawLandmarks(ctx1, [results.poseLandmarks[11],results.poseLandmarks[12],results.poseLandmarks[13],results.poseLandmarks[14],results.poseLandmarks[15],results.poseLandmarks[16],results.poseLandmarks[23],results.poseLandmarks[24],results.poseLandmarks[25],results.poseLandmarks[26],results.poseLandmarks[27],results.poseLandmarks[28]],
       {color: skeleton, fillColor:skeleton,lineWidth: 4, radius: 6});
  }
  
  
