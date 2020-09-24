function pipes(){
    this.gap = random(120,(height-base.height)/1.7);
    this.downbottom = random(30, (height-base.height)-this.gap);
    this.downtop = this.downbottom - pipedown.height;
    this.uptop = this.downbottom + this.gap;
    this.x = width;
    this.speed = 5;

    this.show = function(){
        
        image(pipedown, this.x,this.downtop);
        image(pipeup, this.x,this.uptop)
    }

    this.move = function(){
        this.x -= this.speed;
    }

    this.offscreen = function() {
        if (this.x < -pipedown.width) {
          return true;
        } else {
          return false;
        }
    }

    this.checkgame = function(Bird){
        if(Bird.y+10 < this.downbottom || Bird.y+Bird.birdh-10 > this.uptop){
            if(Bird.x+Bird.birdw-10 > this.x && Bird.x+10 < this.x+pipedown.width){
                console.log("hit");
                return true;
            }
        }
        return false;
    }
}