const smoothScrollAnchor = document.querySelectorAll('a[href^="#"]')

for (let index = 0; index < smoothScrollAnchor.length; index++) {
    const el = smoothScrollAnchor[index]

    el.addEventListener("click", function (event) {
        event.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        target.scrollIntoView({ behavior: "smooth" })
    })
}
