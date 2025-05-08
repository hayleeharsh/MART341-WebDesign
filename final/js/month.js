var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

c.width = 700;
c.height = 800;

var img = new Image();
img.src = "images/seaglass.jpg";

var opacity = 0;
var imageRevealed = false;
var showPromptText = true;

function drawInitial() {
    ctx.fillStyle = "#f0d4e5";
    ctx.fillRect(0, 0, c.width, c.height);
    
    var title = "May 2025";
    ctx.font = "50px Open Sans";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(title, c.width / 2, 60);
    
    if (showPromptText) {
        ctx.font = "18px Open Sans";
        ctx.fillStyle = "#555";
        ctx.fillText("Click to reveal the featured wine!", c.width / 2, 100);
    }
}

function wrapTextCenter(context, text, centerX, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && n > 0) {
            context.fillText(line.trim(), centerX, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line.trim(), centerX, y);
}

function revealImageWithFade() {
    function animate() {
        drawInitial();

        
        opacity += 0.05;
        if (opacity > 1) opacity = 1;

        
        ctx.globalAlpha = opacity;
        ctx.drawImage(img, 150, 90, 400, 500);
        ctx.globalAlpha = 1.0;

        
        if (opacity >= 1) {
            var desc = "For the month of May, try SeaGlass Sauvignon Blanc from Santa Barbara, CA. For $10.48, enjoy aromas of fresh citrus and passion fruit and the flavors of lychee and pear in one crisp glass. The coastal freshness will inspire you to transition from spring to summer.";
            ctx.font = "20px Open Sans";
            ctx.fillStyle = "#333";
            ctx.textAlign = "center";

            var centerX = c.width / 2;
            var textY = 90 + 500 + 50;
            var maxWidth = c.width - 80;
            var lineHeight = 24;

            wrapTextCenter(ctx, desc, centerX, textY, maxWidth, lineHeight);
        } else {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

img.onload = function () {
    drawInitial();

    c.addEventListener("click", function () {
        if (!imageRevealed) {
            showPromptText = false; 
            imageRevealed = true;
            revealImageWithFade();
        }
    });
};
