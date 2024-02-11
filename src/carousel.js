import { addClass, removeClass } from "./utils-class"

const carouselId = document?.getElementById("carousel")
const carouselItems = carouselId?.getElementsByClassName("flex")[0]
const carouselContainer = carouselId?.getElementsByClassName("container")[0]

function carouselCalculateOffset() {
   const carouselOffset = carouselContainer.getBoundingClientRect().left
   // console.log(carouselOffset)
   carouselItems.style.paddingLeft = `${carouselOffset - 16}px`
   carouselItems.style.paddingRight = `${carouselOffset - 16}px`
}

function slide(wrapper, items) {
   let postX1 = 0
   let postX2 = 0
   let postInitial
   let posFinal
   let threshold = 100
   let itemToShow = 4
   let slides = items.getElementsByClassName("card")
   let slidesLength = slides.length
   let slideSize = items.getElementsByClassName("card")[0].offsetWidth
   let index = 0
   let allowShift = true

   console.dir(slideSize)
   wrapper.classList.add("loaded")

   items.onmousedown = dragStart

   items.addEventListener("touchstart", dragStart)
   items.addEventListener("touchend", dragEnd)
   items.addEventListener("touchmove", dragAction)
}

if (carouselId) {
   slide(carouselId, carouselItems)
   window.addEventListener("load", carouselCalculateOffset)
   window.addEventListener("resize", carouselCalculateOffset)
}
