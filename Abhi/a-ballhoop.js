var redcount=0;
var bluecount=0;
var l1=[['r',0.375],['b',0.425],['r',0.475],['b',0.525],['r',0.575],['b',0.625]];
var l1y=0.9*canvasHeight-0.025*canvasWidth;
var l2=[['b',0.375],['r',0.425],['b',0.475],['r',0.525],['b',0.575],['r',0.625]];
var l2y=0.9*canvasHeight-0.075*canvasWidth;

var layer1=l1.slice();
var layer2=l2.slice();
var ballradius=0.025*canvasWidth;
var radius=0.05*canvasWidth;
var holdleft=null;
var holdright=null;
var lefthandradius=15;
var righthandradius=15;
var rst=0;
var bump= new Audio('Audio files/Instructions/Gamebump.mp3');
var countaudio=[new Audio('Audio files/Count/1.mp3'),new Audio('Audio files/Count/2.mp3'),new Audio('Audio files/Count/3.mp3')];
var countplayed=0;
var motivation=[new Audio('Audio files/Motivation/come on.mp3'),new Audio('Audio files/Motivation/Good Work.mp3'),new Audio('Audio files/Motivation/Great Going.mp3'),new Audio('Audio files/Motivation/Keep breathing.mp3'),new Audio('Audio files/Motivation/Keep Going.mp3'),new Audio('Audio files/Motivation/Keep Pushing.mp3'),new Audio('Audio files/Motivation/Very Good.mp3'),new Audio('Audio files/Motivation/Very nice Keep going.mp3'),new Audio('Audio files/Motivation/Very Nice.mp3'),new Audio('Audio files/Motivation/you are doing good.mp3')];
var istructaudio=new Audio('Audio files/Instructions/Put balls in the circle of same color.mp3');
var istructplayed=0;
var outlinecolor='black';

