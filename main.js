
status="";
objects=[];
function preload(){
}

function setup(){
    canvas=createCanvas(350,350);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(350,350);
    video.hide();
    objectdetector = ml5.objectDetector('cocossd', modelLoaded);
}

function modelLoaded(){
    console.log("Model has been loaded");
    status=true;
    document.getElementById("status").innerHTML="Status: Detecting objects";
}

function draw(){
    image(video, 0, 0, 350, 350);
    if(status != ""){
            r=random(255);
            g=random(255);
            b=random(255);
            objectdetector.detect(video, gotResults);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status: objects detected.";
            document.getElementById("no.ofobjects").innerHTML="No. of objects detected: "+objects.length;
            fill(r,g,b);
            stroke(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+ " "+percent+" %", objects[i].x, objects[i].y-15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        objects=results;
    }
}