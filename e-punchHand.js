let xcr,yc,xcl,xr,xl,sl,sr,y;
let touchr = false;
let touchl = false;
let radius = 38;
let wait = 0;
let touch = false;
let up = false;
let upc = 0;
let showr = true;
let showl = true;
let newc = true;
let stroke, fill;
let red = true;
let s = true;
let bump = new Audio('Audio files/Instructions/Gamebump.mp3');
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }

    if(upc==0){
        
        // fix x coordinate as the distance of difference between both shoudlers from each shoulder
        xr = 0.9*(2*poses[12].x - poses[11].x);
        xl = 1.1*(2*poses[11].x - poses[12].x);
        
        sr = 0.7*poses[11].x;
        sl = 1.3*poses[12].x;

        // y coordinate is that of shoulder
        y = poses[12].y;

        upc++;
    }


    if(!showr && !showl){
        showr = true;
        showl = true;
    }


    let a = genShape(xr, xl, sr, sl, y, newc);
    xcr = a[0];
    xcl = a[1];
    yc = a[2];
    newc = a[3];

    // generate circles for punch if in squat
    // create circle on both sides
    if(showl){

        ctx1.beginPath();
        ctx1.arc(xcr, yc, radius, 0, 2 * Math.PI);
        
        if(!touchl)
            {stroke = "black";
            fill = "red";
            }
        
        if(red && (poses[19].visibility > 0.9 || poses[20].visibility > 0.9)) {    
            let xcc =  xcr/canvasWidth;
            let ycc = yc/canvasHeight;
            let distr = Math.pow((xcc-poses[19].x),2) + Math.pow((ycc-poses[19].y),2); // distance of right hand from left circle
            
            if(distr <= Math.pow(radius/canvasHeight, 2)) {
                stroke = '#00ff00';
                fill = '#00ff00';
                touchl = true;
            }
        
        }

        ctx1.globalAlpha = 1;
        ctx1.lineWidth = 8;
        ctx1.strokeStyle = stroke;
        ctx1.stroke();
        ctx1.globalAlpha = 0.8;       
        ctx1.fillStyle = fill;
        ctx1.fill();
        ctx1.closePath();
    }
        
    if(showr){

        ctx1.beginPath();
        ctx1.arc(xcl, yc, radius, 0, 2 * Math.PI);
        if(!touchr){
        stroke = "black";
        fill = "blue";}
        
        if(!red && (poses[19].visibility > 0.9 || poses[20].visibility > 0.9)) {    
            let xcc =  xcl/canvasWidth;
            let ycc = yc/canvasHeight;
            let dist = Math.pow((xcc-poses[20].x),2) + Math.pow((ycc-poses[20].y),2); // distance of left hand from right circle
            
            if(dist <= Math.pow(radius/canvasHeight, 2)) {
                stroke = '#00ff00';
                fill = '#00ff00';
                touchr = true;

            }
        }

        ctx1.lineWidth = 8;
        ctx1.strokeStyle = stroke;
        ctx1.stroke();
        ctx1.globalAlpha = 0.8;       
        ctx1.fillStyle = fill;
        ctx1.fill();
        ctx1.closePath();
    }


     if(touchl) {
            wait++;
            if(wait/fps > 0.3){
                wait = 0;
                bump.play();
                count++;
                touchl = false;
                showl = false;
                red = false;
            }
        }
    

        if(touchr) {
            wait++;
            if(wait/fps > 0.3){
                wait = 0;
                bump.play();
                count++;
                touchr = false;
                showr = false;
                red = true;
            }
        }

    // draw keypoints for both hands
    drawLandmarks(
    ctx1, [poses[20]],
    {color: 'blue', fillColor: 'blue', lineWidth: 4, radius: 15});

    drawLandmarks(
        ctx1, [poses[19]],
        {color: 'red', fillColor: 'red', lineWidth: 4, radius: 15});
    
    ctx2.beginPath();
    ctx2.rect(0.76*canvasWidth, 0.3*canvasHeight, 0.15*canvasWidth, 0.14*canvasHeight)
    ctx2.globalAlpha = red?0.6:0;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.globalAlpha = red?1:0.1;
    ctx2.fillStyle = red?"red":"black";
    ctx2.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
    ctx2.fillText("RED", 0.78*canvasWidth, 0.4*canvasHeight);
    ctx2.closePath();

    ctx2.beginPath();
    ctx2.rect(0.76*canvasWidth, 0.43*canvasHeight, 0.15*canvasWidth, 0.14*canvasHeight)
    ctx2.globalAlpha = red?0:0.3;
    ctx2.fillStyle = "black";
    ctx2.fill();
    ctx2.closePath();

    ctx2.font = Math.floor((canvasWidth*40)/720) + "px Algerian";
    ctx2.globalAlpha = red?0.1:1;
    ctx2.fillStyle = red?"black":"blue";
    ctx2.fillText("BLUE", 0.77*canvasWidth, 0.53*canvasHeight);

}

function genShape(xr, xl, sr, sl, y, newc) {
    
    if(newc)
    { 
        xcr = Math.floor((sr + Math.random()*(xr-sr)) * canvasWidth)
        xcl = Math.floor((xl - Math.random()*(sl-xl)) * canvasWidth)
        
        yc = Math.floor((0.16 + Math.random()*(1.2*y - 0.16)) * canvasHeight);
        
        newc = false;
    }

    return [xcr, xcl, yc, newc]
  
}


function play(count) {
    let one = new Audio('Audio files/Count/1.mp3');
    let two = new Audio('Audio files/Count/2.mp3');
    let three = new Audio('Audio files/Count/3.mp3');
    let great = [
        new Audio('Audio files/Motivation/come on.mp3'),
        new Audio('Audio files/Motivation/Good Work.mp3'),
        new Audio('Audio files/Motivation/Great Going.mp3'),
        new Audio('Audio files/Motivation/Keep breathing.mp3'),
        new Audio('Audio files/Motivation/Keep Going.mp3'),
        new Audio('Audio files/Motivation/Keep Pushing.mp3'),
        new Audio('Audio files/Motivation/Very Good.mp3'),
        new Audio('Audio files/Motivation/Very nice.Keep going.mp3'),
        new Audio('Audio files/Motivation/Very Nice.mp3'),
        new Audio('Audio files/Motivation/you are doing good.mp3'),
    ]
    if(count == 1) {
        one.play();
    } else if (count == 2) {
        two.play();
    } else if (count == 3) {
        three.play();
    } else if(count % 6 == 0) {
        great[Math.floor(Math.random()*great.length)].play();
    } 
}  
