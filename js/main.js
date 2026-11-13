import { profile, experience, education, certifications, skills, languages, extracurricular, } from "./data.js";
import { formatPeriod } from "./period.js";
const CONTACT_API_URL = "https://ethan-danggithubio-production.up.railway.app/api/contact";
const $ = (selector) => document.querySelector(selector);
const $all = (selector) => Array.from(document.querySelectorAll(selector));
function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className)
        node.className = className;
    if (text)
        node.textContent = text;
    return node;
}
/* ---------- Populate static text ---------- */
function renderProfile() {
    const nameEl = $("#hero-name");
    const headlineEl = $("#hero-headline");
    const locationEl = $("#hero-location");
    const emailEl = $("#hero-email");
    const aboutEl = $("#about-text");
    const contactEmailEl = $("#contact-email");
    const contactLocationEl = $("#contact-location");
    const contactLinkedinEl = $("#contact-linkedin");
    if (nameEl)
        nameEl.textContent = profile.name;
    if (headlineEl) {
        profile.headlineTags.forEach((tag) => {
            headlineEl.appendChild(el("li", "headline-chip", tag));
        });
    }
    if (locationEl)
        locationEl.textContent = profile.location;
    if (emailEl) {
        emailEl.textContent = profile.email;
        emailEl.href = `mailto:${profile.email}`;
    }
    if (aboutEl) {
        profile.about.forEach((paragraph, i) => {
            aboutEl.appendChild(el("p", i === 0 ? "lead" : undefined, paragraph));
        });
    }
    if (contactEmailEl) {
        contactEmailEl.textContent = profile.email;
        contactEmailEl.href = `mailto:${profile.email}`;
    }
    if (contactLocationEl)
        contactLocationEl.textContent = profile.location;
    if (contactLinkedinEl)
        contactLinkedinEl.href = profile.linkedin;
    document.title = `${profile.name} — ${profile.headlineTags[0]}`;
}
/* ---------- Timeline renderers ---------- */
function renderTimelineItem(container, primary, secondary, period, location, description, tags) {
    const item = el("div", "timeline-item");
    const card = el("div", "timeline-card");
    card.appendChild(el("h3", "timeline-role", primary));
    card.appendChild(el("p", "timeline-org", secondary));
    const metaText = [period, location].filter(Boolean).join(" · ");
    card.appendChild(el("p", "timeline-meta", metaText));
    if (description) {
        card.appendChild(el("p", "timeline-desc", description));
    }
    if (tags && tags.length) {
        const tagWrap = el("div", "timeline-skills");
        tags.forEach((t) => tagWrap.appendChild(el("span", "tag", t)));
        card.appendChild(tagWrap);
    }
    item.appendChild(card);
    container.appendChild(item);
}
function renderExperience() {
    const container = $("#experience-list");
    if (!container)
        return;
    experience.forEach((item) => {
        renderTimelineItem(container, item.role, item.org, formatPeriod(item.start, item.end), item.location, item.description, item.skills);
    });
}
function renderEducation() {
    const container = $("#education-list");
    if (!container)
        return;
    education.forEach((item) => {
        renderTimelineItem(container, item.credential, item.school, item.period, undefined, item.description);
    });
    const certContainer = $("#certifications-list");
    if (!certContainer)
        return;
    certifications.forEach((c) => {
        const card = el("div", "cert-card");
        card.appendChild(el("p", "cert-name", c.name));
        card.appendChild(el("p", "cert-meta", `${c.issuer} · Issued ${c.issued}`));
        certContainer.appendChild(card);
    });
}
function renderExtracurricular() {
    const container = $("#extracurricular-list");
    if (!container)
        return;
    if (extracurricular.length === 0) {
        const empty = el("div", "empty-state", "Extracurricular activities coming soon — add entries to src/ts/data.ts and they'll show up here automatically.");
        container.appendChild(empty);
        return;
    }
    extracurricular.forEach((item) => {
        renderTimelineItem(container, item.title, item.org, item.period, undefined, item.description);
    });
}
function renderSkills() {
    const container = $("#skills-list");
    if (container) {
        skills.forEach((group) => {
            const card = el("div", "skill-card");
            card.appendChild(el("h3", undefined, group.category));
            const tagWrap = el("div", "skill-tags");
            group.items.forEach((s) => tagWrap.appendChild(el("span", "tag", s)));
            card.appendChild(tagWrap);
            container.appendChild(card);
        });
    }
    const langContainer = $("#language-list");
    if (langContainer) {
        languages.forEach((lang) => {
            const li = el("li");
            li.appendChild(el("p", "language-name", lang.name));
            li.appendChild(el("p", "language-level", lang.level));
            langContainer.appendChild(li);
        });
    }
}
/* ---------- Theme toggle ---------- */
function initTheme() {
    const root = document.documentElement;
    const toggle = $("#theme-toggle");
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") {
        root.setAttribute("data-theme", stored);
    }
    toggle?.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
    });
}
/* ---------- Mobile nav ---------- */
function initNav() {
    const navToggle = $("#nav-toggle");
    const nav = $("#nav");
    navToggle?.addEventListener("click", () => {
        const isOpen = nav?.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(!!isOpen));
    });
    $all(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            nav?.classList.remove("open");
            navToggle?.setAttribute("aria-expanded", "false");
        });
    });
}
/* ---------- Scrollspy ---------- */
function initScrollSpy() {
    const sections = $all("main section[id]");
    const links = $all(".nav-link");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting)
                return;
            const id = entry.target.id;
            links.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
            });
        });
    }, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
}
/* ---------- Reveal on scroll ---------- */
function initReveal() {
    const targets = $all(".reveal");
    // Backgrounded/prerendered tabs can suspend IntersectionObserver callbacks
    // indefinitely — don't let content stay invisible while that's the case.
    if (document.visibilityState === "hidden") {
        targets.forEach((t) => t.classList.add("in-view"));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    targets.forEach((t) => observer.observe(t));
}
/* ---------- Contact form ---------- */
function initContactForm() {
    const form = $("#contact-form");
    const status = $("#form-status");
    const submitBtn = $("#contact-submit");
    if (!form || !status || !submitBtn)
        return;
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = form.elements.namedItem("name").value.trim();
        const email = form.elements.namedItem("email").value.trim();
        const message = form.elements.namedItem("message").value.trim();
        status.textContent = "";
        status.className = "form-status";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !emailPattern.test(email) || !message) {
            status.textContent = "Please fill in your name, a valid email, and a message.";
            status.classList.add("error");
            return;
        }
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
        try {
            const res = await fetch(CONTACT_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });
            if (!res.ok)
                throw new Error(`Request failed with status ${res.status}`);
            status.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
            status.classList.add("success");
            form.reset();
        }
        catch (err) {
            status.textContent = "Something went wrong sending your message. Please email me directly instead.";
            status.classList.add("error");
        }
        finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send message";
        }
    });
}
/* ---------- Header shadow on scroll ---------- */
function initHeaderScroll() {
    const header = $("#site-header");
    if (!header)
        return;
    window.addEventListener("scroll", () => {
        header.style.boxShadow = window.scrollY > 8 ? "0 8px 24px -12px rgba(15,23,42,0.25)" : "none";
    });
}
function setYear() {
    const yearEl = $("#year");
    if (yearEl)
        yearEl.textContent = String(new Date().getFullYear());
}
function init() {
    renderProfile();
    renderExperience();
    renderEducation();
    renderExtracurricular();
    renderSkills();
    initTheme();
    initNav();
    initScrollSpy();
    initReveal();
    initContactForm();
    initHeaderScroll();
    setYear();
}
document.addEventListener("DOMContentLoaded", init);
