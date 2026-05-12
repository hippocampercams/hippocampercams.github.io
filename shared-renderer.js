(function () {
    window.HPC_STAGE_WIDTH = 1792;
    window.HPC_LIGHTBOX_IMAGES = [];
    window.HPC_LIGHTBOX_INDEX = -1;

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
        sunsetglow: "sunset-ready digicams for glowing warmth, dusk tones, and dreamy evening nostalgia.",
        goldenhour: "warm, glowy digicams for dreamy light, honey tones, and soft nostalgic warmth.",
        softpastel: "dreamy pastel digicams for soft colour washes, airy tones, and sweet vintage light.",
        softpastels: "dreamy pastel digicams for soft colour washes, airy tones, and sweet vintage light.",
        cooltones: "cool-toned digicams for crisp blues, striking blacks, clean contrast, and moody city vibes.",
        grainyanalogue: "nostalgic digicams for grainy, film-like texture, crunchy detail, and retro analogue vibes.",
        "2000s": "true y2k-era digicams for flash-heavy, nostalgic, early-2000s party-cam energy.",
        clean: "clean, minimal, elegant digicams for fresh, polished, easy everyday photos.",
        cinematographic: "cinematic digicams for mood, contrast, atmosphere, and frame-worthy storybook shots.",
        minimalistic: "simple, refined digicams for pared-back styling, clean lines, and understated everyday photos."
    };

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

    function ensureTaskbar() {
        if (document.querySelector(".start_bar")) return;

        var taskbar = document.createElement("div");
        taskbar.className = "start_bar";
        taskbar.innerHTML =
            '<div class="start_button">' +
                '<div class="logo"></div>' +
                '<span class="text">start</span>' +
            '</div>' +
            '<div class="taskbar-center-text">hippocampercams</div>' +
            '<div class="tray"><span class="time">00:00</span></div>';

        document.body.appendChild(taskbar);

        function updateTime() {
            var timeEl = taskbar.querySelector(".time");
            if (!timeEl) return;

            var now = new Date();
            var hours = String(now.getHours()).padStart(2, "0");
            var minutes = String(now.getMinutes()).padStart(2, "0");
            timeEl.textContent = hours + ":" + minutes;
        }

        updateTime();
        window.setInterval(updateTime, 30000);
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

            if (i < tags.length - 1) {
                html += " • ";
            }
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

        if (!clickableTitle) {
            return titleHtml;
        }

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
        ensureTaskbar();
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
            ensureTaskbar();
            return;
        }

        document.title = "hippocampercams • " + (match.id || "post");
        container.innerHTML = renderPost(match, false);
        ensureTaskbar();
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

        existing.classList.add("aesthetic-info-popups");
        existing.innerHTML =
            '<div class="top-banner">' +
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
        ensureTaskbar();
    }

    function normalizeExistingAestheticInfoBox() {
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
        rightPopups.setAttribute("data-aesthetic-normalized", "true");
    }

    window.updateDesktopStage = function () {
        var desktop = document.getElementById("desktop");
        var stage = document.getElementById("desktopStage");
        var shell = document.getElementById("desktopStageShell");
        var icons = document.getElementById("desktopIcons");
        var rightPopups = document.getElementById("rightPopups");

        ensureTaskbar();
        normalizeExistingAestheticInfoBox();

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
            var desktopRight = stageLeft + ((desktop.offsetLeft + desktop.offsetWidth) * scale);
            var popupGap = 36;
            var popupWidth = rightPopups.offsetWidth || 390;
            var popupLeft = desktopRight + popupGap;
            var maxPopupLeft = window.innerWidth - popupWidth - 16;

            if (popupLeft > maxPopupLeft) {
                popupLeft = maxPopupLeft;
            }

            rightPopups.style.left = popupLeft + "px";
            rightPopups.style.right = "auto";
        }
    };

    window.HPC = {
        renderPostsInto: renderPostsInto,
        renderSinglePostInto: renderSinglePostInto,
        renderCollectionInto: renderCollectionInto
    };

    document.addEventListener("DOMContentLoaded", function () {
        ensureTaskbar();
        normalizeExistingAestheticInfoBox();
    });
})();
