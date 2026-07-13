/*==================================================
 TMU Aviation Club
 Opening Animation Ver3
 Part1
==================================================*/

gsap.defaults({
    ease: "power4.out"
});

/*==================================================
 DOM
==================================================*/

const loading = document.getElementById("loading");
const mainContent = document.getElementById("mainContent");

const introText = document.getElementById("introText");
const introLogo = document.getElementById("introLogo");

const headerLogo = document.getElementById("headerLogo");

const skipButton = document.getElementById("skipButton");

const bg = [
    document.querySelector(".bg1"),
    document.querySelector(".bg2"),
    document.querySelector(".bg3")
];

const textLines = gsap.utils.toArray(".mask span");

const logoMark = introLogo.querySelector(".logo-mark");
const logoSmall = introLogo.querySelector("small");
const logoTitle = introLogo.querySelector("h1");

const heroImage = document.querySelector(".hero-image img");
const heroContent = document.querySelector(".hero-content");

/*==================================================
 Setting
==================================================*/

const OPENING_KEY = "TMU_OPENING";

const OPENING_DURATION = 24 * 60 * 60 * 1000;

/*==================================================
 Timeline
==================================================*/

const tl = gsap.timeline({

    paused: true

});

/*==================================================
 Preload Images
==================================================*/

function preloadImages() {

    return new Promise(resolve => {

        const files = [

            "photo1.JPG",
            "photo2.JPG",
            "photo3.JPG",
            "012.jpg"

        ];

        let loaded = 0;

        files.forEach(src => {

            const img = new Image();

            img.onload = img.onerror = () => {

                loaded++;

                if (loaded === files.length) {

                    resolve();

                }

            };

            img.src = src;

        });

    });

}

/*==================================================
 Initial State
==================================================*/

function setInitialState() {

    document.body.style.overflow = "hidden";

    gsap.set(mainContent, {

        opacity: 0

    });

    gsap.set(bg, {

        opacity: 0,
        scale: 1.12

    });

    gsap.set(bg[0], {

        opacity: 1

    });

    gsap.set(textLines, {

        yPercent: 120,
        opacity: 0,
        filter: "blur(18px)"

    });

    gsap.set(introLogo, {

        opacity: 0,
        scale: .82

    });

    gsap.set(logoMark, {

        opacity: 0,
        rotation: -35,
        scale: .65

    });

    gsap.set(logoSmall, {

        opacity: 0,
        x: -40

    });

    gsap.set(logoTitle, {

        opacity: 0,
        y: 24

    });

}

/*==================================================
 Opening Memory
==================================================*/

function alreadyPlayed() {

    const value = localStorage.getItem(OPENING_KEY);

    if (!value) {

        return false;

    }

    return Date.now() - Number(value) < OPENING_DURATION;

}

function saveOpening() {

    localStorage.setItem(

        OPENING_KEY,

        Date.now()

    );

}

/*==================================================
 Finish Immediately
==================================================*/

function finishImmediately() {

    tl.progress(1);

    loading.style.display = "none";

    mainContent.style.opacity = 1;

    document.body.style.overflow = "auto";

}

/*==================================================
 Boot
==================================================*/

window.addEventListener("load", async () => {

    await preloadImages();

    setInitialState();

    if (alreadyPlayed()) {

        finishImmediately();

        return;

    }

    tl.play();

});
/*==================================================
 Timeline Build
 Part2
==================================================*/

function buildTimeline() {

    /*------------------------------------------
        Scene 1
        Background 1
    ------------------------------------------*/

    tl.to(bg[0], {

        scale: 1,
        duration: 5,
        ease: "none"

    }, 0);

    tl.to(textLines[0], {

        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",

        duration: 1.15

    }, 0.35);

    /*------------------------------------------
        Scene 2
        Background Cross
    ------------------------------------------*/

    tl.to(bg[1], {

        opacity: 1,
        scale: 1,

        duration: 1.8,
        ease: "power2.inOut"

    }, 1.8);

    tl.to(textLines[1], {

        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",

        duration: 1.0

    }, 2.05);

    /*------------------------------------------
        Scene 3
        Background Cross
    ------------------------------------------*/

    tl.to(bg[2], {

        opacity: 1,
        scale: 1,

        duration: 1.8,
        ease: "power2.inOut"

    }, 3.8);

    tl.to(textLines[2], {

        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",

        duration: 1.0

    }, 4.05);

    /*------------------------------------------
        Hold
    ------------------------------------------*/

    tl.to({}, {

        duration: 0.7

    });

}

/*==================================================
 Background Ken Burns
==================================================*/

function buildKenBurns() {

    bg.forEach((image, index) => {

        const start = index * 2;

        tl.to(image, {

            scale: 1,

            duration: 6,

            ease: "none"

        }, start);

    });

}

/*==================================================
 Intro Text Glow
==================================================*/

function buildGlow() {

    textLines.forEach((line, index) => {

        tl.fromTo(line, {

            textShadow:
                "0 0 0 rgba(255,255,255,0)"

        }, {

            textShadow:
                "0 0 18px rgba(255,255,255,.28)",

            duration: .55,

            yoyo: true,

            repeat: 1

        }, .4 + index * 1.9);

    });

}

/*==================================================
 Execute
==================================================*/

buildTimeline();

buildKenBurns();

buildGlow();

