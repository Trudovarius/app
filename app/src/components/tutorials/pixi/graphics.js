// VARIABLES WITH RENDUNDANT TEXTS
var help = "let shape = new PIXI.Graphics();\n" +
           "shape.beginFill(color); // for example color = 0x000000 (black)\n" +
           "shape.drawRect(x,y,width,height);\n" +
           "shape.endFill();\n" +
           "stage.addChild(shape);";

var documentationLink = "<br> Check the documentation for " +
    " <a href='https://pixijs.download/dev/docs/PIXI.Graphics.html' target='_blank'>PIXI.Graphics</a>.";

var useDrawRect = "<br> Use functions <i>drawRect</i>, <i>beginFill</i> and <i>endFill</i>.";
var addChild = "<br> Add it to stage using <i>stage.addChild()</i>.";
var useDrawCircle = "<br> Use functions <i>drawCircle</i>, <i>beginFill</i> and <i>endFill</i>.";
var warning = "<br> Add only the items mentioned and only in the right order, otherwise it will be taken as false.";



// FUNCTIONS USED IN VERIFICATION

function checkGraphicsData(stage) {
  if (stage.children.length === 0) {
    return 'Add the shape to stage.';
  } else if (!stage.children[0].geometry.graphicsData.length > 0) {
    return 'Problem with the shape.';
  } else if (stage.children[0].geometry.graphicsData[0] === undefined || !stage.children[0].geometry.graphicsData[0].shape) {
    return 'Problem with the shape.';
  } else {
    return true;
  }
}

function checkMultipleGraphicsData(stage, count) {
  if (stage.children.length < count) {
    return 'Add the shapes to stage.';
  } else if (stage.children.length > count) {
    return 'You only need to add ' + count + "shapes.";
  } else {
    for (let child of stage.children) {
      if (!stage.children[0].geometry.graphicsData) {
        return 'Problem with the shape.';
      } else if (!stage.children[0].geometry.graphicsData[0].shape) {
        return 'Problem with the shape.';
      }
    }
  }
  return true;
}

function checkRect(stage, shape, x, y, width, height) {
  if (shape.type === 1 && shape.x === x && shape.y === y && shape.width === width && shape.height === height) {
    return 'SUCCESS!!';
  } else {
    return 'Wrong shape!';
  }
}

function checkRectAndColor(stage, data, x, y, width, height, color) {
  let shape = data.shape;
  if (shape.type === 1 && shape.x === x && shape.y === y && shape.width === width && shape.height === height) {
    if (data.fillStyle.color === color) {
      return 'SUCCESS!!';
    } else {
      return 'Wrong color!';
    }
  } else {
    return 'Wrong shape!';
  }
}


//   stage.addChild(new PIXI.Graphics().beginFill(0xFF00FF).drawRect(50,50,100,100).endFill());


