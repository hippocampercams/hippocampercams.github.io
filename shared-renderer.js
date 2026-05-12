(function () {
    for (let i = 0; i < tags.length; i++) {
      const tag = tags[i];
      html += '<u><a href="' + escapeHtml(getCollectionUrl("tag", tag)) + '">#' + escapeHtml(getTagLabel(tag)) + '</a></u>';
      if (i < tags.length - 1) html += ' • ';
    }
    html += '</p></div>';
    return html;
  }

  function renderImages(images) {
    if (!images || !images.length) return "";
    let html = '<div class="photo-grid">';
    for (let i = 0; i < images.length; i++) {
      if (!images[i] || !images[i].src) continue;
      html += '<img src="' + escapeHtml(images[i].src) + '" class="full_image" alt="' + escapeHtml(images[i].alt || "") + '" onclick="openHpcLightbox(this)">';
    }
    html += '</div>';
    return html;
  }

  function renderPost(post, clickableTitle) {
    const meta = post.meta || "";
    const titleHtml = post.titleHtml || "";
    const captionHtml = post.captionHtml || "";
    const conditionSummaryHtml = post.conditionSummaryHtml || "";
    const conditionDetailsHtml = post.conditionDetailsHtml || "";
    const adoptUrl = post.adoptUrl || "adoptacam.html";
    const tagsHtml = renderTagLinks(post.tags || []);
    const isSold = !!post.sold;
    const ribbonHtml = isSold ? '<div class="sold-ribbon">SOLD</div>' : '';
    const actionButtonHtml = isSold
      ? '<a class="adopt-button" href="contact.html">DM for similar cams</a>'
      : '<a class="adopt-button" href="' + escapeHtml(adoptUrl) + '">ADOPT THIS CAM ❥</a>';

    const titleBlock = clickableTitle
      ? '<a class="title-link" href="' + escapeHtml(getPostUrl(post)) + '">' + titleHtml + '</a>'
      : titleHtml;

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
              (conditionSummaryHtml ? '<div class="caption">' + conditionSummaryHtml + '</div>' : '') +
            '</div>' +
            '<div class="post-actions">' +
              '<details class="condition-details">' +
                '<summary>condition details</summary>' +
                '<div class="condition-body">' + conditionDetailsHtml + '</div>' +
              '</details>' +
              tagsHtml +
              '<div class="adopt-wrap">' + actionButtonHtml + '</div>' +
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
            '<div class="adopt-wrap">' + actionButtonHtml + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="bottom"></div>' +
      '</div>';
  }

  function renderPostsInto(containerId, posts, clickableTitle) {
    const desktop = document.getElementById(containerId);
    if (!desktop) return;
    let html = "";
    for (let i = 0; i < posts.length; i++) {
      html += renderPost(posts[i], clickableTitle !== false);
    }
    desktop.innerHTML = html;
  }

})();
