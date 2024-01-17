


/************************************************************
	 Page Parameter Manager Jacascript
	 Data : 2015.07.23
	 Developer : Park Ki Soon
************************************************************/

function getParams(searchData) {
	var search = searchData && searchData.search ? "?" + searchData.search : window.location.search;
	var isAlphabatCase = true;
	var isSingleCase = true;
	
	if (searchData && searchData.isAlphabatCase != undefined) {
		isAlphabatCase = searchData.isAlphabatCase;
	}
	
	if (searchData && searchData.isSingleCase != undefined) {
		isSingleCase = searchData.isSingleCase;
	}
	
	var applyKey = "\n";
	
	if (searchData) {
		for (var i = 0; i < $(searchData.form).find("input,select,textarea").length; ++i) {
			var item = $($(searchData.form).find("input,select,textarea")[i]);
			var type = item.attr("type");
			var key = item.attr("name");
			var val = item.val();
			var param = "&" + key + "=" + encodeURIComponent(val);

			if (type == "checkbox" && !item.attr("checked")) {
				val = null;
			}

			var expStr = new RegExp("[?&](" + key + ")=([^&^#]*)", isAlphabatCase ? "g" : "gi");
			
			if (search.match(expStr) && applyKey.indexOf("\n" + key + "\n") == -1) {
				search = search.replace(expStr, "");
			}

			if (val != null && val != undefined) {
				search += param;
			}
			
			applyKey += (key + "\n");	
		}

		if (isSingleCase) {
			applyKey = "\n";
		}
		
		for (var key in searchData.params) {
			var val = searchData.params[key];
			var param = "&" + key + "=" + encodeURIComponent(val);
	
			var expStr = new RegExp("[?&](" + key + ")=([^&^#]*)", isAlphabatCase ? "g" : "gi");
			
			if (search.match(expStr) && applyKey.indexOf("\n" + key + "\n") == -1) {
				search = search.replace(expStr, "");
			}

			if (val != null && val != undefined) {
				search += param;
			}
			
			applyKey += (key + "\n");			
		}
	}

	return ("?" + search).replace(/^[?][?&]+/, "?") + (searchData && searchData.isHash ? window.location.hash : "");
}

function goPage(page, fieldName) {
	window.location.href = window.location.pathname + getParams(JSON.parse("{\"params\" : {\"" + (fieldName ? fieldName : "page") + "\" : " + page + "}}"));
}

function changePageRowCount(rowCount, fieldName, pageFieldName) {
	window.location.href = window.location.pathname + getParams(JSON.parse("{\"params\" : {\"" + (pageFieldName ? pageFieldName : "page") + "\" : 1, \"" + (fieldName ? fieldName : "rowCount") + "\" : " + rowCount + "}}"));
}

function goPageForm(formObj) {
	window.location.href = window.location.pathname + getParams({"form" : formObj});
}

function goList(url, seqName) {
	window.location.href = url + getParams(JSON.parse("{\"params\" : {\"" + seqName + "\" : null}}"));
}

function goAdd(url) {
	window.location.href = url + window.location.search;
}

function goDetail(url, seqName, seqValue) {
	window.location.href = url + getParams(JSON.parse("{\"params\" : {\"" + seqName + "\" : " + seqValue + "}}"));
}

function goDelete(url, seqName, seqValue) {
	window.location.href = url + "?" + seqName + "=" + seqValue + "&searchLocation=" + escape(getParams(JSON.parse("{\"params\" : {\"" + seqName + "\" : null}}")));
}
