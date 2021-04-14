window.addEventListener("load", () => {
  // BUTTONS
  const left = document.querySelector(".btn-left");
  const right = document.querySelector(".btn-right");

  //   DOTS
  const dots = document.querySelectorAll(".carousel-dots__item");

  // CAROUSEL
  const slider = document.querySelector(".item-carousel__slide");
  const block = document.querySelectorAll(".item-carousel__row");

  // COUNTER
  let counter = 0;
  const stepSize = block[0].clientWidth;

  slider.style.transform = "translateX(" + `${-stepSize * counter}px)`;

  right.addEventListener("click", () => {
    counter >= block.length - 1 ? (counter = -1) : null;
    slider.classList.add("carousel__animation");
    counter++;
    slider.style.transform = "translateX(" + `${-stepSize * counter}px)`;
  });

  left.addEventListener("click", () => {
    if (counter <= 0) counter = block.length;
    slider.classList.add("carousel__animation");
    counter--;
    slider.style.transform = "translateX(" + `${-stepSize * counter}px)`;
  });
});




// ANIMATION

const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        pageYOffset > animItemOffset - animItemPoint &&
        pageYOffset < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}

// SCROLL TOP
const offset = 400;
const scrollUp = document.querySelector(".scroll-up");
const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = "stroke-dashoffset 20ms";

const getTop = () => window.pageYOffset || document.documentElement.scrollTo;

// updateDashoffset
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength) / height;
  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// onScroll
window.addEventListener("scroll", () => {
  updateDashoffset();

  if (getTop() > offset) {
    scrollUp.classList.add("scroll-up--active");
  } else {
    scrollUp.classList.remove("scroll-up--active");
  }
});

// click
scrollUp.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// MOBILE NAV
const navbar = document.querySelector(".item-mobile__show");
const showNavbar = document.querySelector(".show");
const hidenNavbar = document.querySelector(".hide");

showNavbar.onclick = show;
hidenNavbar.onclick = hide;

function show() {
  navbar.style.right = "0px";

  hidenNavbar.style.right = "20px";
  hidenNavbar.style.transition = "1s all ease"
  
  showNavbar.style.transition = ".7s all ease"
  showNavbar.style.top = "-200px"

}

function hide() {
  navbar.style.right = "-400px";

  hidenNavbar.style.right = "-520px";

  showNavbar.style.display = "block";
  showNavbar.style.top = "-0px"



}
