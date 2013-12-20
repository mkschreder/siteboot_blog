$ = $.noConflict(); 

$.fn.blog_post = function(){
	var editor_container = $(this).find(".editor"); 
	var self = $(this); 
	
	function save_func(ed) {
		var data = {}; 
		var div = $("#"+ed.id)[0]; 
		//ed.save(); 
		var val = ed.getContent(); 
		val = val.replace(/<p>&nbsp;<\/p>\n/gi, ''); 
		ed.setContent(val); 
		var params = {
			rcpt: $(div).attr("data-rcpt"), 
			action: "save-property", 
			object_type: $(div).attr("data-object-type"), 
			object_id: $(div).attr("data-object-id"), 
			property_name: $(div).attr("data-property-name"),
			property_value: val
		}
		/*
		var string = Object.keys(params).map(function(x){return x+"="+encodeURIComponent(params[x])}).reduce(function(a, b){return a+"&"+b;}); 
		*/	
		$.post(window.location.path, params, function(data){
			if(data && data.error)
				activeEditor.windowManager.alert("Could not save text! Please backup the text, check your connection and try again later!");
		}); 
		return false; 
	}
	
	$("button[name='create-post']").click(function(){
		$(self).find(".empty-message").css("display", "none"); 
		$(self).find(".post-content").css("display", "block"); 
	}); 
	
	$(self).find(".blog-post-property").each(function(i, v){
		$(v).focusout(
			function(){
				var params = {
					rcpt: $(this).attr("data-rcpt"), 
					action: "save-property", 
					object_type: "blog.post", 
					object_id: $(this).attr("data-object-id"), 
					property_name: $(this).attr("data-property-name"),
					property_value: $(this).val()
				}
				
				$.post(window.location.path, params, function(data){
					if(data && data.error)
						activeEditor.windowManager.alert("Could not save text! Please backup the text, check your connection and try again later!");
				}); 
			}
		);
	}); 
		
	$(self).find("> div.post-content > div.col-xs-12 > nav.navbar-default button[name='edit-content']").click(function(){
		$(self).find("> .post-content > .editable").each(function(i, v){
			var self = $(v); 
			if($(self).attr("data-active")) return; 
			
			var id = "ed"+Math.floor(Math.random()*100000); 
			$(self).attr("id", id); 
			$(self).attr("data-active", true); 
			
			var params = {
				rcpt: $(self).attr("data-rcpt"), 
				action: "get-property", 
				object_type: $(self).attr("data-object-type"), 
				object_id: $(self).attr("data-object-id"), 
				property_name: $(self).attr("data-property-name")
			}; 
			
			$.post(window.location.path, params, function(data){
				livesite.start_editor("#"+id, {
					init: function(ed){
						ed.setContent(data); 
					},
					save: save_func
				}); 
			}); 
		}); 
	}); 
}

$(document).ready(function(){
	$(".blog-post").each(function(i, v){
		$(v).blog_post(); 
	}); 
}); 
