<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hippocampercams • post</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="favicon.ico">
    <link rel="stylesheet" href="https://static.tumblr.com/fpdiq1j/N3Zmkjmqn/theme_generic.css">
    <link rel="stylesheet" href="site-shell.css">
</head>
<body class="win98 one_column">
    <div class="wrapper">
        <div class="desktop-stage-shell" id="desktopStageShell">
            <div class="icons" id="desktopIcons">
                <a href="https://hippocampercams.github.io" class="home"><div class="my_computer"></div><div class="icon_label">hippocampercams</div></a>
                <a href="readme.html" class="ask"><div class="my_documents"></div><div class="icon_label">READ ME</div></a>
                <a href="masterlist.html" class="submit"><div class="network_neighborhood"></div><div class="icon_label">masterlist</div></a>
                <a href="faqs.html" class="listings"><img src="img/icons/faqs.png" alt="FAQs icon" class="icon-img"><div class="icon_label">FAQs</div></a>
                <a href="adoptacam.html" class="mustread"><img src="img/icons/adoptacam.png" alt="" class="icon-img"><div class="icon_label">adopt a cam</div></a>
                <a href="https://instagram.com/hippocampercams" class="insta" target="_blank" rel="noopener"><img src="img/icons/insta.png" alt="" class="icon-img"><div class="icon_label">insta</div></a>
                <a href="https://www.tiktok.com/@hippocampercams" target="_blank" rel="noopener" class="tiktok"><img src="img/icons/tiktok.png" alt="" class="icon-img"><div class="icon_label">tiktok</div></a>
                <a href="lemon8.html" target="_blank" rel="noopener" class="lemon8"><img src="img/icons/lemon8.png" alt="lemon8" class="icon-img"><div class="icon_label">lemon8</div></a>
                <a href="contact.html" class="contact"><img src="img/icons/contact.png" alt="" class="icon-img"><div class="icon_label">contact</div></a>
            </div>
            <div class="desktop-stage" id="desktopStage"><div id="desktop" class="container"></div></div>
        </div>
        <div id="hpc-lightbox" onclick="closeHpcLightbox()"><img src="" alt="enlarged photo" id="hpc-lightbox-img"></div>
    </div>
    <script src="posts.js"></script>
    <script src="shared-renderer.js"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function () {
        HPC.renderSinglePostInto("desktop");
        updateDesktopStage();
        document.addEventListener("keydown", function (event) {
          var lightbox = document.getElementById("hpc-lightbox");
          if (!lightbox || lightbox.style.display !== "flex") return;
          if (event.key === "Escape") closeHpcLightbox();
          if (event.key === "ArrowRight") showHpcLightboxImage(window.HPC_LIGHTBOX_INDEX + 1);
          if (event.key === "ArrowLeft") showHpcLightboxImage(window.HPC_LIGHTBOX_INDEX - 1);
        });
      });
      window.addEventListener("resize", updateDesktopStage);
      window.addEventListener("orientationchange", updateDesktopStage);
      window.addEventListener("load", updateDesktopStage);
    </script>
</body>
</html>