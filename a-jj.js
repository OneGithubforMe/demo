
// var high=1;
// var low=0;
var clap=0;
var skeleton=white;
POSE_CONNECTIONS=[[24,26],[26,28],[23,25],[25,27],[12,24],[11,23],[24,23],[11,12],[11,13],[13,15],[12,14],[14,16]];
// ==========================================================================================================

var readyaudio=new Audio('Audio files/Instructions/Great-Lets start.mp3');
var readyplayed=0;
var countaudio=[new Audio('Audio files/Count/1.mp3'),new Audio('Audio files/Count/2.mp3'),new Audio('Audio files/Count/3.mp3')];
var countplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];


function Exercise(results) {
    if(!readyplayed){
        readyaudio.play();
        readyplayed=1;
    }
    if (results.poseLandmarks[11].visibility>0.8 && results.poseLandmarks[12].visibility>0.8 && results.poseLandmarks[13].visibility>0.8 && results.poseLandmarks[14].visibility>0.8 && results.poseLandmarks[27].visibility>0.8 && results.poseLandmarks[28].visibility>0.8 ){
        var tx=(results.poseLandmarks[24].x+results.poseLandmarks[23].x)/2;
        
        var a=find_angle(results.poseLandmarks[27],{x:tx,y:results.poseLandmarks[24].y},results.poseLandmarks[28]);
        
        // high = Math.min(high,results.poseLandmarks[0].y);
        // low= Math.max(low,results.poseLandmarks[0].y);

        
        // if (a>=20 && results.poseLandmarks[14].y<results.poseLandmarks[12].y && results.poseLandmarks[13].y<results.poseLandmarks[11].y && (((low-high)/high)>0.3)){
        if (a>=20 && results.poseLandmarks[14].y<results.poseLandmarks[12].y && results.poseLandmarks[13].y<results.poseLandmarks[11].y ){
            skeleton=green;
            if (!clap){
                clap=1;
                count+=1;
                if(count<4 && count>0){
                    countaudio[count-1].play();
                }
                else if(count%3==0){
                    motivation[Math.floor(Math.random()*motivation.length)].play();
                }
                // countElement.innerHTML=count;
                // instruct.innerHTML='Jump and relax';
            }
            // high=1;
            // low=0;
        }
        else if (a<20 && results.poseLandmarks[14].y>results.poseLandmarks[12].y && results.poseLandmarks[13].y>results.poseLandmarks[11].y ){
            if(clap){
                skeleton=white;
                clap=0;
                // instruct.innerHTML='Jump and lift your hands and put legs apart';
                // countElement.innerHTML=count;
            }
            // high=1;
            // low=0;
        }
     
    }
    drawConnectors(ctx1, results.poseLandmarks, POSE_CONNECTIONS,
                   {color: skeleton});
    drawLandmarks(ctx1, [results.poseLandmarks[11],results.poseLandmarks[12],results.poseLandmarks[13],results.poseLandmarks[14],results.poseLandmarks[15],results.poseLandmarks[16],results.poseLandmarks[23],results.poseLandmarks[24],results.poseLandmarks[25],results.poseLandmarks[26],results.poseLandmarks[27],results.poseLandmarks[28]],
                  {color: skeleton, fillColor:skeleton,lineWidth: 4, radius: 6});
    
  }
  
  