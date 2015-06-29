var canvas = document.getElementById("canvas");

// Mouse events
canvas.addEventListener("mousemove", mouse, true);
canvas.addEventListener("mousedown", mouse, true);
canvas.addEventListener("mouseup", mouse, true);
canvas.addEventListener("wheel", mouse, true);

// Prevent context menu
canvas.addEventListener("contextmenu", function(e) {
    if (e.preventDefault !== undefined)
        e.preventDefault();
    if (e.stopPropagation !== undefined)
        e.stopPropagation();
    return false;
}, false);

// Touch events
canvas.addEventListener("touchcancel", touchcancel, true);
canvas.addEventListener("touchend", touchend, true);
canvas.addEventListener("touchmove", touchmove, true);
canvas.addEventListener("touchstart", touchstart, true);

// Keyboard events
canvas.addEventListener("keydown", keydown, true);
canvas.addEventListener("keyup", keyup, true);

// Global
window.addEventListener("resize", resize, true);

// Motion
window.addEventListener("devicemotion", devicemotion, true);
window.addEventListener("deviceorientation", deviceorientation, true);



function mouse(e) {
    var target = e.target;
    var rect = canvas.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var offsetY = e.clientY - rect.top;
    mainInterface.mouse = {
        buttons: e.buttons,
        position: {
            x: offsetX,
            y: offsetY
        },
        wheel: {
            x: e.deltaX !== undefined ? e.deltaX : 0,
            y: e.deltaY !== undefined ? e.deltaY : 0,
            z: e.deltaZ !== undefined ? e.deltaZ : 0
        }
    };
    mainInterface.time = e.timeStamp;
    timeStep();

}

function keydown(e) {
    var key;
    if (event.key !== undefined) {
        key = event.key;
    } else if (event.keyIdentifier !== undefined) {
        key = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        key = event.keyCode;
    }
    if (mainInterface.keyboard[key] !== true) {
        mainInterface.keyboard[key] = true;
        mainInterface.time = e.timeStamp;
        timeStep();
    }
}

function keyup(e) {
    var key;
    if (event.key !== undefined) {
        key = event.key;
    } else if (event.keyIdentifier !== undefined) {
        key = event.keyIdentifier;
    } else if (event.keyCode !== undefined) {
        key = event.keyCode;
    }
    if (mainInterface.keyboard[key] !== false) {
        mainInterface.keyboard[key] = false;
        mainInterface.time = e.timeStamp;
        timeStep();
    }
}


function resize(e) {
    console.log("resize");
}

function devicemotion(e) {
    console.log("devidemotion");

}

function deviceorientation(e) {
    console.log("deviceorientation");

}

function touchcancel(e) {

}

function touchend(e) {

}

function touchmove(e) {

}

function touchstart(e) {

}



// III stuff

function timeStep() {
    drawCursor(mainInterface.mouse.position.x, mainInterface.mouse.position.y);
    console.log(JSON.stringify(mainInterface));
}


