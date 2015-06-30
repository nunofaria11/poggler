var StorageUtils = {
  storePar: function (url, color, p) {
    var t = new Date().getTime();
    var k = url + ';' + color + ';' + t;
    localStorage.setItem(k, p);
  },
  getParKey: function (p) {
    var i, k, keys = Object.keys(localStorage);
    for (var i in keys) {
      k = keys[i];
      var storedP = localStorage.getItem(k);
      if (p === storedP) {
        return k;
      }
    }
  },
  containsPar: function (p) {
    return StorageUtils.getParKey(p) !== undefined;
  },
  removePar: function (p) {
    var k = StorageUtils.getParKey(p);
    if (k !== undefined) {
      localStorage.removeItem(k);
      return true;
    } else  {
      return false;
    }
  }
};

$(document).ready(function () {
  $('p').each(function () {
    var p = $(this),
      html = p.html();
    var s = StorageUtils;
    if (StorageUtils.containsPar(html)) {
      var k = StorageUtils.getParKey(html);
      var previousColor = k.split(';')[1];
      p.css("color", "#46FAD0");
      p.attr("previous-color", previousColor);
    }
  });
});

$('p').click(function () {
  var p = $(this),
    url = window.location.href,
    currentColor = p.css('color');
  if (p.attr("previous-color") === undefined) {
    if (!StorageUtils.containsPar(p.html())) {
      StorageUtils.storePar(url, currentColor, p.html());
    }
    p.attr("previous-color", currentColor);
    p.css("color", "#46FAD0");
  } else {
    p.css("color", p.attr("previous-color"));
    p.removeAttr("previous-color");
    StorageUtils.removePar(p.html());
  }
});
