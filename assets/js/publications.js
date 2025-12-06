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

function copyBibtex(key, button) {
    var bibtexContent = document.getElementById(key + '-bibtex-content');
    if (bibtexContent) {
        var text = bibtexContent.textContent || bibtexContent.innerText;
        navigator.clipboard.writeText(text).then(function() {
            // Visual feedback
            if (button) {
                var originalHTML = button.innerHTML;
                button.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                button.classList.add('copied');
                setTimeout(function() {
                    button.innerHTML = originalHTML;
                    button.classList.remove('copied');
                }, 2000);
            }
        }).catch(function(err) {
            console.error('Failed to copy: ', err);
        });
    }
}

