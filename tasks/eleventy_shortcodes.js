module.exports = {
  //
  youtubeEmbed: function (id) {
    return `<iframe width="480" height="270" class="mb-4"
src="https://www.youtube.com/embed/${id}"
title="YouTube video player" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen>
</iframe>`;
  },

  //
  nicovideoEmbed: function (id, comment) {
    return `<iframe width="380" height="160"
src="https://ext.nicovideo.jp/thumb/${id}"
scrolling="no" style="border:solid 1px #ccc;" frameborder="0" class="mb-4">
<a href="https://www.nicovideo.jp/watch/${id}">${comment}</a>
</iframe><br clear="all" />`;
  }
};
