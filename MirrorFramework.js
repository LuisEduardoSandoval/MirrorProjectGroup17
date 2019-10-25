var x, y, w, h; //variables for xpos, ypos, _width, _height as this. not allowed to be called in class methods
var dragging = false;
var rollover = false;
var offsetX, offsetY;

function setup() {
  createCanvas(windowWidth, windowHeight);

  Tab_Section = new tab_section(windowWidth - 100, height / 2, width, 250); //initialization of tab_Section scaleable* in progress
  x = windowWidth - 100; //must be same values as Tab_Section to prevent errors in button dimension for Tab
  y = height / 2;
  w = width;
  h = 250;

  Top_Section = new top_section(0, 0, windowWidth, windowHeight / 6);
  noStroke(); // no outline
}

function draw() {
  background(100);
  //frameRate(30);
  Top_Section.display();
  Top_Section.clock();
  //Tab_Section.display();
  Tab_Section.tab_movement();
}

class tab_section { //tab
  //the constructor
  constructor(
    xpos,
    ypos,
    _width,
    _height //constructor(x position, y position, width, height)
  ) {
    this.xpos = xpos;
    this.ypos = ypos;
    this._width = _width;
    this._height = _height;
    this.color = 'grey';
  }

  //functions

  tab_movement() {
    if (
      mouseX > this.xpos &&
      mouseX < this.xpos + this._width &&
      mouseY > this.ypos &&
      mouseY < this.ypos + this._height
    ) {
      //is the mouse inside the bounding box?
      rollover = true;
    } else {
      rollover = true;
    }
    if (dragging) {
      if (mouseX + offsetX < windowWidth || mouseX + offsetX > 0) {
        x = mouseX + offsetX;
      }
      if (mouseX + offsetX > windowWidth - 100) {
        x = windowWidth - 100; // starting position
      }
      if (mouseX + offsetX < windowWidth - 502) {
        x = windowWidth - 500;
      }
    }
    //tab shape here//

    fill(70, 70, 70, 255);

    circle(x + 40, y + 40, 80, 40);
    circle(x + 40, y + 210, 80, 40);
    //rect(this.xpos,this.ypos,this._width,this._height);
    rect(x, y + 45, 100, 170);
    rect(x + 40, y, w, h);
    fill(0, 0, 0, 0);
    rect(x, y, w, h);
  }
} //end of tab_section

class top_section { //class for upper section to contain time and date
  constructor(xpos, ypos, _width, _height) {
    this.xpos = xpos;
    this.ypos = ypos;
    this._width = _width;
    this._height = _height;
    this.color = 'grey';
  }

  //functions
  display() {
    fill(70, 70, 70, 255);
    rect(this.xpos, this.ypos, this._width, this._height);
  }
  clock() {
    var h, m, t;
    var d, mon, y;
    var weekdayStr;
    var TimeDesignation;

    h = hour();
    m = minute();
    d = day();

    if (hour() > 12) {
      TimeDesignation = 'PM';
      h = h - 12;
    } else {
      TimeDesignation = 'AM';
    }

    textSize((windowHeight * windowWidth) / (windowHeight * 16));
    fill(255, 255, 255);

    text(h + ':' + nf(m, 2) + ' ', windowWidth / 1.25, windowHeight / 12);
    textSize((windowHeight * windowWidth) / (windowHeight * 42));
    text(TimeDesignation, windowWidth / 1.08, windowHeight / 22);
    textSize((windowHeight * windowWidth) / (windowHeight * 25));
    text('FRI ' + 'OCTOBER ' + d, windowWidth / 1.55, windowHeight / 6.75);
    //date
    //text(weekdayStr + "OCTOBER" + nf(d),100,480);
  }
} //end of top_section

//mouse functions
function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
    //offsetY = y-mouseY;
  }
  if (offsetX == 0) {
    x = windowWidth - 100; // starting position
  }
  //if(mouseX < x)
  //{
  // x = 500;
  //}
  //if(offsetX = 0)
  //{
  //x = windowWidth - 100;
  //}
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}
