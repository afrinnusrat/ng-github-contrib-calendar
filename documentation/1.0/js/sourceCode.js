document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector("#source-tab"),t=document.querySelector("pre");if(t){$prismCode=t.querySelector("code"),$content=document.querySelector(".content"),prismLinks=document.querySelectorAll(".link-to-prism");for(var n=0;n<prismLinks.length;n++)prismLinks[n].addEventListener("click",r,!1);function r(n){var r=n.target.getAttribute("data-line");n.preventDefault(),t.setAttribute("data-line",r),Prism.highlightElement($prismCode,function(){}),e.click(),setTimeout(function(){var e=document.querySelector(".line-highlight"),t=parseInt(getComputedStyle(e)["top"]);$content.scrollTop=t},500)}}});