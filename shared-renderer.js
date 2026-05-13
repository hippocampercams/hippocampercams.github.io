(function () {
    window.HPC_STAGE_WIDTH = 1792;
    window.HPC_LIGHTBOX_IMAGES = [];
    window.HPC_LIGHTBOX_INDEX = -1;

    var TASKBAR_TEXT = "°˖✧* learn and shop all things y2k digicams and film cameras ·ﾟ✧*。";

    var TAG_LABELS = {
        sunsetglow: "sunset glow",
        goldenhour: "golden hour",
        softpastel: "soft pastel",
        softpastels: "soft pastels",
        cooltones: "cool tones",
        grainyanalogue: "grainy analogue",
        "2000s": "2000s",
        clean: "clean",
        cinematographic: "cinematographic",
        minimalistic: "minimalistic"
    };

    var TAG_DESCRIPTIONS = {
        sunsetglow: "sunset-ready digicams for glowing warmth, dusky tones, and dreamy evening nostalgia.",
        goldenhour: "digicams give give us warm, glowy photos with dreamy light, honey tones, and soft nostalgic warmth.",
        softpastel: "dreamy pastels with soft colour washes, airy tones, and sweet vintage light.",
        softpastels: "dreamy pastels with soft colour washes, airy tones, and sweet vintage light.",
        cooltones: "digicams for crisp cool, hues, striking blacks, clean contrast, and moody city and night life vibes.",
        grainyanalogue: "digicams for grainy, film-like texture, crunchy detail, and retro analogue vibes.",
        "2000s": "digicams that give true y2k-era vibes - think flash-heavy, nostalgic, early-2000s party-cam energy.",
        clean: "digicams that produce clean, minimal, elegant vibes for fresh, polished, easy everyday photos.",
        cinematographic: "digicams that give cinematic photos and emphasise mood, contrast, atmosphere, and frame-worthy storybook shots.",
        minimalistic: "simple and refined, these get these digicams for pared-back styling, clean lines, and understated everyday photos."
    };

    var RATING_SYSTEM_BANNER_HTML =
        '<div class="top-banner rating-system-banner mobile-rating-banner">' +
            '<div class="top-banner-window">' +
                '<div class="tb-titlebar">' +
                    '<span class="tb-title-text">⊹ ₊❤︎ rating system ❤︎₊ ⊹</span>' +
                    '<span class="tb-close">x</span>' +
                '</div>' +
                '<div class="tb-body">' +
                    '<div class="tb-icon"></div>' +
                    '<div class="tb-text">' +
                        '<p>🏆 - absurdly perfect (for a preloved item); almost no noticeable flaws</p>' +
                        '<p>⋆⋆⋆⋆⋆ - as good as it gets for a preloved cam; super minor cosmetic flaws</p>' +
                        '<p>⋆⋆⋆⋆ - super; minor cosmetic flaws</p>' +
                        '<p>⋆⋆⋆ - pretty good; cosmetic flaws characteristic of preloved vintage cams</p>' +
                        '<p>⋆⋆ - it&apos;s seen things &amp; is a little worn out &amp;/or minor functional issues</p>' +
                        '<p>⋆ - it&apos;s a veteran with battle scars &amp;/or functional issues</p>' +
                        '<p>♻️ - pretty display piece, may work if you fix it?</p>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';

    var MAIN_RIGHT_POPUPS_HTML =
        '<div class="top-banner please-read-banner">' +
            '<div class="top-banner-window">' +
                '<div class="tb-titlebar">' +
                    '<span class="tb-title-text">⚠️ PLEASE READ ⚠️</span>' +
                    '<span class="tb-close">x</span>' +
                '</div>' +
                '<div class="tb-body">' +
                    '<div class="tb-icon"></div>' +
                    '<div class="tb-text">' +
                        '<p>our cameras are lovingly sourced &amp; tested</p>' +
                        '<p>we do our best to get digicams to you in the best condition possible, but they&apos;re <i>✧ genuinely vintage &amp; pre-loved ✧</i> &amp; have signs of use &amp; age (scuffs, dinks &amp; imperfections).</p>' +
                        '<p>🙏🏻<b><u>please read all our notices, the full description of each cam &amp; examine all pics carefully before purchase.</u></b>🙏🏻</p>' +
                        '<p>we sell digicams only; if any accessories are included, they&apos;re freebies &amp; we cannot guarantee/be liable for condition/usability.</p>' +
                        '<p>♡ enjoy finding your forever cam ♡</p>' +
                    '</div>' +
                '</div>' +
                '<div class="tb-footer">' +
                    '<button class="tb-button">ok</button>' +
                '</div>' +
            '</div>' +
        '</div>' +
        RATING_SYSTEM_BANNER_HTML;

    function escapeHtml(text) {
        return String(text == null ? "" : text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function getUrlParam(name) {
        var params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    function getPostPageUrl(post) {
        return "post.html?id=" + encodeURIComponent(post.id || "");
    }

    function getCollectionPageUrl(type, value) {
        return "collection.html?type=" + encodeURIComponent(type) + "&value=" + encodeURIComponent(value);
    }

    function isPostPage() {
        var path = window.location.pathname.split("/").pop() || "index.html";
        return path === "post.html";
    }

    function ensureMainRightPopups() {
        if (!isPostPage()) return;

        var shell = document.getElementById("desktopStageShell") || document.querySelector(".wrapper") || document.body;
        var rightPopups = document.getElementById("rightPopups");

        if (!rightPopups) {
            rightPopups = document.createElement("div");
            rightPopups.id = "rightPopups";
            rightPopups.className = "right-popups";
            shell.insertBefore(rightPopups, shell.firstChild);
        }

        rightPopups.className = "right-popups";
        rightPopups.innerHTML = MAIN_RIGHT_POPUPS_HTML;
    }

    function ensureRatingBannerForExistingRightPopups() {
        var rightPopups = document.getElementById("rightPopups");
        if (!rightPopups) return;

        if (rightPopups.querySelector(".rating-system-banner")) return;

        rightPopups.insertAdjacentHTML("beforeend", RATING_SYSTEM_BANNER_HTML);
    }

    function ensureTaskbar() {
        var existingTaskbar = document.getElementById("taskbar") || document.querySelector(".start_bar");

        if (!existingTaskbar) {
            var wrapper = document.querySelector(".wrapper") || document.body;

            var startMenu = document.createElement("div");
            startMenu.className = "start_menu";

            var taskbar = document.createElement("div");
            taskbar.className = "start_bar";
            taskbar.id = "taskbar";
            taskbar.innerHTML =
                '<div class="top_border"></div>' +
                '<div class="start_button">' +
                    '<span class="logo"></span>' +
                    '<span class="text">Start</span>' +
                '</div>' +
                '<span class="big_seperator"></span>' +
                '<span class="small_seperator"></span>' +
                '<span class="application_icons"></span>' +
                '<div class="taskbar-center-text">' + TASKBAR_TEXT + '</div>' +
                '<span class="big_seperator"></span>' +
                '<span class="small_seperator"></span>' +
                '<div class="tray">' +
                    '<span class="calendar"></span>' +
                    '<span class="time" id="showClock">00:00 AM</span>' +
                '</div>';

            wrapper.appendChild(startMenu);
            wrapper.appendChild(taskbar);
            existingTaskbar = taskbar;
        }

        if (existingTaskbar.id !== "taskbar") existingTaskbar.id = "taskbar";

        var startText = existingTaskbar.querySelector(".start_button .text");
        var centerText = existingTaskbar.querySelector(".taskbar-center-text");
        var timeEl = existingTaskbar.querySelector(".time");

        if (!centerText) {
            centerText = document.createElement("div");
            centerText.className = "taskbar-center-text";
            existingTaskbar.appendChild(centerText);
        }

        if (startText) startText.textContent = "Start";
        centerText.textContent = TASKBAR_TEXT;
        if (timeEl && !timeEl.id) timeEl.id = "showClock";

        updateClock();
    }

    function updateClock() {
        var now = new Date();
        var h = now.getHours();
        var m = now.getMinutes();
        var ampm = h >= 12 ? "PM" : "AM";

        h = h % 12;
        if (h === 0) h = 12;
        if (m < 10) m = "0" + m;

        var el = document.getElementById("showClock") || document.querySelector(".start_bar .tray .time");
        if (el) el.textContent = h + ":" + m + " " + ampm;
    }

    function ensureMobileMenu() {
        var wrapper = document.querySelector(".wrapper") || document.body;

        if (!document.getElementById("mobileMenuButton")) {
            var button = document.createElement("a");
            button.href = "#";
            button.className = "mobile-menu-button";
            button.id = "mobileMenuButton";
            button.innerHTML =
                '<div class="folder"></div>' +
                '<div class="icon_label">menu</div>';
            wrapper.appendChild(button);
        }

        if (!document.getElementById("mobileMenuOverlay")) {
            var overlay = document.createElement("div");
            overlay.className = "mobile-menu-overlay";
            overlay.id = "mobileMenuOverlay";
            overlay.innerHTML =
                '<div class="mobile-menu-panel">' +
                    '<div class="mobile-menu-header">' +
                        '<button type="button" class="mobile-menu-close" id="mobileMenuClose">x</button>' +
                    '</div>' +
                    '<div class="mobile-menu-icons">' +
                        '<a href="https://hippocampercams.github.io" class="home">' +
                            '<div class="my_computer"></div>' +
                            '<div class="icon_label">hippocampercams</div>' +
                        '</a>' +
                        '<a href="readme.html" class="ask">' +
                            '<div class="my_documents"></div>' +
                            '<div class="icon_label">READ ME</div>' +
                        '</a>' +
                        '<a href="masterlist.html" class="submit">' +
                            '<div class="network_neighborhood"></div>' +
                            '<div class="icon_label">masterlist</div>' +
                        '</a>' +
                        '<a href="faqs.html" class="listings">' +
                            '<img src="img/icons/faqs.png" alt="FAQs icon" class="icon-img">' +
                            '<div class="icon_label">FAQs</div>' +
                        '</a>' +
                        '<a href="adoptacam.html" class="mustread">' +
                            '<img src="img/icons/adoptacam.png" alt="" class="icon-img">' +
                            '<div class="icon_label">adopt a cam</div>' +
                        '</a>' +
                        '<a href="https://instagram.com/hippocampercams" class="insta" target="_blank" rel="noopener">' +
                            '<img src="img/icons/insta.png" alt="" class="icon-img">' +
                            '<div class="icon_label">insta</div>' +
                        '</a>' +
                        '<a href="https://www.tiktok.com/@hippocampercams" target="_blank" rel="noopener" class="tiktok">' +
                            '<img src="img/icons/tiktok.png" alt="" class="icon-img">' +
                            '<div class="icon_label">tiktok</div>' +
                        '</a>' +
                        '<a href="lemon8.html" target="_blank" rel="noopener" class="lemon8">' +
                            '<img src="img/icons/lemon8.png" alt="lemon8" class="icon-img">' +
                            '<div class="icon_label">lemon8</div>' +
                        '</a>' +
                        '<a href="contact.html" class="contact">' +
                            '<img src="img/icons/contact.png" alt="" class="icon-img">' +
                            '<div class="icon_label">contact</div>' +
                        '</a>' +
                    '</div>' +
                '</div>';
            wrapper.appendChild(overlay);
        }

        var mobileMenuButton = document.getElementById("mobileMenuButton");
        var mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
        var mobileMenuClose = document.getElementById("mobileMenuClose");

        function openMobileMenu(event) {
            if (event) event.preventDefault();
            if (!mobileMenuOverlay) return;
            mobileMenuOverlay.classList.add("is-open");
            document.body.classList.add("mobile-menu-open");
        }

        function closeMobileMenu() {
            if (!mobileMenuOverlay) return;
            mobileMenuOverlay.classList.remove("is-open");
            document.body.classList.remove("mobile-menu-open");
        }

        if (mobileMenuButton && mobileMenuButton.getAttribute("data-bound") !== "true") {
            mobileMenuButton.addEventListener("click", openMobileMenu);
            mobileMenuButton.setAttribute("data-bound", "true");
        }

        if (mobileMenuClose && mobileMenuClose.getAttribute("data-bound") !== "true") {
            mobileMenuClose.addEventListener("click", closeMobileMenu);
            mobileMenuClose.setAttribute("data-bound", "true");
        }

        if (mobileMenuOverlay && mobileMenuOverlay.getAttribute("data-bound") !== "true") {
            mobileMenuOverlay.addEventListener("click", function (event) {
                if (event.target === mobileMenuOverlay) closeMobileMenu();
            });
            mobileMenuOverlay.setAttribute("data-bound", "true");
        }
    }

    window.openHpcLightbox = function (imgEl) {
        var lightbox = document.getElementById("hpc-lightbox");
        var photo = document.getElementById("hpc-lightbox-img");
        if (!lightbox || !photo) return;

        window.HPC_LIGHTBOX_IMAGES = Array.prototype.slice.call(
            document.querySelectorAll(".photo-grid img.full_image, img.full_image")
        );
        window.HPC_LIGHTBOX_INDEX = window.HPC_LIGHTBOX_IMAGES.indexOf(imgEl);

        photo.src = imgEl.src;
        photo.alt = imgEl.alt || "enlarged photo";
        lightbox.style.display = "flex";
    };

    window.showHpcLightboxImage = function (index) {
        var photo = document.getElementById("hpc-lightbox-img");
        if (!photo || !window.HPC_LIGHTBOX_IMAGES.length) return;

        if (index < 0) index = window.HPC_LIGHTBOX_IMAGES.length - 1;
        if (index >= window.HPC_LIGHTBOX_IMAGES.length) index = 0;

        window.HPC_LIGHTBOX_INDEX = index;
        photo.src = window.HPC_LIGHTBOX_IMAGES[index].src;
        photo.alt = window.HPC_LIGHTBOX_IMAGES[index].alt || "enlarged photo";
    };

    window.closeHpcLightbox = function () {
        var lightbox = document.getElementById("hpc-lightbox");
        var photo = document.getElementById("hpc-lightbox-img");
        if (!lightbox || !photo) return;

        lightbox.style.display = "none";
        photo.src = "";
        photo.alt = "enlarged photo";
        window.HPC_LIGHTBOX_INDEX = -1;
    };

    function renderTagLinks(tags) {
        if (!tags || !tags.length) return "";

        var html = '<div class="caption post-tag-links"><p>';

        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var label = TAG_LABELS[tag] || tag;

            html += '<u><a href="' + escapeHtml(getCollectionPageUrl("tag", tag)) + '">#' + escapeHtml(label) + '</a></u>';

            if (i < tags.length - 1) html += " • ";
        }

        html += "</p></div>";
        return html;
    }

    function renderImages(images) {
        if (!images || !images.length) return "";

        var html = '<div class="photo-grid">';

        for (var i = 0; i < images.length; i++) {
            if (!images[i] || !images[i].src) continue;

            html += '<img src="' + escapeHtml(images[i].src) + '" class="full_image" alt="' + escapeHtml(images[i].alt || "") + '" onclick="openHpcLightbox(this)">';
        }

        html += "</div>";
        return html;
    }

    function renderTitle(post, clickableTitle) {
        var titleHtml = post.titleHtml || "";

        if (!clickableTitle) return titleHtml;

        return '<a class="title-link" href="' + escapeHtml(getPostPageUrl(post)) + '">' + titleHtml + "</a>";
    }

    function renderActionButton(post) {
        var adoptUrl = post.adoptUrl || "adoptacam.html";
        var isSold = !!post.sold;

        if (isSold) {
            return '<a class="adopt-button" href="contact.html">DM for similar cams</a>';
        }

        return '<a class="adopt-button" href="' + escapeHtml(adoptUrl) + '">ADOPT THIS CAM ❥</a>';
    }

    function renderPost(post, clickableTitle) {
        var meta = post.meta || "";
        var captionHtml = post.captionHtml || "";
        var conditionSummaryHtml = post.conditionSummaryHtml || "";
        var conditionDetailsHtml = post.conditionDetailsHtml || "";
        var tagsHtml = renderTagLinks(post.tags || []);
        var ribbonHtml = post.sold ? '<div class="sold-ribbon">SOLD</div>' : "";
        var titleBlock = renderTitle(post, clickableTitle);

        if (post.type === "photo") {
            return '' +
                '<div class="window post-photo">' +
                    ribbonHtml +
                    '<a href="#"><div class="top"><div class="info">' + meta + '</div></div></a>' +
                    '<div class="middle">' +
                        '<div class="title">' + titleBlock + '</div>' +
                        '<div class="caption">' + captionHtml + '</div>' +
                        '<div class="content">' +
                            renderImages(post.images || []) +
                            (conditionSummaryHtml ? '<div class="caption">' + conditionSummaryHtml + '</div>' : "") +
                        '</div>' +
                        '<div class="post-actions">' +
                            '<details class="condition-details">' +
                                '<summary>condition details</summary>' +
                                '<div class="condition-body">' + conditionDetailsHtml + '</div>' +
                            '</details>' +
                            tagsHtml +
                            '<div class="adopt-wrap">' +
                                renderActionButton(post) +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="bottom"></div>' +
                '</div>';
        }

        return '' +
            '<div class="window post-text">' +
                ribbonHtml +
                '<a href="#"><div class="top"><div class="info">' + meta + '</div></div></a>' +
                '<div class="middle">' +
                    '<div class="title">' + titleBlock + '</div>' +
                    '<div class="content">' + captionHtml + '</div>' +
                    '<div class="post-actions">' +
                        '<details class="condition-details">' +
                            '<summary>condition details</summary>' +
                            '<div class="condition-body">' + conditionDetailsHtml + '</div>' +
                        '</details>' +
                        tagsHtml +
                        '<div class="adopt-wrap">' +
                            renderActionButton(post) +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="bottom"></div>' +
            '</div>';
    }

    function renderPostsInto(containerId, posts, clickableTitle) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var html = "";

        for (var i = 0; i < posts.length; i++) {
            html += renderPost(posts[i], clickableTitle !== false);
        }

        container.innerHTML = html;
        ensureSharedChrome();
    }

    function renderSinglePostInto(containerId) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var id = getUrlParam("id");
        var posts = window.HPC_POSTS || [];
        var match = null;

        for (var i = 0; i < posts.length; i++) {
            if (String(posts[i].id) === String(id)) {
                match = posts[i];
                break;
            }
        }

        if (!match) {
            container.innerHTML =
                '<div class="window">' +
                    '<div class="middle">' +
                        '<div class="title"><p><b>POST NOT FOUND</b></p></div>' +
                        '<div class="content"><p>that listing could not be found.</p></div>' +
                    '</div>' +
                    '<div class="bottom"></div>' +
                '</div>';
            ensureMainRightPopups();
            ensureSharedChrome();
            return;
        }

        document.title = "hippocampercams • " + (match.id || "post");
        container.innerHTML = renderPost(match, false);
        ensureMainRightPopups();
        ensureSharedChrome();
    }

    function closestWindow(el) {
        while (el && el !== document.body) {
            if (el.classList && el.classList.contains("window")) return el;
            el = el.parentNode;
        }
        return null;
    }

    function hideCollectionHeadingWindow(headingEl, subheadingEl) {
        var headingWindow = headingEl ? closestWindow(headingEl) : null;
        var subheadingWindow = subheadingEl ? closestWindow(subheadingEl) : null;
        var targetWindow = headingWindow || subheadingWindow;

        if (targetWindow) {
            targetWindow.classList.add("collection-heading-window");
            targetWindow.style.display = "none";
        }
    }

    function renderAestheticInfoBox(title, description) {
        var shell = document.getElementById("desktopStageShell") || document.querySelector(".wrapper") || document.body;
        var existing = document.getElementById("rightPopups");

        if (!existing) {
            existing = document.createElement("div");
            existing.id = "rightPopups";
            existing.className = "right-popups";
            shell.insertBefore(existing, shell.firstChild);
        }

        existing.className = "right-popups aesthetic-info-popups";
        existing.innerHTML =
            '<div class="top-banner aesthetic-info-banner">' +
                '<div class="top-banner-window">' +
                    '<div class="tb-titlebar">' +
                        '<span class="tb-title-text">PLEASE READ</span>' +
                        '<span class="tb-close">x</span>' +
                    '</div>' +
                    '<div class="tb-body">' +
                        '<div class="aesthetic-info-text">' +
                            '<p class="aesthetic-info-name">' + escapeHtml(title) + '</p>' +
                            '<p class="aesthetic-info-description">' + escapeHtml(description || "") + '</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    function renderCollectionInto(containerId, headingId, subheadingId) {
        var container = document.getElementById(containerId);
        var headingEl = document.getElementById(headingId);
        var subheadingEl = document.getElementById(subheadingId);

        if (!container) return;

        var type = getUrlParam("type");
        var value = getUrlParam("value");
        var posts = window.HPC_POSTS || [];
        var filtered = [];
        var heading = "";
        var subheading = "";

        if (type === "tag") {
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].tags && posts[i].tags.indexOf(value) !== -1) {
                    filtered.push(posts[i]);
                }
            }

            heading = TAG_LABELS[value] || value || "tag";
            subheading = "shop digicams by aesthetic";

            hideCollectionHeadingWindow(headingEl, subheadingEl);
            renderAestheticInfoBox(heading, TAG_DESCRIPTIONS[value] || subheading);
        } else if (type === "brand") {
            for (var j = 0; j < posts.length; j++) {
                if ((posts[j].brand || "").toLowerCase() === String(value || "").toLowerCase()) {
                    filtered.push(posts[j]);
                }
            }

            heading = (value || "brand").toUpperCase();
            subheading = "shop digicams by brand";

            if (headingEl) headingEl.textContent = heading;
            if (subheadingEl) subheadingEl.textContent = subheading;
        } else {
            heading = "collection";
            subheading = "";

            if (headingEl) headingEl.textContent = heading;
            if (subheadingEl) subheadingEl.textContent = subheading;
        }

        renderPostsInto(containerId, filtered, true);
        ensureSharedChrome();
    }

    function normalizeExistingAestheticInfoBox() {
        if (isPostPage()) return;

        var rightPopups = document.getElementById("rightPopups");
        if (!rightPopups || rightPopups.getAttribute("data-aesthetic-normalized") === "true") return;

        var banners = rightPopups.querySelectorAll(".top-banner");
        if (banners.length !== 1) return;

        var bannerWindow = banners[0].querySelector(".top-banner-window");
        if (!bannerWindow) return;

        if (bannerWindow.querySelector(".tb-footer") || bannerWindow.querySelector(".tb-icon")) return;

        var titleEl = bannerWindow.querySelector(".tb-title-text");
        var bodyEl = bannerWindow.querySelector(".tb-body");
        if (!titleEl || !bodyEl) return;

        var aestheticName = titleEl.textContent.replace(/\s+/g, " ").trim();
        if (!aestheticName || aestheticName.toLowerCase() === "please read") return;

        var descriptionParts = [];
        var paragraphs = bodyEl.querySelectorAll("p");

        if (paragraphs.length) {
            for (var i = 0; i < paragraphs.length; i++) {
                var part = paragraphs[i].textContent.replace(/\s+/g, " ").trim();
                if (part) descriptionParts.push(part);
            }
        } else {
            var bodyText = bodyEl.textContent.replace(/\s+/g, " ").trim();
            if (bodyText) descriptionParts.push(bodyText);
        }

        renderAestheticInfoBox(aestheticName, descriptionParts.join(" "));
        rightPopups = document.getElementById("rightPopups");
        if (rightPopups) rightPopups.setAttribute("data-aesthetic-normalized", "true");
    }

    function ensureSharedChrome() {
        ensureTaskbar();
        ensureMobileMenu();
        normalizeExistingAestheticInfoBox();
        updateClock();
    }

    window.updateDesktopStage = function () {
        var desktop = document.getElementById("desktop");
        var stage = document.getElementById("desktopStage");
        var shell = document.getElementById("desktopStageShell");
        var icons = document.getElementById("desktopIcons");
        var rightPopups = document.getElementById("rightPopups");

        ensureSharedChrome();

        if (!desktop || !stage || !shell) return;

        if (window.innerWidth <= 900) {
            stage.style.transform = "";
            stage.style.left = "";
            stage.style.top = "";
            stage.style.height = "";
            shell.style.height = "";

            if (rightPopups) {
                rightPopups.style.left = "";
                rightPopups.style.right = "";
                rightPopups.style.top = "";
                rightPopups.style.transform = "";
            }

            return;
        }

        var scale = Math.min(window.innerWidth / window.HPC_STAGE_WIDTH, 1);
        var stageLeft = Math.max(0, (window.innerWidth - (window.HPC_STAGE_WIDTH * scale)) / 2);

        stage.style.transform = "scale(" + scale + ")";
        stage.style.left = stageLeft + "px";
        stage.style.top = "0px";

        var desktopBottom = desktop.offsetTop + desktop.offsetHeight;
        var iconsBottom = icons ? icons.offsetTop + icons.offsetHeight : 0;
        var naturalHeight = Math.max(desktopBottom, iconsBottom) + 30;

        stage.style.height = naturalHeight + "px";
        shell.style.height = (naturalHeight * scale) + "px";

        rightPopups = document.getElementById("rightPopups");

        if (rightPopups) {
            rightPopups.style.left = "";
            rightPopups.style.right = "";
            rightPopups.style.top = "";
            rightPopups.style.transform = "";
        }
    };

    window.HPC = {
        renderPostsInto: renderPostsInto,
        renderSinglePostInto: renderSinglePostInto,
        renderCollectionInto: renderCollectionInto
    };

    document.addEventListener("DOMContentLoaded", function () {
        ensureSharedChrome();
        setInterval(updateClock, 60000);
    });
})();
