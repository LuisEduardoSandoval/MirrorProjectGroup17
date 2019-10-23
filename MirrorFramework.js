function setup() 
{
  createCanvas(windowWidth,windowHeight);
  background(100);
 
  Tab_Section = new tab_section(windowWidth-60, height/2,width/2,250); //initialization of tab_Section scaleable* in progress
  Top_Section = new top_section(0, 0,windowWidth,windowHeight/6); //initialization of top scaleable
  noStroke();// no outline
}


function draw() 
{ 
  //frameRate(30);
  Top_Section.display();
  Tab_Section.display();
 
}



class tab_section //tab
{
  //the constructor
  constructor(xpos,ypos,_width,_height) //constructor(x position, y position, width, height)
  {
    this.xpos = xpos;
    this.ypos = ypos;
    this._width = _width;
    this._height = _height;
    this.color = "grey";
  }
  
  //functions
  display() //displays tab shape
  {
    fill(70,70,70,100);
    circle(this.xpos,this.ypos+40,40,40);
    circle(this.xpos,this.ypos+210,40,40);
    rect(this.xpos,this.ypos,this._width,this._height);
    rect(this.xpos-40,this.ypos+45,100,170);
    fill(100,100,100);
    rect(this.xpos-38,this.ypos+90,5,60);
    rect(this.xpos-30,this.ypos+80,5,80);
   }
}//end of tab_section


class top_section //class for upper section containing time and date
{
  constructor(xpos,ypos,_width,_height)
  {
    this.xpos = xpos;
    this.ypos = ypos;
    this._width = _width;
    this._height = _height;
    this.color = "grey";
  }
  
  //functions
  display()
  {
    fill(70,70,70,100);
    rect(this.xpos,this.ypos,this._width,this._height);
  }
}//end of top_section
