(() => {
  "use strict";
  const data = window.PAPER_DATA;
  const config = window.SITE_CONFIG || {};
  if (!data) return;

  document.getElementById("abstract-text").textContent = data.abstract;
  document.querySelector('[data-stat="videos"]').textContent = data.benchmark.videos;
  const hours = document.querySelector('[data-stat="hours"]');
  hours.replaceChildren(document.createTextNode(data.benchmark.hours));
  const unit = document.createElement("span");
  unit.className = "unit";
  unit.textContent = " h";
  hours.append(unit);

  document.querySelectorAll("[data-resource]").forEach(link => {
    const url = config[link.dataset.resource];
    if (!url) {
      if (link.getAttribute("aria-disabled") === "true") {
        link.removeAttribute("href");
        link.setAttribute("title", "Coming soon");
        link.setAttribute("role", "link");
      }
      return;
    }
    if (!/^https?:\/\//i.test(url) && !/^assets\//.test(url)) return;
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener";
    link.removeAttribute("aria-disabled");
    link.querySelector("small")?.remove();
  });

  const resultsBody = document.getElementById("results-body");
  const maxima = Array.from({ length: 6 }, (_, column) => Math.max(...data.results.map(result => result.scores[column])));
  let previousFamily = null;
  data.results.forEach(result => {
    const row = document.createElement("tr");
    row.dataset.model = result.model;
    if (previousFamily && previousFamily !== result.family) row.classList.add("group-start");
    if (result.family === "Ours") row.classList.add("proposed");
    const name = document.createElement("th");
    name.scope = "row";
    name.textContent = result.model;
    row.append(name);
    result.scores.forEach((score, column) => {
      const cell = document.createElement("td");
      cell.textContent = score.toFixed(1);
      if (score === maxima[column]) cell.classList.add("best");
      row.append(cell);
    });
    resultsBody.append(row);
    previousFamily = result.family;
  });

  function showCase(index) {
    const example = data.cases[index];
    document.querySelectorAll("[data-case]").forEach(button => {
      const selected = Number(button.dataset.case) === index;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    document.getElementById("case-panel").setAttribute("aria-labelledby", "case-tab-" + index);
    document.getElementById("case-question").textContent = example.question;
    const choices = document.getElementById("case-options");
    choices.replaceChildren();
    const correct = example.answer.slice(0, 1);
    example.options.forEach((option, optionIndex) => {
      const li = document.createElement("li");
      li.textContent = option;
      if (String.fromCharCode(65 + optionIndex) === correct) li.classList.add("correct");
      choices.append(li);
    });
    const image = document.getElementById("case-image");
    image.src = example.image;
    image.alt = "Selected panoramic video frames: " + example.title;
    image.width = 2400;
    image.height = index === 2 ? 1062 : 496;
    document.getElementById("case-zoom").dataset.zoom = example.image;
    document.getElementById("case-zoom").dataset.caption = example.title;
    const caption = document.getElementById("case-caption");
    const titleEnd = example.caption.indexOf(". ");
    caption.replaceChildren();
    if (titleEnd !== -1) {
      const title = document.createElement("strong");
      title.textContent = example.caption.slice(0, titleEnd + 1);
      caption.append(title, document.createTextNode(example.caption.slice(titleEnd + 1)));
    } else {
      caption.textContent = example.caption;
    }
    document.getElementById("case-answer").textContent = example.answer;
    document.getElementById("case-baseline").textContent = example.baseline;
    document.getElementById("case-reasoning").textContent = example.reasoning;
    document.querySelector(".reasoning-details").open = false;
  }
  const caseButtons = [...document.querySelectorAll("[data-case]")];
  caseButtons.forEach((button, index) => {
    button.addEventListener("click", () => showCase(index));
    button.addEventListener("keydown", event => {
      let next;
      if (event.key === "ArrowRight") next = (index + 1) % caseButtons.length;
      if (event.key === "ArrowLeft") next = (index - 1 + caseButtons.length) % caseButtons.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = caseButtons.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        showCase(next);
        caseButtons[next].focus();
      }
    });
  });
  showCase(0);

  const dialog = document.getElementById("figure-dialog");
  const dialogImage = document.getElementById("dialog-image");
  const sizeToggle = document.getElementById("toggle-figure-size");
  sizeToggle.addEventListener("click", () => {
    const actual = dialog.classList.toggle("actual-size");
    sizeToggle.setAttribute("aria-pressed", String(actual));
    sizeToggle.textContent = actual ? "Fit to window" : "Actual size";
  });
  const closeDialog = () => dialog.close();
  document.querySelectorAll("[data-zoom], #case-zoom").forEach(button => {
    button.addEventListener("click", () => {
      dialogImage.src = button.dataset.zoom;
      dialogImage.alt = button.dataset.caption;
      document.getElementById("dialog-caption").textContent = button.dataset.caption;
      dialog.classList.remove("actual-size");
      sizeToggle.setAttribute("aria-pressed", "false");
      sizeToggle.textContent = "Actual size";
      dialog.showModal();
      document.body.style.overflow = "hidden";
    });
  });
  document.getElementById("close-dialog").addEventListener("click", closeDialog);
  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
    }
  });
  dialog.addEventListener("close", () => { document.body.style.overflow = ""; });

})();
