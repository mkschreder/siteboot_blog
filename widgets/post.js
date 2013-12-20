var Widget = function(x){
	return this.super.constructor.call(this, x); 
}

Widget.prototype.render = function(req){
	var ret = this.server.defer(); 
	var self = this; 
	
	var name = req.args["path"]; 
	if(!name){
		ret.resolve({
			content: "No post name specified!"
		}); 
		return ret.promise; 
	}
	
	// get the right blog post
	var posts = self.server.pool.get("blog.post"); 
	posts.find({
		name: name,
		language: req.language
	}, {
		name: name
	}).done(function(p){
		req.meta.post_title = p.properties.title; 
		ret.resolve({
			title: p.properties.title, 
			post_id: p.id, 
			edit_controls: (req.session.user != null && req.session.user.role == "admin"), 
			content: p.properties.content
		}); 
	}); 
	
	return ret.promise; 
}

exports.module = {
	type: Widget
}
