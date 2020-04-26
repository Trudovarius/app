function checkGraphicsData(stage) {
  if (stage.children.length === 0) {
    return 'Add the shape to stage';
  } else if (!stage.children[0].geometry.graphicsData) {
    return 'Problem with the shape.';
  } else if (!stage.children[0].geometry.graphicsData[0].shape) {
    return 'Problem with the shape.';
  } else {
    return true;
  }
}

//   stage.addChild(new PIXI.Graphics().beginFill(0xFF00FF).drawRect(50,50,100,100).endFill());


var squares = [
  {
    id: "graphics-square-1",
    name: "PIXI.Graphics Square",
    difficulty: 1,
    task: "Create a square of any color at position x 50, y 50 with width 100px and " +
          "height 100px. <br> Use functions <i>beginFill</i> and <i>drawRect</i>.<br>" +
          "Add it to stage using <i>stage.addChild()</i>. <br> Check the documentation for " +
          "<a href='https://pixijs.download/dev/docs/PIXI.Graphics.html' target='_blank'>PIXI.Graphics</a>.",
    setup: (stage) => {},
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        if (shape.type === 1 && shape.x === 50 && shape.y === 50 && shape.width === 100 && shape.height === 100) {
          return 'SUCCESS!!';
        } else {
          return 'Wrong shape!';
        }
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-2",
    name: "PIXI.Graphics Square",
    difficulty: 1,
    task: "Create rectangle with color 0xff33cc at position x 333, y 100 with width 200 and " +
          "height 69. <br> Use functions <i>drawRect</i> and <i>beginFill</i>. <br>" +
          "Add it to stage using <i>stage.addChild()</i>. <br> Check the documentation for " +
          " <a href='https://pixijs.download/dev/docs/PIXI.Graphics.html' target='_blank'>PIXI.Graphics</a>.",
    setup: (stage) => {},
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        if (shape.type === 1 && shape.x === 333 && shape.y === 100 && shape.width === 200 && shape.height === 69) {
          if (stage.children[0].geometry.graphicsData[0].fillStyle.color === 0xff33cc) {
            parent.postMessage('SUCCESS!!', '*');
          } else {
            parent.postMessage('Wrong color!', '*');
          }
        } else {
          parent.postMessage('Wrong shape!', '*');
        }
      } else {
        return check;
      }
    }
  },
  {
    id: "graphics-square-3",
    name: "PIXI.Graphics Square",
    difficulty: 2,
    task: "Create rectangle with color 0xcc33ff at position x 10, y 123 with width 400 and height 200." +
            " Check the documentation for <a href='https://pixijs.download/dev/docs/PIXI.Graphics.html' target='_blank'>PIXI.Graphics</a>.",
    setup: (stage) => {},
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        if (shape.type === 1 && shape.x === 10 && shape.y === 123 && shape.width === 400 && shape.height === 200) {
          if (stage.children[0].geometry.graphicsData[0].fillStyle.color === 0xcc33ff) {
            parent.postMessage('SUCCESS!!', '*');
          } else {
            parent.postMessage('Wrong color!', '*');
          }
        } else {
          parent.postMessage('Wrong shape!', '*');
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
    task: "Create a black circle at position x 120, y 80 with radius 42px. <br>"+
            "Use functions <i>drawCircle</i> and <i>beginFill</i>. <br>Check the documentation for " +
            " <a href='https://pixijs.download/dev/docs/PIXI.Graphics.html' target='_blank'>PIXI.Graphics</a>.",
    setup: (stage) => {},
    verification: (stage) => {
      let check = checkGraphicsData(stage);
      if (check === true) {
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        if (shape.type === 2 && shape.x === 120 && shape.y === 80 && shape.radius === 42) {
          if (stage.children[0].geometry.graphicsData[0].fillStyle.color === 0x000000) {
            parent.postMessage('SUCCESS!!', '*');
          } else {
            parent.postMessage('Wrong color!', '*');
          }
        } else {
          parent.postMessage('Wrong shape!', '*');
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
        let shape = stage.children[0].geometry.graphicsData[0].shape;
        if (shape.type === 2 && shape.x === 200 && shape.y === 200 && shape.radius === 69) {
          if (stage.children[0].geometry.graphicsData[0].fillStyle.color === 0xFF0000) {
            parent.postMessage('SUCCESS!!', '*');
          } else {
            parent.postMessage('Wrong color!', '*');
          }
        } else {
          parent.postMessage('Wrong shape!', '*');
        }
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
//   parent.postMessage('Add the shape to stage', '*');
// } else if (!stage.children[0].graphicsData) {
//   parent.postMessage('Problem with the shape.', '*');
// } else {
//   let shape = stage.children[0].graphicsData[0].shape;
//   if (stage.children[0].x === 64 && stage.children[0].y === 130 && shape.radius === 32) {
//     parent.postMessage('SUCCESS!!', '*');
//   } else {
//     parent.postMessage('Error!', '*');
//   }
// }
