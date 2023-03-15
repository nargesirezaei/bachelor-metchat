const btns = document.querySelectorAll(".tab-btn");
const log_reg = document.querySelector(".log-reg");
const forms = document.querySelectorAll(".content");
const btn = document.querySelector(".btn");
const button_reg = document.getElementsByClassName("btn-reg")[0];
const terms = document.getElementsByClassName("model-overlay")[0];

log_reg.addEventListener("click", function (e) {
  const id = e.target.dataset.id;
  if (id) {
    forms.forEach(function (form) {
      form.classList.remove("active");
    });
    const element = document.getElementById(id);
    element.classList.add("active");
  }
});
button_reg.addEventListener("click", function (e) {
  terms.style.display = "flex";
});
