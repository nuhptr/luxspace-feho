import { addClass, removeClass } from "./utils-class"

const menuTooglerId = document.getElementById("menu-toogler")

menuTooglerId.addEventListener("click", function () {
   const menuId = document.getElementById("menu")

   if (menuId.className.indexOf("opacity-0") > -1) {
      addClass(menuTooglerId, "fixed top-10 right-5")
      removeClass(menuTooglerId, "relative")
      addClass(menuId, "opacity-100 z-30")
      removeClass(menuId, "opacity-0 invisible")
   } else {
      addClass(menuTooglerId, "relative")
      removeClass(menuTooglerId, "fixed top-10 right-5")
      addClass(menuId, "opacity-0 invisible")
      removeClass(menuId, "opacity-100 z-30")
   }
})
