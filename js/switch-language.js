document.addEventListener("DOMContentLoaded", function () {
  i18next
    .use(i18nextHttpBackend)
    .use(i18nextBrowserLanguageDetector)
    .init(
      {
        debug: true,
        fallbackLng: "ka",
        backend: {
          loadPath: loadPathTemplate,
        },
      },
      function (err, t) {
        if (err) {
          console.error("i18next initialization error:", err);
          return;
        }
        // Initial translation
        updateContent();
      }
    );

  function updateContent() {
    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const dataI18n = element.getAttribute("data-i18n");
      const [attrName, key] = dataI18n.split("]");

      // Check if the attribute is meant for placeholders
      if (attrName === "[placeholder") {
        element.setAttribute("placeholder", i18next.t(key));
      } else {
        // Otherwise, update the inner text
        element.innerText = i18next.t(dataI18n);
      }
    });
  }

  document
    .getElementById("switch-to-georgian")
    .addEventListener("click", function () {
      i18next.changeLanguage("ka", (err, t) => {
        if (err) {
          console.error("Error changing language to Georgian:", err);
          return;
        }
        updateContent();
      });
    });

  document
    .getElementById("switch-to-english")
    .addEventListener("click", function () {
      i18next.changeLanguage("en", (err, t) => {
        if (err) {
          console.error("Error changing language to English:", err);
          return;
        }
        updateContent();
      });
    });
});
