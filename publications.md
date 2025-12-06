---
title: Publications
layout: page
---
<script type="text/javascript">
function toggle_visibility(id) {
    var elem = document.getElementById(id);
    if(elem.classList.contains('show')) {
        elem.classList.remove('show');
    } else {
        collapse_all();
        // Force a reflow to ensure padding is applied before animation starts
        elem.offsetHeight;
        elem.classList.add('show');
    }
}
function collapse_all() {
    var elems = document.getElementsByClassName("collapse");
    for(i = 0; i < elems.length; i++) elems[i].classList.remove('show');
}
</script>
<style type="text/css">
.hidden {
    display: none;
}

li {
    padding: 3pt;
}
</style>
![Profile Image]({{ "/assets/images/academia.svg" | absolute_url }})

## Publications

{% bibliography %}
