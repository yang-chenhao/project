'use strict';

(function () {

  var log = console.log.bind(console);

  var list = document.querySelector('#list');
  var num = 30;
  var current = 0;

  var isAddItem = false;

  function getdata(current, num) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        var data = [];
        for (var i = current; i < current + num; i++) {
          data.push('item' + (i + 1));
        }
        resolve(data);
      }, 1000);
    });
  }

  function render() {
    if (!isAddItem) {
      isAddItem = true;
      getdata(current, num).then(function(data) {
        //创建一个元素快
        var block = document.createDocumentFragment();
        data.forEach(function (item) {
          var li = document.createElement('li');
          li.innerText = item;
          block.appendChild(li);
        });
        list.appendChild(block);

        current += num;
        isAddItem = false;
      }).catch(function (error) {
        log(error);
      });
    }
  }

  function init() {
    render();

    window.addEventListener('scroll', function() {
      var totalHeight = document.body.scrollHeight;
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var clientHeight = document.documentElement.clientHeight;

      var bottom = totalHeight - scrollTop - clientHeight;

      if (bottom < 100) {
        render();
      }
    });
  }

  init();

})();
