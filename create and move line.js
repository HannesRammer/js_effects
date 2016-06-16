var cssEffects = {
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////MY-CSS3-animations//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    width: 5,

    opacity: 0.0,
    array: [],
    hLines: [],
    vLines: [],
    b1: ["loop", "line", "box"],
    b2: ["loop", "line", "box"],

//create line

    createHorizontalLine: function (startPosX, startPosY, size, hTravelDistance, color, behaviour, direction) {
        var id = cssEffects.hLines.length;
        var hLinesDiv = document.createElement("div");
        hLinesDiv.setAttribute("id", "hLineContainer_" + id);
        hLinesDiv.style.position = "absolute";
        hLinesDiv.style.left = startPosX + "px";
        //hLinesDiv.style.top = startPosY + "px";
        var div = document.createElement("div");
        div.setAttribute("class", "hLine");
        div.setAttribute("id", "hLine_" + id);
        div.style.height = cssEffects.width + "px";
        div.style.width = "0px";
        div.style.position = "absolute";
        div.style.left = "0px";
        div.style.top = startPosY + "px";
        cssEffects.setHorizontalLineColor(div, color);

        var editor = document.createElement("div");
        editor.setAttribute("id", "hEditor_" + id);
        editor.setAttribute("class", "editor");
        if (behaviour == "once") {
            editor.setAttribute("style", "position:absolute;top:0px;opacity:0;");
        } else {
            editor.setAttribute("style", "position:absolute;top:0px;opacity:1;");
        }


        var hStartPoint = document.createElement("div");
        hStartPoint.setAttribute("id", "hStartPoint_" + id);
        hStartPoint.setAttribute("class", "hStartPoint");
        if (behaviour != "once") {
            $(hStartPoint).mouseover(function () {
                cssEffects.showEditorBorder(id, "h")
            });
            $(hStartPoint).mouseout(function () {
                cssEffects.hideEditorBorder(id, "h")
            });
            $(hStartPoint).draggable({drag: function () {
                $("#hEndPoint_" + id).css("top", $("#hStartPoint_" + id).position().top);
                $("#hCrossLine_" + id).css("top", $("#hStartPoint_" + id).position().top);
                if (direction == "left") {
                    $("#hCrossLine_" + id).css("left", $("#hEndPoint_" + id).position().left + cssEffects.width);
                    $("#hCrossLine_" + id).css("width", $("#hStartPoint_" + id).position().left - $("#hEndPoint_" + id).position().left - cssEffects.width);
                } else if (direction == "right") {
                    $("#hCrossLine_" + id).css("left", $("#hStartPoint_" + id).position().left + cssEffects.width);
                    $("#hCrossLine_" + id).css("width", $("#hEndPoint_" + id).position().left - $("#hStartPoint_" + id).position().left - cssEffects.width);
                }

            }});
        }
        hStartPoint.setAttribute("style", "background:#00ffff;width:" + cssEffects.width + "px;height:" + cssEffects.width + "px;position:absolute;left:" + startPosX + "px;top:" + startPosY + "px;");

        var hCrossLine = document.createElement("div");
        hCrossLine.setAttribute("id", "hCrossLine_" + id);
        hCrossLine.setAttribute("class", "hCrossLine");
        //console.log(hTravelDistance + "_" + size);
        if (direction == "left") {

            hCrossLine.setAttribute("style", "background:#00ffff;height:" + cssEffects.width + "px;position:absolute;left:" + (startPosX - hTravelDistance + cssEffects.width) + "px;top:" + startPosY + "px;width:" + (hTravelDistance - cssEffects.width) + "px;opacity:0.2;z-index:999;");
        } else if (direction == "right") {

            hCrossLine.setAttribute("style", "background:#00ffff;height:" + cssEffects.width + "px;position:absolute;left:" + (startPosX + cssEffects.width) + "px;top:" + startPosY + "px;width:" + (hTravelDistance - cssEffects.width) + "px;opacity:0.2;z-index:999;");
        }
        if (behaviour != "once") {

            $(hCrossLine).mouseover(function (e) {
                var mouseX = e.pageX;
                var mouseY = e.pageY;
                //var pageCoords = "( " + e.pageX + ", " + e.pageY + " )";
                //var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
                var hSY = $("#hStartPoint_" + id).position().top;
                var hSX = $("#hStartPoint_" + id).position().left;
                var hEY = $("#hEndPoint_" + id).position().top;
                var hEX = $("#hEndPoint_" + id).position().left;
                var crossSize = $("#hCrossLine_" + id).width();
                var travelRight;
                var travelLeft;
                //console.log("MouseX" + mouseX);
                //console.log("hSX" + hSX);
                //console.log("hEX" + hEX);

                if (direction == "left") {
                    travelRight = hSX - mouseX;
                    travelLeft = mouseX - hEX - cssEffects.width;

                } else if (direction == "right") {
                    travelRight = hEX - mouseX;
                    travelLeft = crossSize - travelRight;

                }
                cssEffects.createHorizontalLine(mouseX, hSY, (size / 2), travelLeft, "rgb(255,0,0)", "once", "left");
                cssEffects.createHorizontalLine(mouseX, hSY, (size / 2), travelRight, "rgb(255,0,0)", "once", "right");
            });

        }

        var hEndPoint = document.createElement("div");
        hEndPoint.setAttribute("id", "hEndPoint_" + id);
        hEndPoint.setAttribute("class", "hEndPoint");
        if (behaviour != "once") {

            $(hEndPoint).mouseover(function () {
                cssEffects.showEditorBorder(id, "h")
            });
            $(hEndPoint).mouseout(function () {
                cssEffects.hideEditorBorder(id, "h")
            });
            $(hEndPoint).draggable({axis: "x", drag: function () {
                if (direction == "left") {
                    $("#hCrossLine_" + id).css("left", $("#hEndPoint_" + id).position().left + cssEffects.width);
                    $("#hCrossLine_" + id).css("width", $("#hStartPoint_" + id).position().left - $("#hEndPoint_" + id).position().left - cssEffects.width);

                } else if (direction == "right") {
                    $("#hCrossLine_" + id).css("width", $("#hEndPoint_" + id).position().left - $("#hStartPoint_" + id).position().left - cssEffects.width);
                }
            }});
        }
        var style;

        if (direction == "left") {

            hEndPoint.setAttribute("style", "background:#ff00ff;width:" + cssEffects.width + "px;height:" + cssEffects.width + "px;position:absolute;left:" + (startPosX - hTravelDistance ) + "px;top:" + startPosY + "px;");
        } else if (direction == "right") {

            hEndPoint.setAttribute("style", "background:#ff00ff;width:" + cssEffects.width + "px;height:" + cssEffects.width + "px;position:absolute;left:" + (startPosX + hTravelDistance ) + "px;top:" + startPosY + "px;");
        }

        $(editor).append(hStartPoint);
        $(editor).append(hCrossLine);
        $(editor).append(hEndPoint);

        $(hLinesDiv).append(div);
        $("body").append(hLinesDiv);
        $("body").append(editor);

        cssEffects.hLines.push(id);


        cssEffects.animateHorizontalLine(id, size, color, behaviour, direction);

    },
    hideEditorBorder: function (id, HV) {
        $("#" + HV + "StartPoint_" + id).css('border', 'none');
        $("#" + HV + "EndPoint_" + id).css('border', 'none');
    },
    showEditorBorder: function (id, HV) {
        $("#" + HV + "StartPoint_" + id).css('border', 'solid 3px #ff3300');
        $("#" + HV + "EndPoint_" + id).css('border', 'solid 3px #ff3300');
    },

    createVerticalLine: function (startPosX, startPosY, size, vTravelDistance, color, behaviour, direction) {
        var id = cssEffects.vLines.length;

        var vLinesDiv = document.createElement("div");
        vLinesDiv.setAttribute("id", "vLineContainer_" + id);
        vLinesDiv.style.position = "absolute";
        vLinesDiv.style.top = startPosY;

        var div = document.createElement("div");
        div.setAttribute("class", "vLine");
        div.setAttribute("id", "vLine_" + id);
        div.style.height = "0px";
        div.style.width = cssEffects.width + "px";
        div.style.position = "absolute";
        div.style.left = startPosX + "px";
        div.style.top = "0px";
        cssEffects.setVerticalLineColor(div, color);

        var editor = document.createElement("div");
        editor.setAttribute("id", "vEditor_" + id);
        editor.setAttribute("style", "position:absolute;top:0px;");

        var vStartPoint = document.createElement("div");
        vStartPoint.setAttribute("id", "vStartPoint_" + id);
        vStartPoint.setAttribute("class", "vStartPoint");
        $(vStartPoint).mouseover(function () {
            cssEffects.showEditorBorder(id, "v")
        });
        $(vStartPoint).mouseout(function () {
            cssEffects.hideEditorBorder(id, "v")
        });
        $(vStartPoint).draggable({drag: function () {
            $("#vEndPoint_" + id).css("left", $("#vStartPoint_" + id).position().left)
        }});

        vStartPoint.setAttribute("style", "background:#00ffff;width:5px;height:5px;position:absolute;left:" + startPosX + "px;top:" + startPosY + "px;");
        var vEndPoint = document.createElement("div");
        vEndPoint.setAttribute("id", "vEndPoint_" + id);
        vEndPoint.setAttribute("class", "vEndPoint");
        $(vEndPoint).mouseover(function () {
            cssEffects.showEditorBorder(id, "v")
        });
        $(vEndPoint).mouseout(function () {
            cssEffects.hideEditorBorder(id, "v")
        });
        $(vEndPoint).draggable({axis: "y"});


        if (direction == "top") {

            vEndPoint.setAttribute("style", "background:#ff00ff;width:5px;height:5px;position:absolute;left:" + startPosX + "px;top:" + (startPosY - vTravelDistance - size) + "px;");
        } else if (direction == "bottom") {

            vEndPoint.setAttribute("style", "background:#ff00ff;width:5px;height:5px;position:absolute;left:" + startPosX + "px;top:" + (startPosY + vTravelDistance + size) + "px;");
        }
        $(editor).append(vStartPoint);
        $(editor).append(vEndPoint);


        $(vLinesDiv).append(div);
        $("body").append(vLinesDiv);
        $("body").append(editor);
        cssEffects.vLines.push(id);

        cssEffects.animateVerticalLine(id, size, color, behaviour, direction);
    },
    setVerticalLineColor: function (div, color) {
        var rgb = cssEffects.rgbString2NumbersString(color);
        var rgba = "rgba(" + rgb + ",0.0) , rgba(" + rgb + ",0.5) ,rgba(" + rgb + ",0.0)";
        div.style.backgroundImage = "linear-gradient(to bottom , " + rgba + ")";
        /* W3C */
        div.style.backgroundImage = "-webkit-gradient(linear, left top, left bottom, color-stop(" + rgb + "), color-stop(" + rgb + "),color-stop(" + rgb + "))";
        /* Chrome,Safari4+ */
        div.style.backgroundImage = "-webkit-linear-gradient(top , " + rgba + ")";
        /* Chrome10+,Safari5.1+ */
        div.style.backgroundImage = "-moz-linear-gradient(top , " + rgba + ")";
        /* FF3.6+ */
        div.style.backgroundImage = "-ms-linear-gradient(top, " + rgba + ")";
        /* IE10+ */
        div.style.backgroundImage = "-o-linear-gradient(top , " + rgba + ")";
        /* Opera 11.10+ */
        div.style.filter = "progid:DXImageTransform.Microsoft.gradient( startColorstr=" + color + ", endColorstr=" + color + ",GradientType=0 )";
        /* IE6-9 */
    },

    setHorizontalLineColor: function (div, color) {
        var rgb = cssEffects.rgbString2NumbersString(color);
        var rgba = "rgba(" + rgb + ",0.0) , rgba(" + rgb + ",0.5) ,rgba(" + rgb + ",0.0)";
        div.style.backgroundImage = "linear-gradient(to right , " + rgba + ")";
        /* W3C */
        div.style.backgroundImage = "-webkit-gradient(linear, top left, top right, color-stop(" + rgb + "), color-stop(" + rgb + "),color-stop(" + rgb + "))";
        /* Chrome,Safari4+ */
        div.style.backgroundImage = "-webkit-linear-gradient(left , " + rgba + ")";
        /* Chrome10+,Safari5.1+ */
        div.style.backgroundImage = "-moz-linear-gradient(left , " + rgba + ")";
        /* FF3.6+ */
        div.style.backgroundImage = "-ms-linear-gradient(left, " + rgba + ")";
        /* IE10+ */
        div.style.backgroundImage = "-o-linear-gradient(left , " + rgba + ")";
        /* Opera 11.10+ */
        div.style.filter = "progid:DXImageTransform.Microsoft.gradient( startColorstr=" + color + ", endColorstr=" + color + ",GradientType=0 )";
        /* IE6-9 */
    },

//create 3 lines with country colors
    createFlag: function (country) {
        //var outerH = $(window).height();
        var startPosY = 100;
        var vTravelDistance = 400;

        //var outerW = $(window).width();
        var startPosX = 100;
        var hTravelDistance = 600;


        var xPos = cssEffects.createRandomX();
        var yPos = cssEffects.createRandomY();
        if (country == "germany") {

            cssEffects.createVerticalLine(xPos, startPosY, vTravelDistance, "rgb(0,0,0)");
            cssEffects.createVerticalLine(xPos + cssEffects.width, startPosY, vTravelDistance, "rgb(208,0,0)");
            cssEffects.createVerticalLine(xPos + cssEffects.width * 2, startPosY, vTravelDistance, "rgb(255,206,0)");
            cssEffects.createHorizontalLine(startPosX, yPos, hTravelDistance, "rgb(0,0,0)");
            cssEffects.createHorizontalLine(startPosX, yPos + cssEffects.width, hTravelDistance, "rgb(208,0,0)");
            cssEffects.createHorizontalLine(startPosX, yPos + cssEffects.width * 2, hTravelDistance, "rgb(255,206,0)");

        } else if (country == "spain") {
            cssEffects.createVerticalLine(xPos, startPosY, vTravelDistance, "rgb(176,8,28)");
            cssEffects.createVerticalLine(xPos + cssEffects.width, startPosY, vTravelDistance, "rgb(255,187,0)");
            cssEffects.createVerticalLine(xPos + cssEffects.width * 2, startPosY, vTravelDistance, "rgb(176,8,28)");
        } else if (country == "austria") {
            cssEffects.createVerticalLine(xPos, startPosY, vTravelDistance, "rgb(255,0,0)");
            cssEffects.createVerticalLine(xPos + cssEffects.width, startPosY, vTravelDistance, "rgb(255,255,255)");
            cssEffects.createVerticalLine(xPos + cssEffects.width * 2, startPosY, vTravelDistance, "rgb(255,0,0)");
        }
    },


//create line at random position
    createRandomLine: function (color) {
        var outerH = $(window).height();
        var startPosY = 0;
        var vTravelDistance = cssEffects.createRandomY();

        cssEffects.createVerticalLine(cssEffects.createRandomX(), startPosY, vTravelDistance, color, cssEffects.behaviour, cssEffects.direction);
    },

//create random x position
    createRandomX: function () {
        var outerW = $(window).width();
        var xPos = parseInt(outerW * Math.floor((Math.random() * 90) + 5) / 100);
        while (cssEffects.array.indexOf(xPos) > -1) {
            xPos = parseInt(outerW * Math.floor((Math.random() * 90) + 5) / 100);
        }
        cssEffects.array.push(xPos);
        return xPos;
    },

//create random y position
    createRandomY: function () {
        var outerH = $(window).height();
        var yPos = parseInt(outerH * Math.floor((Math.random() * 90) + 5) / 100);
        while (cssEffects.array.indexOf(yPos) > -1) {
            yPos = parseInt(outerH * Math.floor((Math.random() * 90) + 5) / 100);
        }
        cssEffects.array.push(yPos);
        return yPos;
    },

//converts string 'rgb(0,0,0)' to string '0,0,0'
    rgbString2NumbersString: function (rgb) {
        return rgb.split("(")[1].split(")")[0];
    },

    getDistance: function (startPos, endPos, size) {
        if (endPos > startPos) {
            return (endPos - startPos - size);
        } else {
            return (startPos - endPos - size);
        }
    },

// animate LinesContainer
    animateHorizontalLine: function (id, size, color, behaviour, direction) {
        var startPosX = $("#hStartPoint_" + id).position().left;
        var startPosY = $("#hStartPoint_" + id).position().top;
        var endPosX = $("#hEndPoint_" + id).position().left;
        var endPosY = $("#hEndPoint_" + id).position().top;
        var hTravelDistance = cssEffects.getDistance(startPosX, endPosX, size);

        $("#hLine_" + id).css("top", startPosY);

        $("#hLineContainer_" + id).css("left", startPosX);
        $("#hLineContainer_" + id).css("top", 0);

        var hArray = [];
        if (direction == "left") {
            hArray.push({width: size + "px", left: "-=" + size + "px"});
            hArray.push({left: "-=" + hTravelDistance + "px"});
            hArray.push({width: "0px"});
        } else if (direction == "right") {
            hArray.push({width: size + "px"});
            hArray.push({left: "+=" + hTravelDistance + "px"});
            hArray.push({width: "0px", left: "+=" + size + "px"});
        }
        $("#hLine_" + id).transition(hArray[0], function () {
                $("#hLineContainer_" + id).transition(hArray[1], function () {
                        $("#hLine_" + id).transition(hArray[2], function () {
                                var resetPos;
                                if (direction == "left") {
                                    if (behaviour == "toggle") {
                                        resetPos = $("#hLine_" + id).position().left - hTravelDistance;
                                    } else {
                                        resetPos = $("#hLine_" + id).position().left + size;
                                    }
                                } else if (direction == "right") {
                                    if (behaviour == "toggle") {
                                        resetPos = $("#hLine_" + id).position().left + hTravelDistance;
                                    } else {
                                        resetPos = $("#hLine_" + id).position().left - size;
                                    }

                                }
                                cssEffects.checkHorizontalBehaviour(id, resetPos, size, color, behaviour, direction);
                            }
                        );
                    }
                );
            }
// Animation complete.
        );
    },

    checkHorizontalBehaviour: function (id, resetPos, size, color, behaviour, direction) {
        $("#hLine_" + id).css("left", resetPos);
        if (behaviour == "loop") {
            cssEffects.animateHorizontalLine(id, size, color, behaviour, direction);
        } else if (behaviour == "line") {
        } else if (behaviour == "once") {
            $('body')[0].removeChild($("#hLineContainer_" + id)[0]);
            $('body')[0].removeChild($("#hEditor_" + id)[0]);
            var index = cssEffects.hLines.indexOf(id);
            cssEffects.hLines.splice(index, 1);

        } else if (behaviour == "toggle") {
            if (direction == "left") {
                cssEffects.animateHorizontalLine(id, size, color, "toggle", "right");
            } else if (direction == "right") {
                cssEffects.animateHorizontalLine(id, size, color, "toggle", "left");
            }
        }
    },


    animateVerticalLine: function (id, size, color, behaviour, direction) {
        var startPosX = $("#vStartPoint_" + id).position().left;
        var startPosY = $("#vStartPoint_" + id).position().top;
        var endPosX = $("#vEndPoint_" + id).position().left;
        var endPosY = $("#vEndPoint_" + id).position().top;
        var vTravelDistance = cssEffects.getDistance(startPosY, endPosY, size);
        $("#vLineContainer_" + id).css("top", startPosY);
        $("#vLine_" + id).css("left", startPosX);
        if (direction == "top") {
            $("#vLine_" + id).transition(
                {
                    height: size + "px",
                    top: "-=" + size + "px"
                },
                {
//                          duration:300,
                    complete: function () {
                        $("#vLineContainer_" + id).transition(
                            {
                                top: "-=" + vTravelDistance + "px"
                            },
                            {
                                //                          duration:1000,
                                //queue:false,
                                complete: function () {
                                    $("#vLine_" + id).transition(
                                        {
                                            height: "0px"//,
//                                        top:"+=" + size + "px"
                                        },
                                        {
                                            //                                       duration:300,
                                            //queue:false,
                                            complete: function () {
                                                var resetPos = $("#vLine_" + id).position().top + size;
                                                cssEffects.checkVerticalBehaviour(id, resetPos, size, color, behaviour, direction);
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        } else if (direction == "bottom") {

            $("#vLine_" + id).transition({
                    height: size + "px",
                    complete: function () {
                        $("#vLineContainer_" + id).transition(
                            {
                                top: "+=" + vTravelDistance + "px",
                                complete: function () {
                                    $("#vLine_" + id).transition(
                                        {
                                            height: "0px",
                                            top: "+=" + size + "px",
                                            complete: function () {
                                                var resetPos = $("#vLine_" + id).position().top - size;
                                                cssEffects.checkVerticalBehaviour(id, resetPos, size, color, behaviour, direction);
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        }
    },
    checkVerticalBehaviour: function (id, resetPos, size, color, behaviour, direction) {
        $("#hLine_" + id).css("left", resetPos);
        if (behaviour == "loop") {
            cssEffects.animateVerticalLine(id, size, color, behaviour, direction);
        } else if (behaviour == "line") {
        } else if (behaviour == "once") {
            $("#vLineContainer_" + id).remove();
            $("#vEditor_" + id).remove();
        } else if (behaviour == "toggle") {
            if (direction == "top") {
                cssEffects.animateVerticalLine(id, size, color, "toggle", "bottom");
            } else if (direction == "bottom") {
                cssEffects.animateVerticalLine(id, size, color, "toggle", "top");
            }
        }
    },

    toggleEditor: function () {
        if ($(".editor")[0]) {
            if ($(".editor").css("opacity") == 0) {
                $(".editor").css("opacity", "1");
            } else if ($(".editor").css("opacity") == 1) {
                $(".editor").css("opacity", "0");

            }
        }
    },
    addBorderToObject: function (effect, behaviour, color) {
        $("body").find("[css-effect='" + effect + "']").each(function () {//function (index) {
            var JQThis = $(this);
            var borderColor;
            if (color) {
                if (color == "border") {
                    borderColor = JQThis.css("border-color");
                }else {
                    borderColor = color;
                }
            } else {
                borderColor = "rgb(255,0,0)";
            }
            var itemX = JQThis.offset().left;
            var itemY = JQThis.offset().top;
            var itemHeight = JQThis.height();
            var itemWidth = JQThis.width();
//            cssEffects.createHorizontalLine(itemX - cssEffects.width, itemY, (itemWidth / 3), itemWidth + cssEffects.width, "rgb(0,255,255)", behaviour, "right");
            cssEffects.createHorizontalLine(itemX, itemY - 2, (itemWidth / 3), itemWidth + (2 * cssEffects.width), borderColor, behaviour, "right");
            cssEffects.createHorizontalLine(itemX + itemWidth + (2 * cssEffects.width), itemY + itemHeight + 4 + cssEffects.width, (itemWidth / 3), itemWidth + (2 * cssEffects.width), borderColor, behaviour, "left");
            //createHorizontalLine(itemX, itemY + itemHeight - cssEffects.width, (itemWidth / 3), itemWidth, "rgb(0,255,255)", "cross", "left");
        });
    },

    /*$("body").mousemove(function (e) {
     var mouseX = e.pageX;
     var mouseY = e.pageY;
     var mouseCX = e.clientX;
     var mouseCY = e.clientY;
     console.log(mouseX+"_MP_"+mouseY);
     console.log(mouseCX+"_MC_"+mouseCY);

     });
     */
    flowObjectGlowText: function (object, effectColor, textColor) {
        var JQObject = $(object);
        if (JQObject.attr("animation") == "deactive" || JQObject.attr("animation") == undefined) {
            cssEffects.animatedTextShadow(JQObject, 0, (100 * JQObject.text().length), "glow", effectColor, textColor, false);
        }
    },
    flowObjectShadowText: function (object, effectColor, textColor) {
        var JQObject = $(object);
        if (JQObject.attr("animation") == "deactive" || JQObject.attr("animation") == undefined) {
            cssEffects.animatedTextShadow(JQObject, 0, (100 * JQObject.text().length), "shadow", effectColor, textColor, false);
        }
    },
    flowObjectBorderText: function (object, effectColor, textColor) {
        var JQObject = $(object);
        if (JQObject.attr("animation") == "deactive" || JQObject.attr("animation") == undefined) {
            cssEffects.animatedTextShadow(JQObject, 0, (100 * JQObject.text().length), "border", effectColor, textColor, false);
        }
    },

    flowTextOnHoverForFXId: function (cssEffectId, effectType, effectColor, textColor) {
        $("body").find("[css-effect='" + cssEffectId + "']").each(function (index) {
            $(this).mouseenter(function () {
                    if ($(this).attr("animation") == "deactive" || $(this).attr("animation") == undefined) {
                        cssEffects.animatedTextShadow($(this), 0, (100 * $(this).text().length), effectType, effectColor, textColor, false);
                    }
                }
            );
        });
    },
    flowTextLoop: function (cssEffectId, effectType, effectColor, textColor) {
        $("body").find("[css-effect='" + cssEffectId + "']").each(function (index) {
            cssEffects.animatedTextShadow($(this), 0, (100 * $(this).text().length), effectType, effectColor, textColor, true);

        });
    },

    animatedTextShadow: function (object, subStart, duration, effectType, effectColor, textColor, loop) {
        object.attr("animation", "active");
        var text = object.text().trim();
        var spanSize = 3;
        var newText;
        var subText;
        if (!textColor) {
            textColor = "black";
        }
        if (!effectColor) {
            effectColor = "red";
        }

        if ((subStart + spanSize) <= text.length) {
            var textPart = text.substring(subStart, subStart + spanSize);
            if (effectType == "neon") {
                subText = "<span style='z-index:999; color: " + textColor + "; text-shadow: 0 0 10px " + textColor + ", 0 0 20px " + textColor + ", 0 0 30px " + effectColor + ", 0 0 40px " + effectColor + ", 0 0 70px " + effectColor + ", 0 0 80px " + effectColor + ", 0 0 100px " + effectColor + ", 0 0 150px " + effectColor + ";'>" + textPart + "</span>";
                //subText = "<span style='z-index:999; color: #FFFFFF; text-shadow: 0 0 10px #FFFFFF, 0 0 20px #FFFFFF, 0 0 30px #FFFFFF, 0 0 40px color + ", 0 0 70px " + color + ", 0 0 80px " + color + ", 0 0 100px " + color + ", 0 0 150px " + color + ";'>" + textPart  + "</span>";
            } else if (effectType == "shadow") {
                subText = "<span style='z-index:999;color:" + textColor + ";text-shadow: -2px -1px 3px " + effectColor + ";'>" + textPart + "</span>";
            } else if (effectType == "border") {
                subText = "<span style='z-index:999;color:" + textColor + ";text-shadow: 0 -1px " + effectColor + ", 1px 0 " + effectColor + ", 0 1px " + effectColor + ", -1px 0 " + effectColor + ";'>" + textPart + "</span>";
            } else if (effectType == "glow") {
                subText = "<span style='z-index:999;color:" + textColor + ";text-shadow: 0 0 0.2em " + effectColor + ", 0 0 0.2em " + effectColor + ", 0 0 0.2em " + effectColor + ";'>" + textPart + "</span>";
            } else if (effectType == "vintage") {
                subText = "<span style='z-index:999;background: none repeat scroll 0 0 " + textColor + ";color: " + effectColor + ";text-shadow: 2px 2px 0 " + textColor + ", 4px 4px 0 " + effectColor + ";'>" + textPart + "</span>";
            } else if (effectType == "fire") {
                subText = "<span style='z-index:999; text-shadow:0 0 7px #FEFCC9, 11px -2px 9px #FEEC85, -16px -2px 8px #FFAE34, 20px -11px 9px #EC760C, -8px -8px 5px #CD4606, -9px -15px 8px #973716, 10px -21px 8px #451B0E;'>" + textPart + "</span>";
            }

            else if (effectType == "letterpress") {
                subText = "<span style='z-index:999; text-shadow: -1px -1px 0 #202020, 1px 1px 0 #fff;'>" + textPart + "</span>";
            }

            newText = text.substring(0, subStart) + subText + text.substring(subStart + spanSize, text.length);
            object[0].innerHTML = newText;
            setTimeout(function () {
                cssEffects.animatedTextShadow(object, ++subStart, duration, effectType, effectColor, textColor, loop);
            }, (duration / text.length));

        } else {
            if (loop) {
                setTimeout(function () {
                    cssEffects.animatedTextShadow(object, 0, duration, effectType, effectColor, textColor, loop);
                }, (duration / text.length));
            } else {
                object.attr("animation", "deactive");
                object[0].innerHTML = text;
            }

        }
    },
    fireShadowText: function (object, color) {
        var JQObject = $(object);
        if (JQObject.attr("animation") == "deactive" || JQObject.attr("animation") == undefined) {
            JQObject.css("text-shadow","");
            JQObject.css("text-shadow","155px 0px 0px "+color);
        }
    },

    headlineLengthList: [],
    headline: function (speedMS) {

        //TODO
        $("body").find("[css-effect='headline']").each(function (index) {
            var text = this.innerHTML;
            var i = 0;
            var width = this.offsetWidth;
            this.innerHTML = "";
            var span = document.createElement("span");
            this.appendChild(span);
            while (span.offsetWidth < (width) && i < text.length) {
                i++;
                span.innerHTML = text.substr(0, i);
            }
            cssEffects.headlineLengthList.push({length: i, text: text});
        });

        setInterval(function () {
            $("body").find("[css-effect='headline']").each(function (index) {
                var text = cssEffects.headlineLengthList[index].text;
                var preCutText = text.substr(0, 1);
                var shownText = text.substr(1, cssEffects.headlineLengthList[index].length + 1);
                var hiddenText = text.substr(cssEffects.headlineLengthList[index].length + 2, text.length);
                this.innerHTML = shownText;
                cssEffects.headlineLengthList[index].text = shownText + "" + hiddenText + "" + preCutText;
            });
        }, speedMS);


    }
};