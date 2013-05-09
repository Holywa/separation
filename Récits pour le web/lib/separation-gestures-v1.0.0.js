/*
 * Gestures for the Separation Project
 */

 var Gestures = {
 	cut: function(_x, _y, _width, _height, _layer, _stage){
        var rect = new Kinetic.Rect({
          x: _x,
          y: _y,
          width: _width,
          height: _height,
          opacity: 0
        });

        var x = 0;

        this.on = function(handler) {
          rect.on('touchmove', function(){
            var touchPos = _stage.getTouchPosition();

            if(touchPos.x >= (_width + _x - 20)){ x = _width + _x; }
            else if((x != 0) && (touchPos.x <= (_x + 20))){
              x = 0;
              handler()
            }  
            else if((touchPos.x < x) && ((touchPos.y < (_height + _y)) && (touchPos.y > _y))){ x = touchPos.x; }
            else{ x = 0; }
          });
        }

        _layer.add(rect);
      }
 };
 