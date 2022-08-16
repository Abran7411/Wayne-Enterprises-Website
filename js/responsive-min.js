function $(a) { return document.getElementById(a) }
var menuTitles = ["home", "usage", "settings", "editor"],
    wNew, wOld = Number.POSITIVE_INFINITY,
    menuItem, infoContainer = $("info-container"),
    logo = $("logo"),
    buy = $("buy"),
    buyTitle = $("buy-title");

function setMenuItemSpacing(a) { for (var b = menuTitles.length; b--;) menuItem = $(menuTitles[b]), menuItem.style.marginLeft = menuItem.style.marginRight = a + "px" }

function setMenuTopSpacing(a) { for (var b = menuTitles.length; b--;) $(menuTitles[b]).style.paddingTop = a + "px" }

function setMenuFontSize(a) { for (var b = menuTitles.length; b--;) $(menuTitles[b]).style.fontSize = a + "px" }

function onWindowResize(a) {
    wNew = document.documentElement.clientWidth;
    1E3 > wNew ? (infoContainer && (infoContainer.style.width = wNew + "px"), 700 > wNew ? (700 <= wOld && setMenuItemSpacing(5), 500 > wNew && 500 <= wOld ? (setMenuFontSize(12), setMenuTopSpacing(36), logo.style.width = "60px", buyTitle.style.width = buy.style.width = "60px", buyTitle.style.top = buy.style.top = "7px") : 500 <= wNew && 500 > wOld && (setMenuFontSize(16), setMenuTopSpacing(19), logo.style.width = "100px", buyTitle.style.width = buy.style.width = "90px", buyTitle.style.top = buy.style.top =
        "12px")) : 700 > wOld && (setMenuItemSpacing(23), setMenuFontSize(16), setMenuTopSpacing(19), logo.style.width = "100px", buyTitle.style.width = buy.style.width = "90px", buyTitle.style.top = buy.style.top = "12px")) : 1E3 > wOld && (infoContainer && (infoContainer.style.width = "1000px"), setMenuItemSpacing(23), setMenuTopSpacing(19), setMenuFontSize(16), logo.style.width = "100px", buyTitle.style.width = buy.style.width = "90px", buyTitle.style.top = buy.style.top = "12px");
    wOld = wNew
}
window.addEventListener("resize", onWindowResize);
onWindowResize();