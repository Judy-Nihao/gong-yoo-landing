
// 影片彈出的 jQuery 插件
$(document).ready(function() {
	$('.popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
});


const documentHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty("--doc-height", `${window.innerHeight}px`)
   }

   if(window.innerHeight < 768){
    documentHeight();
   }



let nav = document.querySelector("nav");
let navHeight = nav.getBoundingClientRect().height;

// 設定根元素 html 的 :root style 
// 用即時的 navHeight 數值去取代 CSS 裡面--nav-height 變數的值
window.addEventListener("resize", function(){
    document.documentElement.style.setProperty("--nav-height", navHeight + "px");
});


// 預設大家的 duration 都是 1 秒
// 但還是可以在單個身上添加獨立的 duration，那就會以單個身上的為主，不吃 default
const timeline = gsap.timeline({ defaults: { duration:1 } });

// 文字由下往上淡入
// revelaer 由左往右長出寬度後＋再由左往右移出
// loader-text-wrapper 在 revealer 一移出後就立刻消失，露出底下的網頁內容，沒有延遲。
timeline
.from(".loader-text",{
    y: "25",
    opacity: "0",
    ease: "power3.inOut",
})
.from(".revealer", {
    width: "0",
    ease: "power3.inOut",
}, "<0.5")
.to(".revealer", {
    left: "100%",
    display: "none",
    ease: "power3.inOut",
}, '< 0.75')
.to(".loader-text-wrapper", 0.5, {
    opacity: "0",
    display: "none",
    ease: "power3.inOut"
})
.from(".col-left", 1.5, {
    left: "-100%",
    ease: "power3.inOut"
}, 2) //這個2秒是絕對值的延遲秒數，表示從第一個動畫發動後往後延遲的2秒
.from(".col-left .copy > *", {
    x: "-40",
    opacity: "0",
    ease: "power3.inOut",
    stagger: 0.25
},"<0.5")
.from(".col-right .header", {
    x: "-20",
    opacity: "0",
    ease: "power3.inOut"
},"<1")


// < 0.5 代表「相對於前一個」動畫延遲 delay 0.5秒
// 測試發現要注意 "<0.5" 引號內左右兩側，不可以有多餘空白，否則會失效。
