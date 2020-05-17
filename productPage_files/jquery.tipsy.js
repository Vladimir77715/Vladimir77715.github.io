var once = false;
var tips = [];

(function($) {
    $.fn.tipsy = function(options) {

        options = $.extend({}, $.fn.tipsy.defaults, options);
        
        return this.each(function() {
            
            var opts = $.fn.tipsy.elementOptions(this, options);
			var el = this;
			
			var showT = 'mouseenter';
			var hideT = 'mouseout';
			
			if(!opts.onhover){
				showT = 'click';
				hideT = 'hideit';
				
				if(!once){
					$(document).click(function (e) {
						e.stopPropagation();
						var target = e.target;
						if(!$(target).hasClass('tipsy') && !$(target).hasClass('tips')) {
							var parent = $(target).closest('.tipsy');
							if(!parent.length) parent = $(target).closest('.tips');
							target = parent;
						}
						
						if(!$(target).hasClass('tipsy') && !$(target).hasClass('tips')){
					
						$.each($('.tipsy_active'),function(){ $(this).trigger(hideT)});
						}
					});
					
					once = true;
				}
			}
            
			
			$(this).bind(showT,function(event) {
				event.stopPropagation();
							
				if(!opts.onhover) $.each($('.tipsy_active'),function(){ $(this).trigger(hideT)});
				$(this).addClass('tipsy_active');
				
				

                $.data(this, 'cancel.tipsy', true);

                var tip = $.data(this, 'active.tipsy');
				
                if (!tip) {
					var id = 'tip'+Math.floor(Math.random()*10);
					
					
					
					tip = $('<div class="tipsy '+opts.addclass+'" id="'+id+'" data-gravity="'+opts.gravity+'"><div class="tipsy_arrow"></div><div class="tipsy-inner"></div></div>');
                    tip.css({position: 'absolute', zIndex: 100000});
                    $.data(this, 'active.tipsy', tip);
                }

                if ($(this).attr('title') || typeof($(this).attr('original-title')) != 'string') {
                    $(this).attr('original-title', $(this).attr('title') || '').removeAttr('title');
                }

                var title;
                if (typeof opts.title == 'string') {
                    title = $(this).attr(opts.title == 'title' ? 'original-title' : opts.title);
                } else if (typeof opts.title == 'function') {
                    title = opts.title.call(this);
                }

                tip.find('.tipsy-inner')[opts.html ? 'html' : 'text'](title || opts.fallback);
				
				if (opts.tipasparent) $(this).css({position:'relative'});
				var tip_offset = $(this).offset();
				
                var pos = $.extend({}, tip_offset, {width: this.offsetWidth, height: this.offsetHeight});
				
                tip.get(0).className = 'tipsy'; // reset classname in case of dynamic gravity
                tip.remove().css({top: 0, left: 0, visibility: 'hidden', display: 'block'}).appendTo(opts.tipasparent ? this:document.body);
                var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
				
                var gravity = (typeof opts.gravity == 'function') ? opts.gravity.call(this) : opts.gravity;
				
				if(gravity == 'w' && (pos.left + pos.width + actualWidth - $(document).scrollLeft()) > $(window).width()) gravity='e';
				if(gravity == 'e' && (pos.left - actualWidth) < $(document).scrollLeft()) gravity='w';
				if(gravity == 's' && (pos.top - actualHeight) < $(document).scrollTop()) gravity='n';
				if(gravity == 'n' && (pos.top + pos.height + actualHeight - $(document).scrollTop()) > $(window).height()) gravity='s';
				
				
                switch (gravity.charAt(0)) {
                    case 'n':
						var gr_class = 'tipsy-north';
                        break;
                    case 's':
						var gr_class = 'tipsy-south';
                        break;
                    case 'e':
						var gr_class = 'tipsy-east';
                        break;
                    case 'w':
						var gr_class = 'tipsy-west';
                        break;
                }
				
				tip.addClass(gr_class);
				
				$(this).removeClass('tpos_tipsy-north tpos_tipsy-south tpos_tipsy-east tpos_tipsy-west').addClass('tpos_'+gr_class);
				
				var actualWidth = tip[0].offsetWidth, actualHeight = tip[0].offsetHeight;
				
				switch (gravity.charAt(0)) {
                    case 'n':
						var top = pos.top + pos.height;
						var left = pos.left + pos.width / 2 - actualWidth / 2;
                        break;
                    case 's':
						var top = pos.top - actualHeight;
						var left = pos.left + pos.width / 2 - actualWidth / 2;
                        break;
                    case 'e':
						var top = pos.top + pos.height / 2 - actualHeight / 2;
						var left = pos.left - actualWidth;
                        break;
                    case 'w':
						var top = pos.top + pos.height / 2 - actualHeight / 2;
						var left = pos.left + pos.width;
                        break;
                }
				
				left = Math.max(0,left);
				if(opts.tipasparent){
					top = top - tip_offset.top;
					left = left - tip_offset.left;
				}
				
				
				tip.css({top: top, left: left});
						
				tip.addClass(opts.addclass);
				
                if (opts.fade) {
                    tip.css({opacity: 0, display: 'block', visibility: 'visible'}).stop(true,true).animate({opacity: 1});
                } else {
                    tip.css({visibility: 'visible'});
                }
				
				if(opts.onhover){				
				$(tip).bind('mouseout',function(e) {
					var target = fixRelatedTarget(e);
					while (target && target !== this) {
						target = target.parentNode;
					}
					
					if(target !== this){					
						var tip2 = $(this);					
						if (opts.fade) {
							tip2.stop(true,true).fadeOut(function() { $(this).remove(); });
						} else {
							tip2.remove();
						}
					}
				});
				}
            });
			
			
			$(this).bind(hideT,function(e) {
			
				$(this).removeClass('tipsy_active');
				$.data(this, 'cancel.tipsy', false);
                var self = this;
				
                if ($.data(this, 'cancel.tipsy')) return;
				var target = fixRelatedTarget(e);
								
                var tip = $.data(self, 'active.tipsy');
				
								
				if(!$(target).hasClass('tipsy') && !$(target).hasClass('tips')) {
					var parent = $(target).closest('.tipsy');
					if(!parent.length) parent = $(target).closest('.tips');
					target = parent;
				}
				
				if(!$(target).hasClass('tipsy') && !$(target).hasClass('tips')){
					if (opts.fade) {
                        tip.stop(true,true).fadeOut(function() { $(this).remove(); });
                    } else {
                        tip.remove();
                    }
				}

            });
        });
        
    };
    
    // Overwrite this method to provide options on a per-element basis.
    // For example, you could store the gravity in a 'tipsy-gravity' attribute:
    // return $.extend({}, options, {gravity: $(ele).attr('tipsy-gravity') || 'n' });
    // (remember - do not modify 'options' in place!)
    $.fn.tipsy.elementOptions = function(ele, options) {
        return $.metadata ? $.extend({}, options, $(ele).metadata()) : options;
    };
    
    $.fn.tipsy.defaults = {
        fade: false,
        fallback: '',
        gravity: 'n',
        html: false,
        title: 'title',
		addclass: '',
		tipasparent: false,
		onhover: true
    };
    
    $.fn.tipsy.autoNS = function() {
        return $(this).offset().top > ($(document).scrollTop() + $(window).height() / 2) ? 's' : 'n';
    };
    
    $.fn.tipsy.autoWE = function() {
        return $(this).offset().left > ($(document).scrollLeft() + $(window).width() / 2) ? 'e' : 'w';
    };
    
})(jQuery);


function fixRelatedTarget(e) {

	if (e.type == 'click'){
		e.relatedTarget = e.target;
		
	}else if (!e.relatedTarget) {

		if (e.type == 'mouseover') e.relatedTarget = e.fromElement;
		else if (e.type == 'mouseout') e.relatedTarget = e.toElement;

	}
	return e.relatedTarget;
}