/*==================================================
 Timeline Build
 Part3
 Logo Animation
==================================================*/

function buildMergeText() {

    /*------------------------------------------
        Hold
    ------------------------------------------*/

    tl.to({}, {
        duration: 0.75
    });

    /*------------------------------------------
        Letter Spacing
    ------------------------------------------*/

    tl.to(textLines, {

        letterSpacing: ".08em",

        duration: .8,

        stagger: .04,

        ease: "power2.out"

    });

    /*------------------------------------------
        Move Center
    ------------------------------------------*/

    tl.to(textLines, {

        y: -20,

        opacity: 0,

        filter: "blur(18px)",

        duration: .75,

        stagger: .07,

        ease: "power3.in"

    }, "-=.25");

}

/*==================================================
 Intro Logo
==================================================*/

function buildIntroLogo() {

    /*------------------------------------------
        Logo Wrapper
    ------------------------------------------*/

    tl.to(introLogo, {

        opacity: 1,

        scale: 1,

        duration: .45,

        ease: "power2.out"

    });

    /*------------------------------------------
        Shield
    ------------------------------------------*/

    tl.to(logoMark, {

        opacity: 1,

        rotation: 8,

        scale: 1.08,

        duration: .42,

        ease: "power2.out"

    });

    tl.to(logoMark, {

        rotation: -4,

        scale: .98,

        duration: .18

    });

    tl.to(logoMark, {

        rotation: 0,

        scale: 1,

        duration: .22

    });

    /*------------------------------------------
        English
    ------------------------------------------*/

    tl.to(logoSmall, {

        opacity: 1,

        x: 0,

        duration: .65,

        ease: "power3.out"

    }, "-=.35");

    /*------------------------------------------
        Japanese
    ------------------------------------------*/

    tl.to(logoTitle, {

        opacity: 1,

        y: 0,

        duration: .65,

        ease: "power3.out"

    }, "-=.45");

}

/*==================================================
 Hold Logo
==================================================*/

function buildLogoHold() {

    tl.to({}, {

        duration: .65

    });

}

/*==================================================
 Small Floating Motion
==================================================*/

function buildLogoFloat() {

    tl.to(introLogo, {

        y: "-=8",

        duration: 1.1,

        ease: "sine.inOut",

        yoyo: true,

        repeat: 1

    });

}

/*==================================================
 Execute
==================================================*/

buildMergeText();

buildIntroLogo();

buildLogoHold();

buildLogoFloat();

/*==================================================
 Timeline Build
 Part4
 Finish / Header / Skip
==================================================*/

function buildFinish() {

    tl.add(() => {

        /*------------------------------------------
            Calculate FLIP Position
        ------------------------------------------*/

        const introRect = introLogo.getBoundingClientRect();
        const headerRect = headerLogo.getBoundingClientRect();

        const dx =
            (headerRect.left + headerRect.width / 2) -
            (introRect.left + introRect.width / 2);

        const dy =
            (headerRect.top + headerRect.height / 2) -
            (introRect.top + introRect.height / 2);

        const scale =
            headerRect.height /
            introRect.height;

        gsap.to(introLogo, {

            x: dx,
            y: dy,
            scale: scale,

            duration: 1.35,

            ease: "expo.inOut"

        });

    });

    tl.to(loading, {

        opacity: 0,

        duration: .9,

        ease: "power2.inOut"

    }, "-=.85");

    tl.to(mainContent, {

        opacity: 1,

        duration: .8,

        ease: "power2.out"

    }, "-=.45");

    tl.to(heroImage, {

        scale: 1,

        duration: 7,

        ease: "none"

    }, "<");

    tl.add(() => {

        loading.style.display = "none";

        document.body.style.overflow = "auto";

        saveOpening();

    });

}

/*==================================================
 Skip
==================================================*/

function skipOpening() {

    tl.progress(1);

    loading.style.display = "none";

    mainContent.style.opacity = 1;

    document.body.style.overflow = "auto";

    saveOpening();

}

skipButton.addEventListener("click", skipOpening);

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        skipOpening();

    }

});

/*==================================================
 Reduced Motion
==================================================*/

const reduceMotion =
window.matchMedia("(prefers-reduced-motion: reduce)");

if (reduceMotion.matches) {

    skipOpening();

}

/*==================================================
 Header Scroll
==================================================*/

const header = document.querySelector(".top");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/*==================================================
 Hero Parallax
==================================================*/

let heroY = 0;

window.addEventListener("scroll", () => {

    heroY = window.scrollY;

});

gsap.ticker.add(() => {

    heroImage.style.transform =
        `translateY(${heroY * 0.15}px) scale(1)`;

});

/*==================================================
 Hero Content
==================================================*/

gsap.from(heroContent, {

    opacity: 0,

    y: 60,

    duration: 1.2,

    ease: "power3.out",

    scrollTrigger: undefined

});

/*==================================================
 Start Timeline
==================================================*/

buildFinish();

/*==================================================
 Start
==================================================*/

window.addEventListener("load", async () => {

    await preloadImages();

    setInitialState();

    buildTimeline();

    buildKenBurns();

    buildGlow();

    buildMergeText();

    buildIntroLogo();

    buildLogoHold();

    buildLogoFloat();

    buildFinish();

    if (alreadyPlayed()) {

        skipOpening();

        return;

    }

    tl.play();

});