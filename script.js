var leftWristXCoordinate = 0;
var leftWristYCoordinate = 0;
var rightWristXCoordinate = 0;
var rightWristYCoordinate = 0;
var isLeftWristOnTheCanvas = 0;
var isRightWristOnTheCanvas = 0;
var songStatus = "";
var song2Status = "";
var song2 = "";
var song4 = "";

function preload() {
    song2 = loadSound("music.mp3");
    song4 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNetModel = ml5.poseNet(video, modelLoaded);
    poseNetModel.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("poseNet model is working");
}

function draw() {
    image(video, 0, 0, 400, 400);

    songStatus = song2.isPlaying();

    fill("#69d7ff");
    stroke("ffc0ff");

    if(isLeftWristOnTheCanvas > 0.2) {
        circle(leftWristXCoordinate, leftWristYCoordinate, 14);
        song4.stop();
        if(songStatus == false) {
            song2.play();
            document.getElementById("songName").innerHTML = "Song 1";
        }
    }

    if(isRightWristOnTheCanvas > 0.2) {
        circle(rightWristXCoordinate, rightWristYCoordinate, 14);
        song2.stop();
        if(song2Status == false) {
            song4.play();
            document.getElementById("songName").innerHTML = "Song 2";
        }
    }
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        isLeftWristOnTheCanvas = results[0].pose.keypoints[9].score;
        isRightWristOnTheCanvas = results[0].pose.keypoints[10].score;
        leftWristXCoordinate = results[0].pose.leftWrist.x;
        leftWristYCoordinate = results[0].pose.leftWrist.y;
        rightWristXCoordinate = results[0].pose.rightWrist.x;
        rightWristYCoordinate = results[0].pose.rightWrist.y;
    }
}