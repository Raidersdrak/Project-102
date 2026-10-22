document.addEventListener("DOMContentLoaded", function () {

    // 1. Get the header
    const header = document.querySelector("header");


    // 2. Smooth scrolling for links to sections on the same page
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                event.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }

        });

    });


    // 3. Highlight the current navigation page
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("header nav a").forEach(function (link) {

        const href = link.getAttribute("href");

        if (href && !href.startsWith("#")) {

            const linkPage = href.split("#")[0];

            if (linkPage === currentPage) {
                link.classList.add("active");
            }

        }

    });


    // 4. Contact form validation
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            if (!contactForm.checkValidity()) {
                event.preventDefault();
                contactForm.reportValidity();
            }

        });

    }


    // 5. Automatically update the footer year
    const yearElement = document.querySelector("#current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // 6. Hamburger menu: open and close
    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#main-navigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            const isOpen = navigation.classList.toggle("nav-open");

            menuButton.setAttribute("aria-expanded", String(isOpen));

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });


        // Close the menu after clicking a navigation link
        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("nav-open");

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        // Close the menu when clicking outside the header
        document.addEventListener("click", function (event) {

            if (
                navigation.classList.contains("nav-open") &&
                !header.contains(event.target)
            ) {

                navigation.classList.remove("nav-open");

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        // Close the menu when pressing Escape
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                navigation.classList.remove("nav-open");

                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    }

});

// ======================================
// MARTHA'S AUTOMATIC WELCOME POPUP
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const welcomePopup = document.getElementById("martha-welcome");
    const closeButton = document.getElementById("welcome-close");
    const exploreButton = document.getElementById("welcome-explore");

    // If this page does not contain the popup, do nothing.
    if (!welcomePopup) {
        return;
    }

    // Close the popup when Martha clicks the X.
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            welcomePopup.classList.add("welcome-hidden");
        });
    }

    // Close the popup when Martha clicks Let's Explore.
    if (exploreButton) {
        exploreButton.addEventListener("click", function () {
            welcomePopup.classList.add("welcome-hidden");
        });
    }

    // Close the popup when Martha presses Escape.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            welcomePopup.classList.add("welcome-hidden");
        }
    });

});


// ========================================
 // MARTHA'S SCROLLING WEBSITE TOUR
 // ========================================

document.addEventListener("DOMContentLoaded", function () {

    const tourMessages = [
        {
            section: ".introduction",
            title: "Getting curious, Martha",
            message: "There's always something new to learn. What do you think of the idea behind this website?"
        },
        {
            section: ".library-section",
            title: "Now we're getting somewhere",
            message: "These are some of the resources this website is designed to offer. Take a look around."
        },
        {
            section: ".motivation",
            title: "A little motivation for you",
            message: "Remember, great things start with small steps. Keep learning and keep growing."
        }
    ];

    const tourBox = document.createElement("div");
    tourBox.id = "martha-tour-message";

    tourBox.innerHTML = `
        <button type="button" id="martha-tour-close"
            aria-label="Close message">&times;</button>
        <h3 id="martha-tour-title"></h3>
        <p id="martha-tour-text"></p>
    `;

    document.body.appendChild(tourBox);

    const tourStyle = document.createElement("style");

    tourStyle.textContent = `
        #martha-tour-message {
            position: fixed;
            right: 18px;
            bottom: 18px;
            z-index: 9000;
            width: min(340px, calc(100vw - 36px));
            box-sizing: border-box;
            padding: 22px 20px 16px;
            border: 2px solid #e5ae45;
            border-radius: 14px;
            background: #09264a;
            color: #ffffff;
            box-shadow: 0 8px 28px rgba(0,0,0,0.25);
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: translateY(15px);
            transition: opacity 0.3s ease,
                        transform 0.3s ease,
                        visibility 0.3s ease;
        }

        #martha-tour-message.tour-visible {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            transform: translateY(0);
        }

        #martha-tour-message h3 {
            margin: 4px 25px 8px 0;
            color: #e5ae45;
            font-size: 17px;
        }

        #martha-tour-message p {
            margin: 0;
            font-size: 14px;
            line-height: 1.6;
        }

        #martha-tour-close {
            position: absolute;
            top: 8px;
            right: 12px;
            border: none;
            background: transparent;
            color: #ffffff;
            font-size: 25px;
            cursor: pointer;
        }

        @media (max-width: 480px) {
            #martha-tour-message {
                right: 12px;
                bottom: 12px;
                width: calc(100vw - 24px);
            }
        }
    `;

    document.head.appendChild(tourStyle);

    const titleElement = document.getElementById("martha-tour-title");
    const textElement = document.getElementById("martha-tour-text");
    const closeButton = document.getElementById("martha-tour-close");

    let currentSection = null;
    let messageDismissed = false;

    function hideTourMessage() {
        tourBox.classList.remove("tour-visible");
        currentSection = null;
    }

    function checkTourPosition() {
        if (messageDismissed) {
            hideTourMessage();
            return;
        }

        const footer = document.querySelector("footer");

        if (
            footer &&
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 80
        ) {
            if (currentSection !== "footer") {
                currentSection = "footer";
                titleElement.textContent = "You've reached the bottom";
                textElement.textContent =
                    "You've explored the whole page. What do you think of the website?";
                tourBox.classList.add("tour-visible");
            }

            return;
        }

        let activeMessage = null;

        for (let i = tourMessages.length - 1; i >= 0; i--) {
            const section = document.querySelector(
                tourMessages[i].section
            );

            if (
                section &&
                section.getBoundingClientRect().top <=
                window.innerHeight * 0.65 &&
                section.getBoundingClientRect().bottom > 0
            ) {
                activeMessage = tourMessages[i];
                break;
            }
        }

        if (!activeMessage) {
            hideTourMessage();
            return;
        }

        if (currentSection !== activeMessage.section) {
            currentSection = activeMessage.section;
            titleElement.textContent = activeMessage.title;
            textElement.textContent = activeMessage.message;
            tourBox.classList.add("tour-visible");
        }
    }

    window.addEventListener("scroll", checkTourPosition, {
        passive: true
    });

    window.addEventListener("resize", checkTourPosition);

    closeButton.addEventListener("click", function () {
        messageDismissed = true;
        hideTourMessage();
    });

    checkTourPosition();

});


// ==================================
// MARTHA'S PERSONAL GUIDE BUTTON
// ==================================

document.addEventListener("DOMContentLoaded", function () {

    const guideToggle = document.getElementById("guide-toggle");
    const guidePanel = document.getElementById("guide-panel");
    const guideClose = document.getElementById("guide-close");

    // Do nothing on pages where the guide has not been added.
    if (!guideToggle || !guidePanel || !guideClose) {
        return;
    }

    // Open or close the guide when its main button is clicked.
    guideToggle.addEventListener("click", function () {
        const isOpening = guidePanel.hidden;

        guidePanel.hidden = !isOpening;
        guideToggle.setAttribute("aria-expanded", String(isOpening));
    });

    // Close the guide using the X button.
    guideClose.addEventListener("click", function () {
        guidePanel.hidden = true;
        guideToggle.setAttribute("aria-expanded", "false");
    });

    // Close the guide when clicking outside it.
    document.addEventListener("click", function (event) {
        if (
            !guidePanel.hidden &&
            !event.target.closest("#personal-guide")
        ) {
            guidePanel.hidden = true;
            guideToggle.setAttribute("aria-expanded", "false");
        }
    });

    // Close the guide with the Escape key.
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            guidePanel.hidden = true;
            guideToggle.setAttribute("aria-expanded", "false");
        }
    });

});

