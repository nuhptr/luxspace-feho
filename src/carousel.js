import { addClass, removeClass } from "./utils-class"

// get id from html which contain "carousel"
const carouselId = document?.getElementById("carousel")
// get className from html which contain "flex"
const carouselItems = carouselId?.getElementsByClassName("flex")[0]
// get className from html which contain "container"
const carouselContainer = carouselId?.getElementsByClassName("container")[0]

function carouselCalculateOffset() {
   const carouselOffset = carouselContainer.getBoundingClientRect().left
   // console.log(carouselOffset)
   // adding css in javascript
   carouselItems.style.paddingLeft = `${carouselOffset - 16}px`
   carouselItems.style.paddingRight = `${carouselOffset - 16}px`
}

function slide(wrapper, items) {
   let posX1 = 0
   let posX2 = 0
   let posInitial
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

   items.addEventListener("transitionend", checkIndex)

   //* drag start event
   function dragStart(event) {
      event = event || window.event
      event.preventDefault()
      posInitial = items.offsetLeft

      if (event.type === "touchstart") {
         console.log(event.touches)
         posX1 = event.touches[0].clientX
      } else {
         posX1 = event.clientX
         document.onmousemove = dragAction
         document.onmouseup = dragEnd
      }
   }

   //* drag action event
   function dragAction(event) {
      event = event || window.event

      if (event.type == "touchmove") {
         posX2 = posX1 - event.touches[0].clientX
         posX1 = event.touches[0].clientX
      } else {
         posX2 = posX1 - event.clientX
         posX1 = event.clientX
      }
      items.style.left = `${items.offsetLeft - posX2}px`
   }

   //* drag end event
   function dragEnd(event) {
      posFinal = items.offsetLeft

      if (posFinal - posInitial < -threshold) {
         shiftSlide(1, "drag")
      } else if (posFinal - posInitial > threshold) {
         shiftSlide(-1, "drag")
      } else {
         items.style.left = posInitial + "px"
      }
      // if not to click, back to normal
      document.onmouseup = null
      document.onmousemove = null
   }

   //* shift slide
   function shiftSlide(direction, action) {
      addClass(items, "transition-all duration-200")

      if (allowShift) {
         if (!action) posInitial = items.offsetLeft
         // Jika sudah mentok geser ke kanan maka stop
         if (direction === 1) {
            items.style.left = `${posInitial - slideSize}px`
            index++
         }
         // Jika sudah mentok geser ke kiri maka stop
         else if (direction === -1) {
            items.style.left = `${posInitial + slideSize}px`
            index--
         }
      }
      allowShift = false
   }

   //* check index
   function checkIndex() {
      // debound animate which there
      setTimeout(() => {
         removeClass(items, "transition-all duration-200")
      })

      if (index === -1) {
         items.style.left = -(slidesLength * slideSize) + "px"
         index = slidesLength - 1
      }
      if (index === slidesLength - itemToShow) {
         items.style.left = -((slidesLength - itemToShow - 1) * slideSize) + "px"
         index = slidesLength - itemToShow - 1
      }
      if (index === slidesLength || index === slidesLength - 1) {
         items.style.left = "0px"
         index = 0
      }
      allowShift = true
   }
}

if (carouselId) {
   slide(carouselId, carouselItems)
   window.addEventListener("load", carouselCalculateOffset)
   window.addEventListener("resize", carouselCalculateOffset)
}
