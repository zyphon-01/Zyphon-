document.addEventListener("DOMContentLoaded", function() {
        const darkModeToggle = document.getElementById("toggle-icon");
        const body = document.body;

        const darkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";
        if (darkModeEnabled) {
                body.classList.add("dark-mode");
                darkModeToggle.textContent = "";
        }

        function toggleDarkMode() {
                body.classList.toggle("dark-mode");
                const isDarkModeEnabled = body.classList.contains("dark-mode");
           localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
                darkModeToggle.textContent = isDarkModeEnabled ? "  " : "  ";

                // تحديد لون شريط الحالة بناءً على وضع السمة
                const themeColor = isDarkModeEnabled ? "deeppink" : "#FF5800";
                setThemeColor(themeColor);
        }

        window.toggleDarkMode = toggleDarkMode;

        // تحديد لون شريط الحالة
        function setThemeColor(color) {
                const metaTag = document.getElementById("theme-color-meta");
                metaTag.setAttribute("content", color);
        }

        // تحديد لون شريط الحالة عند تحميل الصفحة
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialThemeColor = isDarkMode ? "deeppink" : "#FF5800";
        setThemeColor(initialThemeColor);
});







//page
var startX;
     var startY;
     var dist = 100;
     document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
});
document.addEventListener('touchend', function(e) {
        var endX = e.changedTouches[0].pageX;
        var endY = e.changedTouches[0].pageY;
        var diffX = startX - endX;
        var diffY = startY - endY;
        
        if ((document.getElementById('page1').style.display !== 'none' || document.getElementById('page72').style.display !== 'none') && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > dist) {
                if (diffX > 0) {
                        navigateTo('page72');
                } else {
                        navigateTo('page1');
                }
        }
});
function navigateTo(pageId) {
        history.pushState({ page: pageId }, null, `#${pageId}`);
        showPage(pageId);
}
function showPage(pageId) {
        var content = document.getElementById('app');
        content.innerHTML = `<h1>${pageId}</h1>`;
}
window.onload = function() {
        var initialPageId = window.location.hash.slice(1) || 'page1';
        navigateTo(initialPageId);
};
window.onpopstate = function(event) {
        var pageId = (event.state && event.state.page) || 'page1';
        showPage(pageId);
};
function showPage(pageId) {
        // إعادة تعيين موضع السكرول إلى الأعلى
        window.scrollTo(0, 0);

        var pages = document.querySelectorAll('.page');
        for (var i = 0; i < pages.length; i++) {
                pages[i].style.display = 'none';
        }
        var pageToShow = document.getElementById(pageId);
        pageToShow.style.display = 'block';
        var tableRow = document.getElementById('table-' + pageId);
        registerUsername();
}





//??

                    

 //suciriti


 //storage
 localStorage.setItem('key', 'value');
 
 // استرجاع القيمة من localStorage
 var myValue = localStorage.getItem('key');
 console.log(myValue);
 









// تحقق من وضع الظلام
function isDarkMode() {
        return document.body.classList.contains('dark-mode');
}

// تحديث لون شريط العنوان
function updateThemeColor() {
        var themeColor = document.getElementById('theme-color');
        if (isDarkMode()) {
                themeColor.setAttribute('content', 'red'); // لون شريط العنوان في الوضع الظلام
        } else {
                themeColor.setAttribute('content', '#000000'); // لون شريط العنوان في الوضع النهار
        }
}

// تبديل الوضع الظلام
function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        updateThemeColor();
}