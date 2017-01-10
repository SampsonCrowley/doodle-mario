Mario.Controller = {
  init: function(){
    this.view = Mario.View
    this.model = Mario.Model
    this.model.init();
    this.view.init({
      size: this.resize,
      keyDown: Mario.Model.startKey,
      keyUp: Mario.Model.stopKey
    });
    this.animationSpeed();
    this.animate();
  },
  animationSpeed: function(){
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
  },
  animate: function(){
    that = this;
    requestAnimationFrame(function(){that.animate()});
    this.model.move();
    this.view.render(this.model.player, this.model.getVisible(), this.model.clouds, this.model.offset)
    console.log()
  },
  resize: function(width, height) {
    Mario.Model.resize(width, height)
    Mario.View.render(Mario.Model.player, Mario.Model.getVisible(), Mario.Model.clouds, Mario.Model.offset)
  }

}
