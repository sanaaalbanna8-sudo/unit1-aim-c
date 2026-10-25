const SPEAKER = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12zM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54z"/></svg>';

const NAV = [
  { title: "البداية · من الحياة", links: [
    ["index.html#home", "الحياة أولًا"],
    ["index.html#scenes", "الشارع والامتحان والعمل"],
    ["index.html#deduce", "سؤال الاستنتاج"],
    ["index.html#concept", "السياسة والإجراء"],
    ["index.html#bridge", "الجسر الرقمي"],
    ["index.html#digital", "إشارات العالم الرقمي"],
    ["index.html#route", "مسار بقية الدرس"]
  ]},
  { title: "ج1 · التهديدات", links: [
    ["c1.html#c1-open", "افتتاح التهديدات"],
    ["c1.html#why-policy", "لماذا نكتب سياسة"],
    ["c1.html#habits", "عادات تعرّض البيانات"],
    ["c1.html#malware", "الفيروسات والبرامج الضارة"],
    ["c1.html#ransomware", "برمجيات الفدية"],
    ["c1.html#hackers", "القراصنة"],
    ["c1.html#phishing", "التصيد الاحتيالي"],
    ["c1.html#accidental", "التلف العرضي"],
    ["c1.html#people", "الأثر على الأفراد"],
    ["c1.html#organisations", "الأثر على المؤسسات"],
    ["c1.html#travelex", "دراسة ترافيليكس"]
  ]},
  { title: "ج2 · الحماية", links: [
    ["c2.html#c2-open", "افتتاح الحماية"],
    ["c2.html#permissions", "أذونات الملفات"],
    ["c2.html#access", "مستويات الوصول"],
    ["c2.html#backup", "النسخ والاسترداد"],
    ["c2.html#passwords", "كلمات السر"],
    ["c2.html#physical", "التحكم الفعلي"],
    ["c2.html#certificates", "الشهادات والبروتوكولات"],
    ["c2.html#antivirus", "مكافحة الفيروسات"],
    ["c2.html#firewall", "جدران الحماية"],
    ["c2.html#encrypt-store", "تشفير المخزّن"],
    ["c2.html#encrypt-transit", "تشفير الإرسال"],
    ["c2.html#protect-choice", "أي إجراء أولًا؟"]
  ]},
  { title: "ج3 · الأخلاق", links: [
    ["c3.html#c3-open", "الأخلاق والسلوك"],
    ["c3.html#privacy", "الخصوصية"],
    ["c3.html#environment", "البيئة"],
    ["c3.html#divide", "عدم المساواة"],
    ["c3.html#netiquette", "آداب الإنترنت والعولمة"],
    ["c3.html#speech", "التعبير والاستخدام المقبول"],
    ["c3.html#hats", "القبعات الثلاث"],
    ["c3.html#clinic-ethics", "مشهد العيادة"]
  ]},
  { title: "ج4 · القانون", links: [
    ["c4.html#c4-open", "لماذا التشريع"],
    ["c4.html#cma", "إساءة استخدام الحاسوب"],
    ["c4.html#copyright", "حقوق النشر"],
    ["c4.html#health", "الصحة والسلامة"],
    ["c4.html#gdpr", "حماية البيانات"],
    ["c4.html#consumer", "حقوق المستهلك"],
    ["c4.html#access-framework", "إطار تيسير الوصول"],
    ["c4.html#local", "قانون البلد"]
  ]},
  { title: "ج5 · الإدارة", links: [
    ["c5.html#c5-open", "قواعد الممارسة"],
    ["c5.html#codes-impact", "أثر القواعد"],
    ["c5.html#standards", "المساواة والآيزو والتيسير"],
    ["c5.html#aup-role", "سياسة الاستخدام المقبول"],
    ["c5.html#policy-map", "محتويات السياسات"],
    ["c5.html#incident", "إدارة الحوادث"],
    ["c5.html#factors", "أنظمة داخلية وخارجية"],
    ["c5.html#jurisdiction", "ملكية البيانات"],
    ["c5.html#serena", "تمرين سيرينا"],
    ["c5.html#serena-options", "خياران وميزانية"]
  ]},
  { title: "المعجم", links: [
    ["glossary.html#glossary", "المصطلحات والنطق"],
    ["glossary.html#close", "نهاية المسار"]
  ]}
];