var mainInterface = {
    mouse: {
        buttons: 0,
        position: {
            x: 0,
            y: 0
        },
        wheel: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    time: 0,
    keyboard: {
        "U+0041": false,
        "U+0040": false,
        "U+0026": false,
        "U+00E9": false,
        "U+0022": false,
        "U+0027": false,
        "U+0028": false,
        "U+00A7": false,
        "U+00E8": false,
        "U+0021": false,
        "U+00E7": false,
        "U+00E0": false,
        "U+0029": false,
        "U+002D": false,
        "U+0009": true,
        "U+005A": false,
        "U+0045": false,
        "U+0052": false,
        "U+0054": false,
        "U+0059": false,
        "U+0055": false,
        "U+0049": false,
        "U+004F": false,
        "U+0050": false,
        "Unidentified": false,
        "U+0024": false,
        "Enter": false,
        "Meta": false,
        "Control": false,
        "Alt": false,
        "Shift": false,
        "U+0051": false,
        "U+0053": false,
        "U+0044": false,
        "U+0046": false,
        "U+0047": false,
        "U+0048": false,
        "U+004A": false,
        "U+004B": false,
        "U+004C": false,
        "U+004D": false,
        "U+00F9": false,
        "U+0020": false,
        "U+003C": false,
        "U+0057": false,
        "U+0058": false,
        "U+0043": false,
        "U+0056": false,
        "U+0042": false,
        "U+004E": false,
        "U+002C": false,
        "U+003B": false,
        "U+003A": false,
        "U+003D": false,
        "Left": false,
        "Down": false,
        "Right": false,
        "Up": false,
        "U+001B": false,
        "F1": false,
        "F2": false,
        "F3": false,
        "F4": false,
        "F5": false,
        "F6": false,
        "F7": false,
        "F8": false,
        "F9": false,
        "F10": false,
        "F11": false,
        "F12": false
    }
};





// Rendering stuff





function drawCursor(x, y) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 800, 600);
    var cursor = {
        type: "shadow",
        blur: 20,
        offset: {
            x: 0,
            y: 4
        },
        color: "rgba(0, 0, 0, 0.5)",
        content: {
            type: "translate",
            x: x,
            y: y,
            content: {
                type: "fill",
                style: "rgba(200, 0, 200, 1)",
                content: {
                    type: "path",
                    content: [{
                        type: "begin"
                    }, {
                        type: "move",
                        x: 0,
                        y: 0
                    }, {
                        type: "line",
                        x: 0,
                        y: 15
                    }, {
                        type: "line",
                        x: 10.6,
                        y: 10.6
                    }, {
                        type: "close"
                    }]
                }
            }
        }
    };
    draw(ctx, cursor);
}

// Generic retained mode rendering

function draw(ctx, object) {
    var i;
    switch (object.type) {
        case "move":
            ctx.moveTo(object.x, object.y);
            break;
        case "line":
            ctx.lineTo(object.x, object.y);
            break;
        case "cubic":
            ctx.bezierCurveTo(object.cp1x, object.cp1y, object.cp2x, object.cp2y, object.x, object.y);
            break;
        case "quadratic":
            ctx.quadraticCurveTo(object.cpx, object.cpy, object.x, object.y);
            break;
        case "arc":
            ctx.arcTo(object.x1, object.y1, object.x2, object.y2, object.radius);
            break;
        case "begin":
            ctx.beginPath();
            break;
        case "close":
            ctx.closePath();
            break;
        case "path":
            for (i = 0; i < object.content.length; i++) {
                draw(ctx, object.content[i]);
            }
            break;
        case "rect":
            ctx.rect(object.x1, object.y1, object.x2, object.x2);
            break;
        case "shadow":
            ctx.save();
            ctx.shadowBlur = object.blur;
            ctx.shadowColor = object.color;
            ctx.shadowOffsetX = object.offset.x;
            ctx.shadowOffsetY = object.offset.y;
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "fill":
            ctx.save();
            ctx.fillStyle = object.style;
            draw(ctx, object.content);
            ctx.fill();
            ctx.restore();
            break;
        case "stroke":
            ctx.save();
            ctx.strokeStyle = object.style;
            draw(ctx, object.content);
            ctx.stroke();
            ctx.restore();
            break;
        case "clip":
            ctx.save();
            draw(ctx, object.region);
            ctx.clip();
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "transform":
            ctx.save();
            ctx.transform(object.a, object.b, object.c, object.d, object.e, object.f);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "scale":
            ctx.save();
            ctx.scale(object.width, object.height);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "translate":
            ctx.save();
            ctx.translate(object.x, object.y);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "rotate":
            ctx.save();
            ctx.rotate(object.angle);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "group":
            for (i = 0; i < object.content.length; i++) {
                draw(ctx, object.content[i]);
            }
            break;
        default:
            throw new Error("unexpected graphic element type" + object.type);
    }
}
