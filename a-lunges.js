
// ==========================================================================================================



var instructstate=0;
var lungestate=0;
// POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12]];
// ==========================================================================================================

var countaudio=[new Audio('Audio files/Count/1.mp3'),new Audio('Audio files/Count/2.mp3'),new Audio('Audio files/Count/3.mp3')];
var countplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];
var instructaudio=new Audio('Audio files/Instructions/Take long strides.mp3');
var instructplayed=0;


var skeleton=white;

function Exercise(results) {
    if(!instructplayed){
        instructaudio.play();
        instructplayed=1;
    }

    skeleton=white;
    if (results.poseLandmarks[23].visibility>0.8 && results.poseLandmarks[24].visibility>0.8 && results.poseLandmarks[25].visibility>0.8 && results.poseLandmarks[26].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[28].visibility>0.8){
        a=find_angle(results.poseLandmarks[24],results.poseLandmarks[26],results.poseLandmarks[28]);
        b=find_angle(results.poseLandmarks[23],results.poseLandmarks[25],results.poseLandmarks[27]);
        
        
            // if(!instructstate){
            //     instruct.innerHTML='Face right and move right leg forward.';
            // }
            // else{
            //     instruct.innerHTML='Face left and move left leg forward.';
            // }
           
                if (a<=120 && b<= 120){
                    skeleton=green;
                    if (!lungestate){
                        count+=1;
                        if(count<4 && count>0){
                            countaudio[count-1].play();
                        }
                        else if(count%3==0){
                            motivation[Math.floor(Math.random()*motivation.length)].play();
                        }
                        // countElement.innerHTML=count;
                        lungestate=1;
                        instructstate=(instructstate+1)%2;
                    }
                }
            
            else{
                lungestate=0;
            }
        }
    
    drawConnectors(ctx1, results.poseLandmarks, [[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12]],
                   {color: skeleton});
    drawLandmarks(ctx1, [results.poseLandmarks[11],results.poseLandmarks[12],results.poseLandmarks[23],results.poseLandmarks[24],results.poseLandmarks[25],results.poseLandmarks[26],results.poseLandmarks[27],results.poseLandmarks[28]],
                    {color: skeleton, fillColor:skeleton,lineWidth: 4, radius: 6});
    // console.log(results.poseLandmarks);
  }
  
  