const OFFSETS = {
  "index.html": 0,
  "c1.html": 7,
  "c2.html": 18,
  "c3.html": 30,
  "c4.html": 38,
  "c5.html": 46,
  "glossary.html": 56
};
const TOTAL = 58;

function toast(message) {
  const el = document.getElementById("toast");
  if (!el) return;
  el.textContent = message;
  el.style.display = "block";
  clearTimeout(toast._t);
  toast._t = setTimeout(() => { el.style.display = "none"; }, 3200);
}

function buildNav() {
  const side = document.getElementById("side");
  if (!side) return;
  const here = location.pathname.split(/[/\\]/).pop() || "index.html";
  const hash = location.hash;
  side.innerHTML = `
    <div class="brand-block">
      <a href="index.html">
        <div class="brand-k">UNIT 1 · AIM C</div>
        <strong>سياسات استخدام تكنولوجيا المعلومات</strong>
        <span>الصف 11 · الهدف ج</span>
      </a>
    </div>
    ${NAV.map((group) => `
      <h2>${group.title}</h2>
      ${group.links.map(([href, label]) => {
        const [file, id] = href.split("#");
        const active = here === file && hash === "#" + id;
        return `<a class="item${active ? " active" : ""}" href="${href}">${label}</a>`;
      }).join("")}
    `).join("")}
  `;
}

function upgradeTerms() {
  document.querySelectorAll(".t").forEach((el) => {
    if (el.dataset.ready) return;
    el.dataset.ready = "1";
    const en = el.dataset.en || "";
    const say = el.dataset.say || en;
    const ar = (el.dataset.ar || el.textContent || "").trim();
    el.textContent = "";
    el.classList.add("term");
    if (ar) {
      const label = document.createElement("span");
      label.className = "ar";
      label.textContent = ar;
      el.append(label);
    }
    if (en) {
      const bdi = document.createElement("bdi");
      bdi.className = "en";
      bdi.textContent = en;
      el.append(bdi);
    }
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "say";
    btn.dataset.en = say;
    btn.setAttribute("aria-label", "نطق " + (en || say));
    btn.innerHTML = SPEAKER;
    el.append(btn);
  });
}

function pickVoice() {
  const voices = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
  return voices.find((v) => v.lang.toLowerCase().startsWith("en-gb"))
    || voices.find((v) => v.lang.toLowerCase().startsWith("en"));
}

function speak(text, button) {
  if (!window.speechSynthesis) {
    toast("هذا المتصفح لا يشغّل النطق. المصطلح الإنجليزي ظاهر بجانب السماعة.");
    return;
  }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-GB";
  utter.rate = 0.9;
  const voice = pickVoice();
  if (voice) utter.voice = voice;
  document.querySelectorAll(".say.on").forEach((b) => b.classList.remove("on"));
  if (button) button.classList.add("on");
  utter.onend = () => button && button.classList.remove("on");
  window.speechSynthesis.speak(utter);
}

function wireReveals() {
  document.querySelectorAll(".reveal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const box = btn.nextElementSibling;
      if (!box || !box.classList.contains("reveal")) return;
      const open = box.hasAttribute("hidden");
      if (open) {
        box.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
        btn.textContent = "إخفاء النقاش";
      } else {
        box.setAttribute("hidden", "");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = btn.dataset.label || "أظهر ما نناقشه";
      }
    });
  });
}

function wirePicks() {
  document.querySelectorAll("[data-picks]").forEach((wrap) => {
    const note = wrap.querySelector(".pick-note");
    wrap.querySelectorAll("button[data-note]").forEach((btn) => {
      btn.addEventListener("click", () => {
        wrap.querySelectorAll("button").forEach((b) => b.classList.remove("on"));
        btn.classList.add("on");
        if (note) note.textContent = btn.dataset.note;
      });
    });
  });
}

