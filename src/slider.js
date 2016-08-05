(function( $ ) {
 
    $(document).ready(function(){
        if ($('.slider_content').length > 0) {
            $('.slider_content').each(function(index, el){
                $(el).slider(null, el);
            });
        }
    });

    var defaults = {
        //GENERAL
        loop: true,
        timer: 5000,
        auto: true,
        arrows: true,
        bullets: true
}

    $.fn.slider = function(options, el) {

        var self = el;
        self.settings = {};

        self.init = function() {

            self.settings = $.extend({}, defaults, options );

            self.currentNode = 0;

            $(self).find('.content li').eq(self.currentNode).addClass('active');
            $(self).find('.bullets li').eq(self.currentNode).addClass('active');
            
            if (!self.settings.arrows) $(self).find('.module_slider_py').addClass('no-arrows');
            if (!self.settings.bullets) $(self).find('.module_slider_py').addClass('no-bullets');
            
            self.liCount = Math.ceil($(self).find('.content li').length);

            if (self.liCount < 2) {
                $(self).find('.module_slider_py').addClass('no-bullets').addClass('no-arrows');
            }
            
            $(self).find( ".arrow_slider.left" ).click(function(e) {
                self.moveLeft();
                e.preventDefault();
                
            });

            $(self).find( ".arrow_slider.right" ).click(function(e) {
                self.moveRight();
                e.preventDefault();
            });  

            $(self).find('.bullets li a').click(function(e){
                var parent = $(this).parent();
                if(!parent.hasClass('active')){
                    var index = parent.index();
                    self.activateNode(index);
                }
                e.preventDefault();
            });

            if(self.settings.auto) self.startTimer(self.moveRight, self.settings.timer);      	
        }
        
        self.activateNode = function(eq){
            self.currentNode = eq;
            $(self).find('li').removeClass('active');
            $(self).find('.content li').eq(eq).addClass('active');
            $(self).find('.bullets li').eq(eq).addClass('active');
            clearInterval(self.timer);
            if(self.settings.auto)
                self.startTimer(self.moveRight, self.settings.timer); 
        }

        self.moveLeft = function() {
            if (self.liCount > 1) {
                //If it's on the first element and wants to go to last
                if (self.currentNode === 0 && self.settings.loop === true) { //Only if loop is enabled
                    self.currentNode = self.liCount - 1;
                } else if (self.currentNode != 0) {
                    self.currentNode--;
                }
                self.activateNode(self.currentNode);                        
            }
        }

        self.moveRight = function(){
            if (self.liCount > 1) {
                //If it's on the last element and wants to go to first
                if (self.currentNode === self.liCount - 1 && self.settings.loop === true) { //Only if loop is enabled
                    self.currentNode = 0;
                } else if (self.currentNode != self.liCount - 1) {
                    self.currentNode++;
                }
                self.activateNode(self.currentNode);                                        
            }
        }

        self.startTimer = function(callback, interval) {
            self.timer = setInterval(callback, interval);
        }


        self.init();
    };
 
}( jQuery ));