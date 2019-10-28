var x, y, w, h; //variables for xpos, ypos, _width, _height as this. not allowed to be called in class methods
var dragging = false;
var rollover = false;
var rlor = false;
var offsetX, offsetY;
var content;
let btnOn = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  Tab_Section = new tab_section(windowWidth - 100, height / 2, width, 250); //initialization of tab_Section scaleable* in progress
  x = windowWidth - 100; //must be same values as Tab_Section to prevent errors in button dimension for Tab
  y = height / 2;
  w = width;
  h = 250;

  Top_Section = new top_section(0, 0, windowWidth * 3, windowHeight / 6);
  
  noStroke(); // no outline
}

function draw() {
  background(100);
  //frameRate(30);
  Top_Section.display();
  Top_Section.clock();
  Tab_Section.tab_movement();
  Tab_Section.tab_display();
  Tab_Section.applicationbtn(100,100);

}

class tab_section 
{
  //tab
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

    /*fill(70, 70, 70, 255);
    
    ellipse(x+40,y+40,80,80);
    ellipse(x+40,y+210,80,80);
    //rect(this.xpos,this.ypos,this._width,this._height);
    rect(x,y+45,100,170);
    rect(x+40,y,w,h);
    fill(0,0,0,0);
    rect(x,y,w,h);*/
    //button.mousePressed(event)// 
      
   }
  tab_display()
  {
    fill(70, 70, 70, 255);
    
    ellipse(x+40,y+40,80,80);
    ellipse(x+40,y+210,80,80);
    //rect(this.xpos,this.ypos,this._width,this._height);
    rect(x,y+45,100,170);
    rect(x+40,y,w,h);
    fill(0,0,0,0);
    rect(x,y,w,h);
  }
  
  applicationbtn(appH,appW)
  {
    var appX,appY;
    
    this.appH = appH;
    this.appW = appW;
    this.xpos = x;
    this.ypos = y;
    
    
    if (
          mouseX > this.xpos &&
          mouseX < this.xpos + this.appW &&
          mouseY > this.ypos &&
          mouseY < this.ypos + this.appH
        ) 
    {
      rlor = true;//is mouse hovered over box? if yes true
    }
    else 
    {
      rlor = false; 
    }
    if(rlor) //when the mouse is hovered arguments inside
    {
      fill(0,99,0);
    }
    else
    {
      fill(255);
    }    
    if(mouseIsPressed && rlor == true) //when the mouse is pressed on the button arguments inside
    {
      btnOn = !btnOn; // switch to turn button on and off
      fill(0,0,0);
    }
    if(btnOn) //if the button is on  arguements inside
    {
      fill(255);
      text("hello",100,100);
    }

    rect(this.xpos,this.ypos,appH,appW); //application text
    
  }
  




}//end of tab_section



class top_section {
  //class for upper section to contain time and date
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
    var h, m;
    var d;
    var weekdayStr, weekday;
    var TimeDesignation;
    var date;

    h = hour();
    m = minute();
    d = day();

    if (hour() > 12) {
      TimeDesignation = 'PM';
      h = h - 12;
    } else {
      TimeDesignation = 'AM';
    }

    //conversion here
    date = new Date();
    weekday = date.getDay();

    if (weekday == 0) {
      weekdayStr = 'SUN';
    }
    if (weekday == 1) {
      weekdayStr = 'MON';
    }
    if (weekday == 2) {
      weekdayStr = 'TUE';
    }
    if (weekday == 3) {
      weekdayStr = 'WED';
    }
    if (weekday == 4) {
      weekdayStr = 'THU';
    }
    if (weekday == 5) {
      weekdayStr = 'FRI';
    }
    if (weekday == 6) {
      weekdayStr = 'SAT';
    }

    textSize((windowHeight * windowWidth) / (windowHeight * 16));
    fill(255, 255, 255);

    text(h + ':' + nf(m, 2) + ' ', windowWidth / 1.25, windowHeight / 12);
    textSize((windowHeight * windowWidth) / (windowHeight * 42));
    text(TimeDesignation, windowWidth / 1.05, windowHeight / 22);
    textSize((windowHeight * windowWidth) / (windowHeight * 25));
    text(weekdayStr + ' OCTOBER ' + d, windowWidth / 1.55, windowHeight / 6.75);
    //date
    //text(weekdayStr + "OCTOBER" + nf(d),100,480);
  }
} //end of top_section

//mouse functions


// function create function here
function mouseReleased() {
  // Quit dragging
  dragging = false;
}



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
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  Tab_Section = new tab_section(windowWidth - 100, height / 2, width, 250);

  x = windowWidth - 100;
  y = height / 2;
  w = width * 2;
  h = 250;
  Top_Section = new top_section(0, 0, windowWidth * 3, windowHeight / 6);
}
