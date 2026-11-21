async function loadSite() {
  try {
    const res = await fetch("./data.json?_=" + Date.now());
    const data = await res.json();

    document.title = data.title || "Мой сайт";
    document.getElementById("badge").textContent = data.badge || "ONLINE";
    document.getElementById("site-title").textContent = data.title || "Мой сайт";
    document.getElementById("site-subtitle").textContent = data.subtitle || "";

    const linksWrap = document.getElementById("social-links");
    linksWrap.innerHTML = "";
    (data.links || []).forEach((item) => {
      const a = document.createElement("a");
      a.className = "btn";
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = item.label;
      linksWrap.appendChild(a);
    });

    const grid = document.getElementById("cards-grid");
    grid.innerHTML = "";
    (data.cards || []).forEach((card) => {
      const el = document.createElement("article");
      el.className = "card glass";
      el.innerHTML = `
        <div>
          <h3>${card.title}</h3>
          <p>${card.description}</p>
        </div>
        ${card.url ? `<a class="card-link" href="${card.url}" target="_blank" rel="noopener noreferrer">${card.linkText || "Открыть →"}</a>` : ""}
      `;
      grid.appendChild(el);
    });
  } catch (err) {
    document.getElementById("site-title").textContent = "Ошибка загрузки data.json";
    console.error(err);
  }
}

loadSite();
