Mario.View = {
  init: function(cb) {
    this.gameWrapper = document.getElementsByTagName("mario-game")[0] || this.createWrapper();
    this.backgroundCanvas = this.gameWrapper.getElementsByClassName("mario-background")[0] || this.createEl("mario-background", this.gameWrapper);
    this.entityCanvas = this.gameWrapper.getElementsByClassName("mario-platforms")[0] || this.createEntityLayer();
    this.playerCanvas = this.gameWrapper.getElementsByClassName("mario-player")[0] || this.createPlayer();
    this.listeners(cb);
  },
  createWrapper: function() {
    var game = document.createElement("mario-game");
    document.body.appendChild(game);
    return game;
  },
  createEl: function(elType, parent) {
    var el = document.createElement(elType);
    parent.appendChild(el);
    return el
  },
  createPlayer: function(){
    var player = this.createEl("mario-player", this.gameWrapper);
    return player;
  },
  createEntityLayer: function(){
    var ground = this.createEl("mario-platforms", this.gameWrapper);
    return ground;
  },
  listeners: function(cb){
    var that = this;
    window.addEventListener('resize', function(){
      cb.size(window.innerWidth, window.innerHeight)
    }, false);
    document.body.addEventListener("keydown", function(e) {
      cb.keyDown(e.which || e.keyCode || 0)
    });

    document.body.addEventListener("keyup", function(e) {
      cb.keyUp(e.which || e.keyCode || 0)
    });
    cb.size(window.innerWidth, window.innerHeight)
  },
  render(player, platforms, clouds, offset) {
    this.renderClouds(clouds, offset);
    this.renderPlatforms(platforms, offset);
    this.renderPlayer(player, offset);
  },
  renderPlatforms(platforms, offset) {
    this.entityCanvas.innerHTML = "";
    for(var i = 0; i < platforms.length; i++){
      var img = this.createEl("platform", this.entityCanvas);
      img.style.bottom = platforms[i].y - (offset || 0);
      img.style.left = platforms[i].x;
      img.style.width = platforms[i].width;
    }
  },
  renderClouds: function(clouds){
    this.backgroundCanvas.innerHTML = "";
    for(var i = 0; i < clouds.length; i++){
      var img = this.createEl("IMG", this.backgroundCanvas);
      img.src = "cloud.svg"
      img.style.top = clouds[i].y;
      img.style.left = clouds[i].x;
      img.style.width = clouds[i].width;
    }
  },
  renderPlayer: function(player, offset) {
    this.playerCanvas.innerHTML = "";
    var img = this.createEl("player", this.playerCanvas);
    img.style.bottom = player.y - (offset || 0);
    img.style.left = player.x;
    img.style.width = player.width;
  }

}
