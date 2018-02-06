var encoder = new Whammy.Video(10);
var imageurls = [];
var timer = -1;
var int = function () {

}

function record(auto = false) {
    if (auto) {
        //int = setInterval(canvasize, 100);
    } else {
        int = setInterval(canvasize, 100);
        document.getElementById("recording-status").innerHTML = "Recording...";
        document.getElementById("stop").disabled = false;
    }
    /*var speed = document.getElementById("speed");
    console.log(speed.options[speed.selectedIndex].value)*/
}

function stop() {
    document.getElementById("recording-status").innerHTML = "Compiling video...";
    clearInterval(int);
    encoder.compile(false, function (output) {
        download(output, "video.webm", "video/webm");

        var url = (window.URL || window.webkitURL).createObjectURL(output);
        var video = `<video width="800" height="600" controls>
                    <source src="${url}" type="video/webm">
                    Your browser does not support the video tag.
                    </video> `
        document.getElementById("container").innerHTML = video;
        //document.body.innerHTML += video;
    });

}

function canvasize() {
    timer++;
    html2canvas(document.body, {
        onrendered: function (canvas) {
            encoder.add(canvas);
            if (speed == 1) {
                for (let index = 0; index < 9; index++) {
                    encoder.add(canvas);
                }
            }
            //images.push(canvas);
            //download(canvas.toDataURL(), "image.png", "image/png");
            //imageurls.push(canvas.toDataURL());
        },
        background: "white"
    });
}