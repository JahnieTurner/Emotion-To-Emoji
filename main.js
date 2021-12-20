Prediction1 = ""
Prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera")
Webcam.attach('#camera')

function takesnapshot() {
    Webcam.snap(function(image) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + image + '">'
    })
}
console.log("ml5 version: ", ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1vf0tMrc-/model.json', modelLoaded)

function modelLoaded() {
    console.log("model is loaded")
}

function speak() {
    synth = window.speechSynthesis
    speakdata1 = "The First Prediction Is " + Prediction1
    speakdata2 = "And The Second Prediction Is " + Prediction2
    utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2)
    synth.speak(utterthis)
}

function check() {
    img = document.getElementById("captured_image")
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)

    } else {
        console.log(results)
        Prediction1 = results[0].label
        Prediction2 = results[1].label
        speak()


        document.getElementById("result_emotion_name").innerHTML = Prediction1
        document.getElementById("result_emotion_name2").innerHTML = Prediction2

        if (Prediction1 == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522"
        }
        if (Prediction1 == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#128532"
        }
        if (Prediction1 == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128548"
        }
        if (Prediction2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522"
        }
        if (Prediction2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#128532"
        }
        if (Prediction2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128548"
        }
    }
}