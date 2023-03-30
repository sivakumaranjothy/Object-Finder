status="";
object_name="";
objects=[];
status="";
percent=0;

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}


function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    object_name=document.getElementById("object_name").value;

}


function modelLoaded(){
    console.log(" Model Loaded! ");
    status=true;
}


function draw(){
    image(video,0,0,480,380);

    if(status!=""){
        objectDetector.detect(video,gotResult);
        console.log(objects);
        for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="Status: Object Detected";
        document.getElementById("number_of_objects").innerHTML=" Number Of Objects Found :"+ objects.length;
        fill("black");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+" %",objects[i].x,objects[i].y);
        noFill();
        stroke("black");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)

        if(object_name==objects[i].label){
           video.stop();
           object.detect(gotResult)
           document.getElementById("status").innerHTML="Status: "+object_name+" Found";
           synth=window.speechSynthesis;
           Utterthis=newSpeechSythesisUtterance(object_name+" Found");
           synth.speak(Utterthis);

           
        }
        else{
            document.getElementById("status").innerHTML="Status: "+object_name+"  Not Found";
        }
       }
    }
}
    

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}         
