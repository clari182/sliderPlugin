(function( $ ) {
 
    $(document).ready(function(){
        if ($('.slider_content').length > 0) {
            $('.slider_content').each(function(index, el){
                $(el).slider(null, el);
            });
        }
    });

    $.fn.slider = function(options, el) {

        var self = el;
        self.settings = {};

        self.init = function() {

            self.settings = $.extend({
                loop: true,
                timer: 5000,
                auto: true
            }, options );

            self.currentLi = 0;

            $(self).find('.content li').eq(self.currentLi).addClass('active');
            $(self).find('.bullets li').eq(self.currentLi).addClass('active');
            self.liCount = Math.ceil($(self).find('.content li').length);
            if (self.liCount < 2) {
                $(self).find('.module_slider_py').addClass('no-bullets').addClass('no-arrows');
            }
            
            $(self).find( ".arrow_slider.left" ).click(function(e) {
                self.moveToPrevious();
                e.preventDefault();
                
            });

            $(self).find( ".arrow_slider.right" ).click(function(e) {
                self.moveToNext();
                e.preventDefault();
            });  

            $(self).find('.bullets li a').click(function(e){
                var parent = $(this).parent();
                if(!parent.hasClass('active')){
                    var index = parent.index();
                    self.activateLi(index);
                }
                e.preventDefault();
            });

            if(self.settings.auto)
                self.startTimer(self.moveToNext, self.settings.timer);      	
        }
        
        self.activateLi = function(eq){
            self.currentLi = eq;
            $(self).find('li').removeClass('active');
            $(self).find('.content li').eq(eq).addClass('active');
            $(self).find('.bullets li').eq(eq).addClass('active');
            clearInterval(self.timer);
            if(self.settings.auto)
                self.startTimer(self.moveToNext, self.settings.timer); 
        }

        self.moveToPrevious = function() {
            if (self.liCount > 1) {
                //If it's on the first element and wants to go to last
                if (self.currentLi === 0 && self.settings.loop === true) { //Only if loop is enabled
                    self.currentLi = self.liCount - 1;
                } else if (self.currentLi != 0) {
                    self.currentLi--;
                }
                self.activateLi(self.currentLi);                        
            }
        }

        self.moveToNext = function(){
            if (self.liCount > 1) {
                //If it's on the last element and wants to go to first
                if (self.currentLi === self.liCount - 1 && self.settings.loop === true) { //Only if loop is enabled
                    self.currentLi = 0;
                } else if (self.currentLi != self.liCount - 1) {
                    self.currentLi++;
                }
                self.activateLi(self.currentLi);                                        
            }
        }

        self.startTimer = function(callback, interval) {
            self.timer = setInterval(callback, interval);
        }


        self.init();
    };
 
}( jQuery ));