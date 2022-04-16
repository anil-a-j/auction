export const switchActiveClass = (e) => {
  const arr = e.target.parentNode.parentNode.children;
  for (let ar of arr) {
    if (ar.firstChild.getAttribute("href") === e.target.getAttribute("href")) {
      if (!ar.firstChild.classList.contains("active")) {
        ar.firstChild.classList.add("active");
      }
    } else {
      ar.firstChild.classList.remove("active");
    }
  }
};
