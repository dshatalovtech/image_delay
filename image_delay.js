/*
	<div class="delayed_image" data-src="" data-delay="1000"></div>

	author: Dmitro Shatalov
	url: http://dshatalov.com/scripts/imagedelay-js-script-to-delay-image-loading/
*/

function ImageDelay()
{
	this.construct = function()
	{
		this.set("src2-width", 500);
	}

	this.init = function() 
	{
		 this.find_objects();
	}	


	this.Image = function() 
	{

		this.src   		= '';
		this.delay 		= 10;
		this.obj   		= false;

		this.start = function(){

			var self = this;
			
			setTimeout(function(){

				if (window.innerWidth < self.that.get("src2-width") && typeof self.src2 != "undefined" && self.src2 != false && self.src2 != '')
				{
					self.src = self.src2;
				}

				var html = '<img src="' + self.src + '" class="' + self.class+ '" alt="' + self.alt + '" />';
				
				var image = new Image();
					image.src 	= self.src;
					image.class = self.class;
					image.alt   = self.alt;

				self.that.insertAfter(self.obj, image);
				self.obj.parentNode.removeChild(self.obj);	

			}, this.delay);
		}
	}

	this.insertAfter = function(referenceNode, newNode) {
    	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	this.images = [];

	this.find_objects = function() 
	{
		var self = this;

		var arr = document.getElementsByClassName("delayed_image");

		for (var i = 0; i < arr.length; i++)
		{
			var obj = arr[i];

			self.images[i] 		 = new self.Image();
			self.images[i].that  = self;
			self.images[i].src   = obj.getAttribute("data-src");
			self.images[i].src2  = obj.getAttribute("data-src2");
			self.images[i].delay = obj.getAttribute("data-delay"); 
			self.images[i].class = obj.getAttribute("data-class"); 
			self.images[i].alt 	 = obj.getAttribute("data-alt"); 
			self.images[i].obj   = obj;
			self.images[i].start();
		}
	}

	this.args = [];
	
	this.set = function(k, v)
	{
	    this.args[k] = v;
	}
	
	this.get = function(k)
	{
	    if (typeof this.args[k] == "undefined")
	    {
	        return false;
	    }
	
	    return this.args[k]
	}	
		
	this.construct();
}