function wireGlossary() {
  const input = document.getElementById("glossarySearch");
  if (!input) return;
  input.addEventListener("input", () => {
    const value = input.value.trim().toLowerCase();
    document.querySelectorAll(".gloss article").forEach((article) => {
      article.hidden = Boolean(value) && !article.innerText.toLowerCase().includes(value);
    });
  });
}

document.addEventListener("click", (event) => {
  const say = event.target.closest(".say");
  if (!say) return;
  event.preventDefault();
  speak(say.dataset.en, say);
});

document.getElementById("btnMenu")?.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") document.body.classList.remove("nav-open");
});

if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => pickVoice();
}

buildNav();
upgradeTerms();
wireReveals();
wirePicks();
wireGlossary();
bootDeck();

function bootDeck() {
  const slides = [...document.querySelectorAll(".slide")];
  if (!slides.length) return;
  const here = location.pathname.split(/[/\\]/).pop() || "index.html";
  const offset = OFFSETS[here] || 0;
  let index = 0;
  if (location.hash === "#end") index = slides.length - 1;
  else if (location.hash) {
    const found = slides.findIndex((slide) => "#" + slide.id === location.hash);
    if (found >= 0) index = found;
  }

  const bar = document.createElement("div");
  bar.className = "deck-bar";
  bar.innerHTML = '<button type="button" id="deckPrev">السابق</button><div class="track" aria-hidden="true"><span id="deckFill"></span></div><span class="count" id="deckCount"></span><button type="button" class="go" id="deckNext">التالي</button>';
  document.body.append(bar);

  function show(nextIndex) {
    index = nextIndex;
    slides.forEach((slide, i) => slide.classList.toggle("on", i === index));
    slides[index].scrollTop = 0;
    const id = slides[index].id;
    const nextFile = document.body.dataset.next;
    const atEnd = index === slides.length - 1;
    history.replaceState(null, "", location.pathname + "#" + id);
    document.getElementById("deckCount").textContent = (offset + index + 1) + " / " + TOTAL;
    document.getElementById("deckFill").style.width = ((offset + index + 1) / TOTAL * 100) + "%";
    const nextBtn = document.getElementById("deckNext");
    const prevBtn = document.getElementById("deckPrev");
    nextBtn.textContent = atEnd && nextFile ? "الجزء التالي" : "التالي";
    nextBtn.disabled = atEnd && !nextFile;
    prevBtn.disabled = index === 0 && !document.body.dataset.prev;
    document.querySelectorAll(".side a.item").forEach((link) => {
      const href = link.getAttribute("href") || "";
      link.classList.toggle("active", href.endsWith("#" + id) && href.startsWith(here));
    });
  }

  function goNext() {
    if (index < slides.length - 1) show(index + 1);
    else if (document.body.dataset.next) location.href = document.body.dataset.next;
  }

  function goPrev() {
    if (index > 0) show(index - 1);
    else if (document.body.dataset.prev) location.href = document.body.dataset.prev + "#end";
  }

  document.getElementById("deckNext").addEventListener("click", goNext);
  document.getElementById("deckPrev").addEventListener("click", goPrev);
  document.getElementById("side")?.addEventListener("click", (event) => {
    const link = event.target.closest("a.item");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    const [file, hash] = href.split("#");
    if ((file === here || file === "") && hash) {
      const found = slides.findIndex((slide) => slide.id === hash);
      if (found >= 0) {
        event.preventDefault();
        show(found);
        document.body.classList.remove("nav-open");
      }
    }
  });
  document.querySelector(".deck")?.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const href = link.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    const found = slides.findIndex((slide) => "#" + slide.id === href);
    if (found >= 0) {
      event.preventDefault();
      show(found);
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.target.matches("input, textarea")) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown" || event.key === "PageDown") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "PageUp") {
      event.preventDefault();
      goPrev();
    }
  });
  show(index);
}
