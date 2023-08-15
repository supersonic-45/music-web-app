let song1 = "";
let song2 = "";
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0; 
let rightWristY = 0;

let scoreLeftWrist = 0; 
let scoreRightWrist = 0; 

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    let song1_status = song1.isPlaying(); 
    let song2_status = song2.isPlaying(); 

    fill("#FF0000");
    stroke("#FF0000");

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        song2.stop();

        if (song1_status == false) {
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        song1.stop();

        if (song2_status == false) {
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        }
    }
}

function play() {
    song1.play();
    song2.play();
    song1.setVolume(1); 
    song1.rate(1); 
    song2.setVolume(1); 
    song2.rate(1); 
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}
