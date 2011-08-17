/*
	KnocjoutJS TinyMCE Binding
	
	Copyright 2011 .DeV!L
*/

ko.bindingHandlers.tinymce = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var editor = $(element).tinymce();
		var options = allBindingsAccessor().tinymceOptions || {};
		var va = valueAccessor();
		var mce_config = {
			theme : "advanced",
			// Theme options
			theme_advanced_buttons1 : "save,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontselect,fontsizeselect",
			theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,image,cleanup,code,|,forecolor,backcolor",
			theme_advanced_buttons3 : "",
			theme_advanced_toolbar_location : "top",
			theme_advanced_toolbar_align : "left",
			theme_advanced_statusbar_location : "bottom",
			theme_advanced_resizing : true,
			setup: function(ed) {
				ed.addButton('save', {
					title : 'save.desc',
					onclick : function() {
						if(!ed.isDirty()){
							// return false;
						}
						var html = ed.getContent({format : 'raw'});
						if (ko.isWriteableObservable(va)) {
							va(html);
						}
						ed.isNotDirty = true;
					}
				});
			}
		};
		
		mce_config = $.extend(mce_config, options);
		
		if (editor) {
			editor.remove();
			editor = null;
		};
		
		setTimeout(function(){
			$(element).tinymce(mce_config);
		}, 0);
	},
	
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var value = ko.utils.unwrapObservable(valueAccessor());
		$(element).html(value);
	}
}