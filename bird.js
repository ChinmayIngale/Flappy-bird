function bird(){
    
    this.x = 200;
    this.y =  (height-base.height)/2;
    this.birdh = 60;
    this.birdw = 80;
    this.maxfall = (height-base.height)-60;
    this.gravity = 0.3;
    this.speed = 0;
    this.lift = -10;
    var i =0;

    this.show = function(){
        image(birdimg[i], this.x, this.y, this.birdw, this.birdh, 10, 65, 480, 360);
        i= i+1;
        if(i == 4){
            i=0;
        }
    }

    this.fly = function(){
        this.speed += this.lift;
    }

    this.fall = function(){

        this.speed += this.gravity;
        this.y += this.speed;

        if(this.y > this.maxfall){
           this.y = this.maxfall;
           this.speed = 0
        }
        if(this.y > this.maxfall){
            this.y = this.maxfall;
            this.speed = 0
         }
         if(this.y < 0){
            this.y = 0;
            this.speed = 0
         }
          
        
    }

    
}