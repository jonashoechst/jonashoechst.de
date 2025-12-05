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
    font-family: serif;
    font-size: normal;
    color: black;
    line-height: normal;
    text-align: justify;
    padding: 10pt;
}
pre {
    color: black;
}

li {
    padding: 3pt;
}
</style>
![Profile Image]({{ "/assets/images/academia.svg" | absolute_url }})

## Publications

{% bibliography %}
