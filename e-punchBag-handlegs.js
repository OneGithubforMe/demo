let wait = 0;
let c = 0;
let xcc, ycc;
let punch = false;
let right = true;
let s = true;
let start = new Audio('Audio files/Instructions/Punch or kick the bags as they appear.mp3');
let bump = new Audio('Audio files/Instructions/Gamebump.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }    
    
    ycc = 0.15;

    if(!right)
    {    
        ctx1.beginPath();
        ctx1.rect(0.005 * canvasWidth, 0.37 * canvasHeight, 0.145*canvasWidth, 0.2 * canvasHeight);
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = "black";
        ctx1.fill();
        ctx1.font = Math.floor((canvasWidth*30)/720) + "px Algerian";
        ctx1.globalAlpha = 1;
        ctx1.fillStyle = "yellow";
        ctx1.fillText("Hit", 0.013*canvasWidth, 0.45*canvasHeight)
        ctx1.fillText("Here", 0.023*canvasWidth, 0.55*canvasHeight)
        let arr1 = new Image();
        arr1.src = "Arrow icons/Arrow 8.png";
        let w = (canvasWidth*120)/720;
        let h = (canvasHeight*120)/480;

        ctx1.font = Math.floor((canvasWidth*40)/720) + "px Arial";
        ctx1.drawImage(arr1, 0.025*canvasWidth, 0.55*canvasHeight, w, h)
        
        ctx1.closePath();

        xcc = 0.16;
    }
    if(right)
    {        
        ctx1.beginPath();
        ctx1.rect(0.85 * canvasWidth, 0.37 * canvasHeight, 0.145*canvasWidth, 0.2 * canvasHeight);
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = "black";    
        ctx1.fill();
        ctx1.font = Math.floor((canvasWidth*30)/720) + "px Algerian";
        ctx1.globalAlpha = 1;
        ctx1.fillStyle = "yellow";
        ctx1.fillText("Hit", 0.88*canvasWidth, 0.45*canvasHeight)
        ctx1.fillText("Here", 0.88*canvasWidth, 0.55*canvasHeight)
        let arr = new Image();
        arr.src = "Arrow icons/Arrow 8 2.png";
        w = (canvasWidth*105)/720;
        h = (canvasHeight*120)/480;

        ctx1.drawImage(arr, 0.83*canvasWidth, 0.55*canvasHeight, w, h)
        ctx1.closePath();

        xcc = 0.74;
    }
    
    // Punching Bag - White
    ctx1.beginPath();
    ctx1.rect(xcc*canvasWidth - 4, ycc*canvasHeight - 4, canvasWidth/10 + 8, 0.7*canvasHeight + 8);
    ctx1.lineWidth = 6;
    ctx1.strokeStyle = "white";
    ctx1.stroke();
    ctx1.globalAlpha = 0.4;
    ctx1.fillStyle = "white";
    ctx1.fill();
    ctx1.closePath();

    // Punching Bag - Red 
    // X coordinate keeps on moving down
    ctx1.beginPath();
    ctx1.globalAlpha = 1;
    ctx1.rect(xcc*canvasWidth, ((ycc + (c/10*0.7))*canvasHeight), canvasWidth/10, (0.7 - 0.7 * c/10)*canvasHeight);
    ctx1.fillStyle = "red";
    ctx1.fill();
    ctx1.closePath();
    
    let rightHand = poses[19];
    let leftHand = poses[20];
    let rightLeg1 = poses[27];
    let rightLeg2 = poses[29];
    let rightLeg3 = poses[31];
    let leftLeg1 = poses[28];
    let leftLeg2 = poses[30];
    let leftLeg3 = poses[32];

    // check if hand is in punching bag
    if(rightHand.x > xcc && rightHand.y > ycc && rightHand.x < xcc + 0.1 && rightHand.y < ycc + 0.7 ||
        leftHand.x > xcc && leftHand.y > ycc && leftHand.x < xcc + 0.1 && leftHand.y < ycc + 0.7 ||
       rightLeg1.x > xcc && rightLeg1.y > ycc && rightLeg1.x < xcc + 0.1 && rightLeg1.y < ycc + 0.7 ||
        rightLeg2.x > xcc && rightLeg2.y > ycc && rightLeg2.x < xcc + 0.1 && rightLeg2.y < ycc + 0.7 ||
        rightLeg3.x > xcc && rightLeg3.y > ycc && rightLeg3.x < xcc + 0.1 && rightLeg3.y < ycc + 0.7 ||
        leftLeg1.x > xcc && leftLeg1.y > ycc && leftLeg1.x < xcc + 0.1 && leftLeg1.y < ycc + 0.7 ||
        leftLeg2.x > xcc && leftLeg2.y > ycc && leftLeg2.x < xcc + 0.1 && leftLeg2.y < ycc + 0.7 ||
        leftLeg3.x > xcc && leftLeg3.y > ycc && leftLeg3.x < xcc + 0.1 && leftLeg3.y < ycc + 0.7) 
        {
            bump.play();
            punch = true;
        } else {
            if(punch) {
                count++;
                c++;
                play(count);
                wait = 0;
                punch = false;
            }
        }
        if(c==10) {
            c = 0;
            right = !right;
        }
       
        

    // draw keypoints only for hands
    drawLandmarks(
        ctx1, [rightHand, leftHand, rightLeg3, leftLeg3],
        {color: '#e68214', fillColor: '#e68214', lineWidth: 4, radius: 15});
    


    }

function play(count) {
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
    
    if(count % 5 == 0) {
        great[Math.floor(Math.random()*great.length)].play();
    } 
}  
    