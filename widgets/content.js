var Widget = function(x){
	return this.super.constructor.call(this, x); 
}

Widget.prototype.render = function(req){
	var ret = this.server.defer(); 
	var self = this; 
	
	ret.resolve({
		content: self.object.properties.content, 
		id: self.object.id
	}); 
	
	return ret.promise; 
}

exports.module = {
	type: Widget
}
