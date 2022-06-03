function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("mobilenet", modelLoaded)
}
function modelLoaded(){
  console.log("modle get")
}
function draw(){
  image(video, 0,0, 300,300)
  classifier.classify(video, gotResult)
}
pre_result="";
function gotResult(e, r){
  if (e) {
  console.error(e)
} else {
  console.log(r)
  if ((r[0].confidence > 0.5)&&(pre_result != r[0].label)) {
    pre_result= r[0].label;
    document.getElementById("obj").innerHTML= r[0].label
    document.getElementById("acc").innerHTML= r[0].confidence.toFixed(2)
    synth= window.speechSynthesis;
    utter= "object detected is "+  r[0].label
    UtterThis= new SpeechSynthesisUtterance(utter)
    synth.speak(UtterThis)
  }
}
}


