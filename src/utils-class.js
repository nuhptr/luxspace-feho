export function addClass(element, className) {
   element.classList?.add(...className.split(" "))
}

export function removeClass(element, className) {
   element.classList?.remove(...className.split(" "))
}
