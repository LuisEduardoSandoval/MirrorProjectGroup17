var x, y, w, h; //variables for xpos, ypos, _width, _height as this. not allowed to be called in class methods
var dragging = false;
var rollover = false;
var rlor = false;
var rlor1 = false;
var offsetX, offsetY;
var content;
let btnOn = false;
let btnOn1 = false;
let temp = 0;
let weather = "";
let json;
let weather_description;
let TwitterImage;
let TwitterImageHovered;
let SpotifyImage;
let SpotifyImageHover;
function preload() {
  let url =
    "http://api.openweathermap.org/data/2.5/forecast?q=Lubbock,us&units=imperial&APPID=db28e6dfeb258f2c229fbcf4ea2435f4";
  json = loadJSON(url);

  // Select DOM items
  const spotify_frame = document.getElementById("spotify");

  function preload() {
    let url =
      "http://api.openweathermap.org/data/2.5/forecast?q=Lubbock,us&units=imperial&APPID=db28e6dfeb258f2c229fbcf4ea2435f4";
    json = loadJSON(url);
  }

  function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    TwitterImage = createImg(
      "https://raw.githubusercontent.com/LuisEduardoSandoval/MirrorProjectGroup17/master/TwitterIcon2.png"
    );
    TwitterImage.hide();
    TwitterImageHovered = createImg(
      "https://raw.githubusercontent.com/LuisEduardoSandoval/MirrorProjectGroup17/master/TwitterIcon_Hovered.png"
    );
    TwitterImageHovered.hide();
    SpotifyImage = createImg(
      "https://raw.githubusercontent.com/LuisEduardoSandoval/MirrorProjectGroup17/master/Spotify1.png"
    );
    SpotifyImage.hide();
    SpotifyImageHover = createImg(
      "https://raw.githubusercontent.com/LuisEduardoSandoval/MirrorProjectGroup17/master/SpotifyHovered.png"
    );
    SpotifyImageHover.hide();

    Tab_Section = new tab_section(windowWidth - 100, height / 2, width, 250); //initialization of tab_Section scaleable* in progress
    x = windowWidth - 100; //must be same values as Tab_Section to prevent errors in button dimension for Tab
    y = height / 2;
    w = width;
    h = 250;

    // Weather stuff
    temp = json.list[0].main.temp;
    weather_description = json.list[0].weather[0].description;
    weather_description = str(weather_description);

    Top_Section = new top_section(0, 0, windowWidth * 3, windowHeight / 6); //creating new top

    noStroke(); // no outline
  }

  function draw() {
    background(100);
    //frameRate(30);
    Top_Section.display(); //displays top
    Top_Section.clock(); //renders clock
    Tab_Section.tab_movement(); //allows movement for tab
    Tab_Section.tab_display(); //displays tab
    Tab_Section.applicationbtn(50, 50, 30, 40); //creates button

    Tab_Section.applicationbtn2(50, 50, 30, 100);
    //Tab_Section.applicationbtn(50,50,30,100);
    //Tab_Section.applicationbtn(50,50,30,160);
  }
  //start of tab section
  class tab_section {
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
      this.color = "grey";
    }

    //functions

    tab_movement() {
      if (
        //if the mouse is inside the bounding box
        mouseX > this.xpos &&
        mouseX < this.xpos + this._width &&
        mouseY > this.ypos &&
        mouseY < this.ypos + this._height
      ) {
        //if so rollover is true
        rollover = true;
      } else {
        //if not rollover is false
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
    }
    tab_display() {
      //displays tab
      fill(70, 70, 70, 255);

      ellipse(x + 40, y + 40, 80, 80);
      ellipse(x + 40, y + 210, 80, 80);
      rect(x, y + 45, 100, 170);
      rect(x + 40, y, w, h);
      fill(0, 0, 0, 0);
      rect(x, y, w, h);
    }

    applicationbtn(
      appH,
      appW,
      offsetappX,
      offsetappY //creates new buttons
    ) {
      var appX, appY; //positions

      this.appH = appH;
      this.appW = appW;
      this.xpos = x + offsetappX;
      this.ypos = y + offsetappY;

      if (
        //is the mouse inside the button?
        mouseX > this.xpos &&
        mouseX < this.xpos + this.appW &&
        mouseY > this.ypos &&
        mouseY < this.ypos + this.appH
      ) {
        rlor = true; //is mouse hovered over box? if yes true
      } else {
        rlor = false; //if mouse isn't on button false
      }

      if (btnOn) {
        //if the button is on  arguements inside
        spotify_frame.classList.remove("display-off");
        spotify_frame.classList.add("display-on");
      } else {
        spotify_frame.classList.add("display-off");
        spotify_frame.classList.remove("display-on");
      }
      fill(0, 0, 0, 0);
      rect(this.xpos, this.ypos, appH, appW); //button rectangle
      fill(255);
      image(TwitterImage, this.xpos - 5, this.ypos, 60, 60);
      if (rlor) {
        image(TwitterImageHovered, this.xpos - 5, this.ypos, 60, 60);
      }
    }
    applicationbtn2(appH, appW, offsetappX, offsetappY) {
      var appX, appY; //positions

      this.appH = appH;
      this.appW = appW;
      this.xpos = x + offsetappX;
      this.ypos = y + offsetappY;

      if (
        //is the mouse inside the button?
        mouseX > this.xpos &&
        mouseX < this.xpos + this.appW &&
        mouseY > this.ypos &&
        mouseY < this.ypos + this.appH
      ) {
        rlor1 = true; //is mouse hovered over box? if yes true
      } else {
        rlor1 = false; //if mouse isn't on button false
      }

      if (btnOn1) {
        //if the button is on  arguements inside
        fill(255);
        text("goodbye", 100, 300);
      }
      fill(0, 0, 0, 0);
      rect(this.xpos, this.ypos, appH, appW);
      image(SpotifyImage, this.xpos - 5, this.ypos, 60, 60);
      if (rlor1) {
        image(SpotifyImageHover, this.xpos - 5, this.ypos, 60, 60);
      }
    }
  } //end of tab_section

  class top_section {
    //class for upper section to contain time and date
    constructor(xpos, ypos, _width, _height) {
      this.xpos = xpos;
      this.ypos = ypos;
      this._width = _width;
      this._height = _height;
      this.color = "grey";
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
      var month_num;

      h = hour();
      m = minute();
      d = day();

      if (hour() > 12) {
        TimeDesignation = "PM";
        h = h - 12;
      } else {
        TimeDesignation = "AM";
      }

      //conversion here
      date = new Date();
      weekday = date.getDay();
      month_num = date.getMonth();

      var month = new Array();
      month[0] = "JANUARY";
      month[1] = "FEBRUARY";
      month[2] = "MARCH";
      month[3] = "APRIL";
      month[4] = "MAY";
      month[5] = "JUNE";
      month[6] = "JULY";
      month[7] = "AUGUST";
      month[8] = "SEPTEMBER";
      month[9] = "OCTOBER";
      month[10] = "NOVEMBER";
      month[11] = "DECEMBER";

      if (weekday == 0) {
        weekdayStr = "SUN";
      }
      if (weekday == 1) {
        weekdayStr = "MON";
      }
      if (weekday == 2) {
        weekdayStr = "TUE";
      }
      if (weekday == 3) {
        weekdayStr = "WED";
      }
      if (weekday == 4) {
        weekdayStr = "THU";
      }
      if (weekday == 5) {
        weekdayStr = "FRI";
      }
      if (weekday == 6) {
        weekdayStr = "SAT";
      }

      textSize((windowHeight * windowWidth) / (windowHeight * 16));
      fill(255, 255, 255);

      text(h + ":" + nf(m, 2) + " ", windowWidth / 1.25, windowHeight / 12);
      textSize((windowHeight * windowWidth) / (windowHeight * 42));
      text(TimeDesignation, windowWidth / 1.05, windowHeight / 22);
      textSize((windowHeight * windowWidth) / (windowHeight * 25));
      var date_str = weekdayStr + " " + month[month_num] + " " + d;
      text(date_str, windowWidth / 1.55, windowHeight / 6.75);
      text("Lubbock, TX", 50, windowHeight / 18);
      textSize(
        (windowHeight * windowWidth) / (windowHeight + windowWidth * 26)
      );
      text(weather_description, 100, windowHeight / 10);
      text(h + Math.floor(temp) + "°F", windowWidth / 12.5, windowHeight / 7);
      textSize((windowHeight * windowWidth) / (windowHeight * 42));

      if (weather_description == "clear sky") {
        fill(170, 160, 20);
        ellipse(windowWidth / 3, windowHeight / 12, 100, 100);
      } else if (
        weather_description == "few clouds" ||
        "scattered clouds" ||
        "broken clouds" ||
        "overcast clouds"
      ) {
        fill(170, 160, 20);
        ellipse(windowWidth / 3, windowHeight / 12, 100, 100);
        fill(255);
        ellipse(windowWidth / 3.1, windowHeight / 8, 60, 60);
        ellipse(windowWidth / 3.26, windowHeight / 7.7, 50, 50);
        ellipse(windowWidth / 2.97, windowHeight / 7.7, 50, 50);

        ellipse(windowWidth / 2.8, windowHeight / 24.7, 60, 60);
        ellipse(windowWidth / 2.96, windowHeight / 22.7, 50, 50);
        ellipse(windowWidth / 2.68, windowHeight / 22.7, 50, 50);
      }
    }
  } //end of top_section
  class ApplicationWindow {
    constructor(xpos, ypos, AppW, AppH) {
      this.xpos = xpos;
      this.ypos = ypos;
      this.AppW = Appw;
      this.AppH = AppH;
    }
    display() {
      fill(150);
      rect(xpos, y, 400, 400);
      fill(50);
      rect(xpos);
    }
  }

  //mouse functions

  // function create function here
  function mouseReleased() {
    //if mouse is released over a specific box
    // Quit dragging
    dragging = false;
    if (rlor == true) {
      //arguments for application button if mouse over button and is true execute
      btnOn = !btnOn; // switch to turn button on and off
    }
    if (rlor1 == true) {
      btnOn1 = !btnOn1;
    }
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
    //arguments for resizing window
    resizeCanvas(windowWidth, windowHeight);
    Tab_Section = new tab_section(windowWidth - 100, height / 2, width, 250);

    x = windowWidth - 100;
    y = height / 2;
    w = width * 2;
    h = 250;
    Top_Section = new top_section(0, 0, windowWidth * 3, windowHeight / 6);
  }
}
