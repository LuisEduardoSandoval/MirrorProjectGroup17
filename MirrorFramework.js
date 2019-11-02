    applicationbtn4(appH,appW,offsetappX, offsetappY) 
    {
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
      rlor3 = true; //is mouse hovered over box? if yes true
    } else {
      rlor3 = false; //if mouse isn't on button false
    }


    if (btnOn3) {
      //if the button is on  arguements inside
      fill(255);
      text('button3', 100, 300);
    }
    fill(255);
    rect(this.xpos, this.ypos, appH, appW);
    if(rlor2)
    {
      fill(0,0,99);
    }
  }