var squares = [
  {
    id: "graphics-square-1",
    name: "PIXI.Graphics Square",
    difficulty: 1,
    task: "Create a square of any color at position x 50, y 50 with width 100px and height 100px." +
        useDrawRect + addChild + documentationLink + warning,
    setup: (stage) => {},
    code: help,
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        return checkRect(stage, shape, 50, 50, 100, 100);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-2",
    name: "PIXI.Graphics Square",
    difficulty: 1,
    task: "Create rectangle of any color at position x 333, y 100 with width 200 and height 69." +
        useDrawRect + addChild + documentationLink + warning,
    setup: (stage) => {},
    code: help,
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        return checkRect(stage, shape, 333, 100, 200, 69);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-3",
    name: "PIXI.Graphics Square",
    difficulty: 2,
    task: "Create rectangle  of any color at position x 10, y 123 with width 400 and height 200. " +
        useDrawRect + addChild + documentationLink + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        return checkRect(stage, shape, 10, 123, 400, 200);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-4",
    name: "PIXI.Graphics Square",
    difficulty: 2,
    task: "Create rectangle of any color at position x 0, y 0 with width 400 and height 500. " +
        useDrawRect + addChild + documentationLink + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        return checkRect(stage, shape, 0, 0, 400, 500);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-5",
    name: "PIXI.Graphics Square",
    difficulty: 3,
    task: "Create rectangle with color 0xff3399 at position x 150, y 0 with width 250 and height 10. " +
        useDrawRect + documentationLink + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let data = stage.children[0].geometry.graphicsData[0];
        return checkRectAndColor(stage, data, 150, 0, 250, 10, 0xff3399);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-6",
    name: "PIXI.Graphics Square",
    difficulty: 3,
    task: "Create rectangle with color 0xe60000 at position x 150, y 150 with width -140 and height -130. " +
        useDrawRect + documentationLink + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let data = stage.children[0].geometry.graphicsData[0];
        return checkRectAndColor(stage, data, 150, 150, -140, -130, 0xe60000);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-7",
    name: "PIXI.Graphics Square",
    difficulty: 4,
    task: "Create rectangle with color 0xe6e600 at position x 300, y 400 with width 50 and height -200. " + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let data = stage.children[0].geometry.graphicsData[0];
        return checkRectAndColor(stage, data, 300, 400, 50, -200, 0xe6e600);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-8",
    name: "PIXI.Graphics Square",
    difficulty: 4,
    task: "Create rectangle with color 0x4d4d00 at position x 500, y 500 with width -500 and height -500. " + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let data = stage.children[0].geometry.graphicsData[0];
        return checkRectAndColor(stage, data, 500, 500, -500, -500, 0x4d4d00);
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-9",
    name: "PIXI.Graphics Square",
    difficulty: 5,
    task: "Create rectangle with color 0x000000 at position x 50, y 50 with width 300 and height 300. <br>" +
          "Then create a second rectangle with color 0xFFFFFF at position x 100, y 100 with width 200 and height 200. <br>" +
          "Add both to stage." + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkMultipleGraphicsData(stage, 2);
      if (check === true) {
        let data1 = stage.children[0].geometry.graphicsData[0];
        let res1 = checkRectAndColor(stage, data1, 50, 50, 300, 300, 0x000000);
        let data2 = stage.children[1].geometry.graphicsData[0];
        let res2 = checkRectAndColor(stage, data2, 100, 100, 200, 200, 0xffffff);
        if (res1 === "SUCCESS!!" && res2 === "SUCCESS!!") {
          return res1;
        } else if (res1 === "SUCCESS!!") {
          return res2;
        } else if (res2 === "SUCCESS!!") {
          return res1;
        } else {
          return res1;
        }
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-10",
    name: "PIXI.Graphics Square",
    difficulty: 5,
    task: "Create rectangle with color 0xFF0000 at position x 123, y 66 with width 158 and height -58. <br>" +
          "Then create a second rectangle with color 0x0000FF at position x 321, y 16 with width -200 and height 45. <br>" +
          "Add both to stage." + warning,
    setup: (stage) => {},
    code: '',
    verification: (stage) => {
      let check = checkMultipleGraphicsData(stage, 2);
      if (check === true) {
        let data1 = stage.children[0].geometry.graphicsData[0];
        let res1 = checkRectAndColor(stage, data1, 123, 66, 158, -58, 0xFF0000);
        let data2 = stage.children[1].geometry.graphicsData[0];
        let res2 = checkRectAndColor(stage, data2, 321, 16, -200, 45, 0x0000FF);
        if (res1 === "SUCCESS!!" && res2 === "SUCCESS!!") {
          return res1;
        } else if (res1 === "SUCCESS!!") {
          return res2;
        } else if (res2 === "SUCCESS!!") {
          return res1;
        } else {
          return res1;
        }
      } else {
        return check;
      }
    }
  }
];

var circles = [
  {
    id: "graphics-circle-1",
    name: "PIXI.Graphics Circle",
    difficulty: 1,
    task: "Create a black circle at position x 120, y 80 with radius 42px. " +
        useDrawRect + addChild + documentationLink + warning,
    setup: (stage) => {},
    code: help,
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        if (shape.type === 2 && shape.x === 120 && shape.y === 80 && shape.radius === 42) {
          if (stage.children[0].geometry.graphicsData[0].fillStyle.color === 0x000000) {
            return 'SUCCESS!!';
          } else {
            return 'Wrong color!';
          }
        } else {
          return 'Wrong shape!';
        }
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-circle-2",
    name: "PIXI.Graphics Circle",
    difficulty: 1,
    task: "Create a red (0xFF0000)circle at position x 200, y 200 with radius 69px. <br>"+
            "Use functions <i>drawCircle</i> and <i>beginFill</i>. <br>Check the documentation for " +
            " <a href='https://pixijs.download/dev/docs/PIXI.Graphics.html' target='_blank'>PIXI.Graphics</a>.",
    setup:  (stage) => {},
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
      } else {
        return check;
      }
    }
  }
];
export default {
  squares,
  circles
};


// if (stage.children.length === 0) {
//   return 'Add the shape to stage';
// } else if (!stage.children[0].graphicsData) {
//   return 'Problem with the shape.';
// } else {
//   let shape = stage.children[0].graphicsData[0].shape;
//   if (stage.children[0].x === 64 && stage.children[0].y === 130 && shape.radius === 32) {
//     return 'SUCCESS!!';
//   } else {
//     return 'Error!';
//   }
// }
