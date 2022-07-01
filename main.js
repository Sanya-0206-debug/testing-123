song = "";
leftWristy = 0;
leftWristx = 0;
rightWristy = 0;
rightWristx = 0;
scoreleftWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelLoaded);
    posenet.on("pose",gotposes);
}
function draw(){
    image(video,0,0,600,500);   
    fill('#ff0000');
    stroke('#000000');
    console.log(scoreleftWrist);
    if(scoreleftWrist > 0.2){
        circle(leftWristx,leftWristy,25);
        innumberleftWristy = Number(leftWristy);
        removedecimalnumber = floor(innumberleftWristy);
        volume = removedecimalnumber/500;
        song.setVolume(volume);
        document.getElementById(volume).innerHTML = volume;
        console.log(volume);
    }
}
function modelLoaded(){
    console.log("modelLoaded");
}
function gotposes(results){
    if(results.length > 0){
        console.log(results);
        leftWristx = results[0].pose.leftWrist.x;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        leftWristy = results[0].pose.leftWrist.y;

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
    }
}
function play(){
    song.play();
    song.rate(1);
    song.setVolume(1);
}