function Exercise(results) {
    if(!istructplayed){
        istructaudio.play();
        istructplayed=1;
    }
    if(!rst){
        ballradius=0.025*canvasWidth;
        l1y=0.9*canvasHeight-0.025*canvasWidth;
        l2y=0.9*canvasHeight-0.075*canvasWidth;
        radius=0.05*canvasWidth;
        if(holdleft==null && holdright==null){
            for (let index = 0; index < layer1.length; index++) {
                if(layer1[index][0]=='r'){
                    righthand=Math.pow((layer1[index][1]*canvasWidth-results.poseLandmarks[19].x*canvasWidth),2) + Math.pow((l1y-results.poseLandmarks[19].y*canvasHeight),2);
                    if(righthand<=ballradius*ballradius){
                        holdright=1;
                        layer1.splice(index,1);
                        break;
                    }
                }
                else{
                    lefthand=Math.pow((layer1[index][1]*canvasWidth-results.poseLandmarks[20].x*canvasWidth),2) + Math.pow((l1y-results.poseLandmarks[20].y*canvasHeight),2);
                    if(lefthand<=ballradius*ballradius){
                        holdleft=1;
                        layer1.splice(index,1);
                        break;
                    }
                }
                
            }
        }
        if(holdleft==null && holdright==null){
            for (let index = 0; index < layer2.length; index++) {
                if(layer2[index][0]=='r'){
                    righthand=Math.pow((layer2[index][1]*canvasWidth-results.poseLandmarks[19].x*canvasWidth),2) + Math.pow((l2y-results.poseLandmarks[19].y*canvasHeight),2);
                    if(righthand<=ballradius*ballradius){
                        holdright=1;
                        layer2.splice(index,1);
                        break;
                    }
                }
                else{
                    lefthand=Math.pow((layer2[index][1]*canvasWidth-results.poseLandmarks[20].x*canvasWidth),2) + Math.pow((l2y-results.poseLandmarks[20].y*canvasHeight),2);
                    if(lefthand<=ballradius*ballradius){
                        holdleft=1;
                        layer2.splice(index,1);
                        break;
                    }
                }
                
            }
        }
        if(holdleft){
            hoopdist=Math.pow((0.8*canvasWidth-results.poseLandmarks[20].x*canvasWidth),2) + Math.pow((0.3*canvasHeight-results.poseLandmarks[20].y*canvasHeight),2);
            if(hoopdist<=radius*radius){
                bump.play();
                holdleft=null;
                lefthandradius=15;
                bluecount+=1;
                count=redcount+bluecount;
                if(count<4 && count>0){
                    countaudio[count-1].play();
                }
                else if(count%3==0){
                    motivation[Math.floor(Math.random()*motivation.length)].play();
                }
            }
        }
        else if(holdright){
            hoopdist=Math.pow((0.2*canvasWidth-results.poseLandmarks[19].x*canvasWidth),2) + Math.pow((0.3*canvasHeight-results.poseLandmarks[19].y*canvasHeight),2);
            if(hoopdist<=radius*radius){
                bump.play();
                holdright=null;
                righthandradius=15;
                redcount+=1;
                count=redcount+bluecount;
                if(count<4 && count>0){
                    countaudio[count-1].play();
                }
                else if(count%3==0){
                    motivation[Math.floor(Math.random()*motivation.length)].play();
                }
            }
        }
        count=redcount+bluecount;
        if(count!=0 && count%(l1.length+l2.length)==0 && (layer1.length==0 && layer2.length==0)){
            rst=1;
        }
        // Hoops

    
    }
    else{
        layer1=l1.slice();
        layer2=l2.slice();
        rst=0;
    }
    ctx1.beginPath();
    ctx1.globalAlpha=0.4;
    ctx1.fillStyle='red';
    ctx1.arc(0.15*canvasWidth, 0.2*canvasHeight, radius, 0, 2 * Math.PI);
    ctx1.fill();

    ctx1.beginPath();
    ctx1.fillStyle='blue';
    ctx1.arc(0.85*canvasWidth, 0.2*canvasHeight, radius, 0, 2 * Math.PI);
    ctx1.fill();

    ctx1.globalAlpha=1;

    ctx1.beginPath();
    ctx1.fillStyle='black';
    ctx1.lineWidth=5;
    ctx1.arc(0.85*canvasWidth, 0.2*canvasHeight, radius, 0, 2 * Math.PI);
    ctx1.stroke();

    ctx1.beginPath();
    ctx1.fillStyle='black';
    ctx1.arc(0.15*canvasWidth, 0.2*canvasHeight, radius, 0, 2 * Math.PI);
    ctx1.stroke();

    ctx1.fillStyle='yellow';
    ctx1.font = "900 "+canvasHeight*0.05+"px Arial";
    ctx1.textAlign='center';
    // ctx1.fillText('Count',0.85*canvasWidth,0.19*canvasHeight);
    ctx1.fillText(bluecount,0.85*canvasWidth,0.22*canvasHeight);
    // ctx1.fillText('Count',0.15*canvasWidth,0.19*canvasHeight);
    ctx1.fillText(redcount,0.15*canvasWidth,0.22*canvasHeight);


    for (let index = 0; index < layer1.length; index++) {
        ctx1.beginPath();
        if(layer1[index][0]=='r'){
            ctx1.fillStyle='red';
        
        }
        else{
            ctx1.fillStyle='blue';
        }
        ctx1.arc(layer1[index][1]*canvasWidth, l1y, ballradius, 0, 2 * Math.PI);
        ctx1.fill();
        
    }
    for (let index = 0; index < layer2.length; index++) {
        ctx1.beginPath();
        if(layer2[index][0]=='r'){
            ctx1.fillStyle='red';
        
        }
        else{
            ctx1.fillStyle='blue';
        }
        ctx1.arc(layer2[index][1]*canvasWidth, l2y, ballradius, 0, 2 * Math.PI);
        ctx1.fill();
        
    }
    outlinecolor='black';
    if(holdright){
        outlinecolor=green;
        righthandradius=ballradius;
    }
    drawLandmarks(ctx1, [results.poseLandmarks[19]],
            {color: outlinecolor, fillColor:'red',lineWidth: 4, radius: righthandradius});

    outlinecolor='black';
    if(holdleft){
        outlinecolor=green;
        lefthandradius=ballradius;
    }
    drawLandmarks(ctx1, [results.poseLandmarks[20]],
                {color: outlinecolor, fillColor:'blue',lineWidth: 4, radius: lefthandradius});
}