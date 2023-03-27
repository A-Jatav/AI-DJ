var song1 = "";
var song2 = "";
var song3 = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var scoreLeftWrist = 0;
var scoreRightWrist = 0;
function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("Hedwig's Theme.mp3");
    song3 = loadSound("Imperial March.mp3");
};

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.poseNet(video, modelLoaded);
    classifier.on('pose', gotResults);
};

function modelLoaded() {
    console.log("ml5 Version: " + ml5.version + ", PoseNet has been initialized successfully!");
};

function draw() {
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if (scoreLeftWrist > 0.05) {
        circle(leftWristX, leftWristY, 20);
        leftWristYInNumber = Math.floor(Number(leftWristY));
        volume_number = leftWristYInNumber / 500;
        song1.setVolume(volume_number);
        song2.setVolume(volume_number);
        song3.setVolume(volume_number);
        document.getElementById("volume").innerHTML = "Volume: " + volume_number;
    };
    if(scoreRightWrist > 0.05){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY >= 0 && rightWristY < 100){
            song1.rate(0.5);
            song2.rate(0.5);
            song3.rate(0.5);
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
        }
        else if(rightWristY >= 100 && rightWristY < 200){
            song1.rate(1);
            song2.rate(1);
            song3.rate(1);
            document.getElementById("speed").innerHTML = "Speed: 1x";
        }
        else if(rightWristY >= 200 && rightWristY < 300){
            song1.rate(1.5);
            song2.rate(1.5);
            song3.rate(1.5);
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
        }
        else if(rightWristY >= 300 && rightWristY < 400){
            song1.rate(2);
            song2.rate(2);
            song3.rate(2);
            document.getElementById("speed").innerHTML = "Speed: 2x";
        }
        else if(rightWristY >= 400 && rightWristY <= 500){
                song1.rate(2.5);
                song2.rate(2.5);
                song3.rate(2.5);
                document.getElementById("speed").innerHTML = "Speed: 2.5x";
        };
    };
};

function gotResults(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left wrist x = " + leftWristX + " left wrist y = " + leftWristY + " right wrist x = " + rightWristX + " right wrist y = " + rightWristY + " left wrist score = " + scoreLeftWrist + " right wrist score = " + scoreRightWrist);
    };
};

function music_play() {
    if (document.getElementById("choose_song").value == "music.mp3") {
        song2.stop();
        song3.stop();
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
    }
    else if (document.getElementById("choose_song").value == "Hedwig's Theme.mp3") {
        song1.stop();
        song3.stop();
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
    }
    else {
        song1.stop();
        song2.stop();
        song3.play();
        song3.setVolume(1);
        song3.rate(1);
    };
};

function music_stop() {
    song1.stop();
    song2.stop();
    song3.stop();
};