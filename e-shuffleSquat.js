// global vars
let down = false;
let up = false;
let color = "red";
let xc, yc, xcr, xcl, xd;
let radius = 35;
let upc = 0;
let done = false;
let wait = 0;
let first = true;
let stroke;
let in_box = false;
up = false; // reset
down = false; // reset
let s = true;
let start = new Audio('Audio files/Instructions/Great-Lets start.mp3');

// squat+jump
function Exercise(results) {
    let poses = results.poseLandmarks;

    if(s) {
        start.play()
        s = false;
      }

    let xcc, ycc;

    // draw keypoints
    draw(color, ctx1, poses);

    if(!done){
    stroke = "yellow";}
    // generate box area on alternate sides on alternate counts
    if (count % 2 == 0) {
        xcc = 0.2;
        ycc = 0.15;

        ctx1.beginPath();
        ctx1.rect(0.005 * canvasWidth, 0.37 * canvasHeight, 0.185*canvasWidth, 0.2 * canvasHeight);
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = "black";
        ctx1.fill();
        ctx1.font = Math.floor((canvasWidth*38)/720) + "px Algerian";
        ctx1.globalAlpha = 1;
        ctx1.fillStyle = "yellow";
        ctx1.fillText("Squat", 0.015*canvasWidth, 0.45*canvasHeight)
        ctx1.fillText("Here", 0.025*canvasWidth, 0.55*canvasHeight)
        let arr = new Image();
        arr.src = "Arrow icons/Arrow 8.png";
        let w = (canvasWidth*120)/720;
        let h = (canvasHeight*120)/480;

        ctx1.font = Math.floor((canvasWidth*40)/720) + "px Arial";
        ctx1.drawImage(arr, 0.055*canvasWidth, 0.55*canvasHeight, w, h)
        
        ctx1.closePath();

        ctx1.beginPath();
        ctx1.rect(xcc * canvasWidth, ycc * canvasHeight, 0.24*canvasWidth, 0.64 * canvasHeight);

    } else {
        xcc = 0.56;
        ycc = 0.15;

        ctx1.beginPath();
        ctx1.rect(0.81 * canvasWidth, 0.37 * canvasHeight, 0.185*canvasWidth, 0.2 * canvasHeight);
        ctx1.globalAlpha = 0.6;
        ctx1.fillStyle = "black";    
        ctx1.fill();
        ctx1.font = Math.floor((canvasWidth*38)/720) + "px Algerian";
        ctx1.globalAlpha = 1;
        ctx1.fillStyle = "yellow";
        ctx1.fillText("Squat", 0.82*canvasWidth, 0.45*canvasHeight)
        ctx1.fillText("Here", 0.83*canvasWidth, 0.55*canvasHeight)
        let arr = new Image();
        arr.src = "Arrow icons/Arrow 8 2.png";
        let w = (canvasWidth*105)/720;
        let h = (canvasHeight*120)/480;

        ctx1.drawImage(arr, 0.78*canvasWidth, 0.55*canvasHeight, w, h)
        ctx1.closePath();

        ctx1.beginPath();
        ctx1.rect(xcc * canvasWidth, ycc * canvasHeight, 0.24*canvasWidth, 0.64 * canvasHeight);
        
    }


    // fetch hip points
    let hip = poses[34];

    // check if person is standing inside the box
    if (hip.x > xcc && hip.y > ycc && hip.x < xcc + 0.25 && hip.y < ycc + 0.84) {
        in_box = true;
        // check squat
        let res = checkSquat(poses);
        up = (res[0] == undefined) ? up : res[0];
        down = (res[1] == undefined) ? down : res[1];
        progress = (res[2] == undefined) ? down : res[2];
        color = progress ? "white" : (up ? "white" : (down ? "#00ff00" : "red"));

        // count one squat if person squatted and stood up
        if (down) {   // wait incrementer so that color can be seen for a few frames
            stroke = "#00ff00";
            done = true;
        }
    } else {
        in_box = false;
        color = "red";
    }

    if(done) {
        wait++;
        if(wait/fps > 0.3) {
            count++;
            play(count);
            up = false; // reset
            down = false; // reset
            wait = 0;
            done = false;
        } 
    }


    if(!in_box) {
        let arr = new Image();
        arr.src = "Arrow icons/bi-arrow.png";
        let w = (canvasWidth*150)/720;
        let h = (canvasHeight*90)/480;

        ctx1.font = Math.floor((canvasWidth*40)/720) + "px Arial";
        ctx1.drawImage(arr, 0.4*canvasWidth, 0.5*canvasHeight, w, h)
        
    }

    ctx1.strokeStyle = stroke;
    ctx1.lineWidth = "8";
    ctx1.stroke();
    ctx1.closePath();

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
    } else if(count % 3 == 0) {
        great[Math.floor(Math.random()*great.length)].play();
    } 
}  
