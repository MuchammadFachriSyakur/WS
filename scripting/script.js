const navbar = document.querySelector(".nav_bar .wrap_top .iconBar");

navbar.addEventListener("click", (e) => {
  const wrapBar =
    navbar.parentElement.parentElement.querySelector(".wrap_bottom");

  wrapBar.classList.toggle("active");
});
