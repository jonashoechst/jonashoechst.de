---
title: Publications
layout: page
---
<script type="text/javascript">
function toggle_visibility(id) {
	var elem = document.getElementById(id);
	if(elem.style.display == 'block') {
		elem.style.display = 'none';
	} else {
		collapse_all();
		elem.style.display = 'block';
	}
}
function collapse_all() {
	var elems = document.getElementsByClassName("collapse");
	for(i = 0; i < elems.length; i++) elems[i].style.display = 'none';
}
</script>
<style type="text/css">
.hidden {
	display: none;
}
.collapse {
	display: none;
}
.abstract {
	text-align: justify;
	padding: 10pt;
}
li {
	padding: 3pt;
}
</style>
![Profile Image]({{ site.url }}/assets/images/academia.svg)

## Publications

{% bibliography %}
