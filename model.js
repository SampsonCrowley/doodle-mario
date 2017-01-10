Mario.Model = {
  init: function() {
    this.height = 500;
    this.width = 500;
  },
  generateClouds() {
    this.clouds = [];
    for(var i = 0; i < 20; i++){
      var x = Math.random() * this.width,
          y = Math.random() * this.height,
          z = i;
      this.clouds.push({x, y, z});
    }
  },
  newPlatform: function(){
    return {
      x: 0,
      y: 2000,
      width: 200
    }
  },
  checkKeys: function(){
    if (this.keys[38] || this.keys[32]) {
      // up arrow
      if(!this.player.jumping){
        this.player.jumping = true;
        this.player.velY = this.player.speed*2;
        // this.offset += this.player.velY;
      }
    }
    if (this.keys[39]) {
      // right arrow
      if (this.player.velX < this.player.speed) {
        this.player.velX++;
      }
    }
    if (this.keys[37]) {
      // left arrow
      if (this.player.velX > -this.player.speed) {
        this.player.velX--;
      }
    }
  },
  fixX: function(){
    if (this.player.x+20 > this.width-this.player.width) {
      this.player.x = this.width-this.player.width - 20;
    } else if (this.player.x <= 20) {
      this.player.x = 20;
    }
  },
  fixY: function(under){
    if(under && this.player.velY <= 0){
      if (this.player.y + this.player.velY <= Math.max(...under)) {
        this.player.y = Math.max(...under);
        this.player.jumping = false;
        this.offset = this.player.y
      }
    }else if (this.player.y <= this.offset) {
      if(this.player.grounded || !this.player.jumping){
        this.player.y = this.offset;
        this.player.jumping = false;
        this.player.velY = 0;
      }
    }
  },
  move: function(){
    this.checkKeys();
    var landable = this.getLandable();
    if(this.player.jumping)
    this.player.velY -= this.gravity;
    this.player.velX *= this.friction;
    this.player.x += this.player.velX;
    this.player.y += this.player.velY;
    this.screenOffset = this.player.y;
    if(this.offset || this.player.jumping){
      landable = this.checkGrounding(landable);
    }
    console.log(landable);
    this.fixX();
    this.fixY(landable);
  },
  resize: function (nWidth, nHeight) {
    this.player.y = this.offset;
    this.height = nHeight;
    this.width = nWidth;
    this.generateClouds();
  },
  startKey:function(key){
    Mario.Model.keys[key] = true;
  },
  stopKey: function(key){
    Mario.Model.keys[key] = false;
  },
  groundingX: function(platform){
    return this.player.x >= platform.x && this.player.x <= platform.x + platform.width
  },
  groundingY: function(platform){
    return this.player.y >= platform.y - this.offset
  },
  checkGrounding: function(visible){
    this.player.grounded = false;
    var under = []
    for(var i = 0; i < visible.length; i++) {
      if(this.groundingX(visible[i]) && this.groundingY(visible[i])){
        under.push(visible[i].y)
        this.player.grounded = true;
      }
    }
    return under;
  },
  getLandable: function() {
    var landable_elements = []
    for (var i = 0; i < this.level_entities.length; i++){
      if (this.level_entities[i].y >= this.offset && this.level_entities[i].y <= this.player.y) {
        landable_elements.push(this.level_entities[i]);
      }
    }
    return landable_elements;
  },
  getVisible: function() {
    var visible_elements = []
    for (var i = 0; i < this.level_entities.length; i++){
      if(this.level_entities[i].y < this.screenOffset - 500){
        this.level_entities.splice(i, 1);
        this.level_entities.push(this.newPlatform())
      } else if(this.level_entities[i].y < this.screenOffset + this.height) {
        visible_elements.push(this.level_entities[i]);
      }
    }
    return visible_elements;
  },
  level_entities: [
    {
      x: 0,
      y: 0,
      width: window.innerWidth,
    },
    {
      x: 0,
      y: 200,
      width: window.innerWidth/2,
    },
    {
      x: window.innerWidth/2,
      y: 400,
      width: window.innerWidth/2,
    },
    {
      x: window.innerWidth/4,
      y: 600,
      width: window.innerWidth/4,
    },
    {
      x: window.innerWidth/3,
      y: 800,
      width: window.innerWidth/4,
    },
    {
      x: window.innerWidth/2,
      y: 1000,
      width: window.innerWidth/4
    },
    {
      x: window.innerWidth/2,
      y: 1200,
      width: window.innerWidth/4
    },
    {
      x: 0,
      y: 1400,
      width: window.innerWidth/4,
    },
    {
      x: window.innerWidth/4,
      y: 1600,
      width: window.innerWidth/2,
    },
    {
      x: window.innerWidth/2,
      y: 1800,
      width: window.innerWidth/4,
    }
  ],
  gravity: .5,
  friction: .9,
  player: {
    x: window.innerWidth/2,
    y: 0,
    width: 60,
    height: 80,
    speed: 10,
    velX: 0,
    velY: 0,
    jumping: false,
    grounded: true,
  },
  level: 0,
  keys: [],

  // how far offset the canvas is
  offset: 0,
  screenOffset: 0,

}
