document.addEventListener("DOMContentLoaded", function () {

    // ==========================
    // MENU PARA TELEMÓVEIS
    // ==========================

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {
            const menuAberto = navMenu.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", menuAberto);
            menuToggle.textContent = menuAberto ? "✕" : "☰";
        });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }


    // ==========================
    // ATUALIZAR O ANO DO RODAPÉ
    // ==========================

    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // ==========================
    // MODO CLARO E MODO ESCURO
    // ==========================

    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Recuperar o tema guardado
    const savedTheme = localStorage.getItem("nzo-yetu-theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
    } else {
        body.classList.remove("dark-mode");
    }

    // Atualizar o botão do modo claro/escuro
function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = body.classList.contains("dark-mode");

    themeToggle.innerHTML = `
        <span class="theme-switch-thumb">
            <span class="theme-sun">☀️</span>
            <span class="theme-moon">☾</span>
        </span>
    `;

    themeToggle.classList.add("theme-switch");

    themeToggle.setAttribute("aria-pressed", String(isDark));

    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Activar modo claro" : "Activar modo escuro"
    );
}
    updateThemeButton();

    // Alternar o tema
    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            body.classList.toggle("dark-mode");

            const isDark = body.classList.contains("dark-mode");

            localStorage.setItem(
                "nzo-yetu-theme",
                isDark ? "dark" : "light"
            );

            updateThemeButton();
        });
    }


    // ==========================
    // CORREIO ELETRÓNICO
    // ==========================

    const emailLinks = document.querySelectorAll(
        ".contact-item a[href^='mailto:']"
    );

    emailLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            console.log("O visitante clicou no correio eletrónico.");
        });
    });


    console.log("Site da NZO YETU carregado com sucesso!");

});

// Ampliar imagens apenas nas páginas dos projetos
document.addEventListener("DOMContentLoaded", function () {
    const imagens = document.querySelectorAll(".gallery-item img");

    // Se a página não tiver imagens de galeria, não faz nada
    if (imagens.length === 0) return;

    const lightbox = document.createElement("div");
    lightbox.className = "project-lightbox";

    lightbox.innerHTML = `
        <button
            type="button"
            class="project-lightbox-close"
            aria-label="Fechar imagem"
        >&times;</button>
        <img src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const imagemAmpliada = lightbox.querySelector("img");
    const fechar = lightbox.querySelector("button");

    imagens.forEach(function (imagem) {
        imagem.addEventListener("click", function () {
            imagemAmpliada.src = imagem.src;
            imagemAmpliada.alt = imagem.alt;
            lightbox.classList.add("active");
        });
    });

    function fecharImagem() {
        lightbox.classList.remove("active");
        imagemAmpliada.src = "";
    }

    fechar.addEventListener("click", fecharImagem);

    lightbox.addEventListener("click", function (evento) {
        if (evento.target === lightbox) {
            fecharImagem();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") {
            fecharImagem();
        }
    });
});