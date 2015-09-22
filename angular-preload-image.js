(function (angular) {
  'use strict';

  angular.module('angular-preload-image', []);

  angular.module('angular-preload-image').factory('preLoader', function () {

    return function (url, successCallback, errorCallback) {
      angular.element(new Image())
      .bind('load', function () {
        successCallback(this);
      }).bind('error', function () {
        errorCallback();
      }).attr('src', url);
    };
  });

  angular.module('angular-preload-image').directive('preloadImage', ['preLoader', '$timeout',
    function (preLoader, $timeout) {
      var firstStep = 1000;
      var step = 2;
      var className = 'ng-preloader-loading';

      var outdatedTry = function(timeout, url, attrs, limit, $el) {
        // Math stuff...

        if (firstStep * Math.pow(step, limit - 1) === timeout) {
          return;
        }

        $timeout(
          function() {
            preLoader(url, function (img) {
              $el.next().remove();
              $el.css('height', img.height + 'px');
              $timeout(function() {
                $el.toggleClass(className);
              }, 300);
            }, function () {
              outdatedTry(timeout * 2 || firstStep, url, attrs, $el);
            });
          },
          timeout
        );
      };

      var defaultSpinner = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTIwcHgnIGhlaWdodD0nMTIwcHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0idWlsLWRlZmF1bHQiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD48cmVjdCAgeD0nNDguMjUnIHk9JzQ1JyB3aWR0aD0nMy41JyBoZWlnaHQ9JzEwJyByeD0nMi41JyByeT0nMi41JyBmaWxsPScjNGE0YTRhJyB0cmFuc2Zvcm09J3JvdGF0ZSgwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMTUpJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9Jy41cycgYmVnaW49JzBzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDguMjUnIHk9JzQ1JyB3aWR0aD0nMy41JyBoZWlnaHQ9JzEwJyByeD0nMi41JyByeT0nMi41JyBmaWxsPScjNGE0YTRhJyB0cmFuc2Zvcm09J3JvdGF0ZSgzMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTE1KSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScuNXMnIGJlZ2luPScwLjA0MTY2NjY2NjY2NjY2NjY2NHMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0OC4yNScgeT0nNDUnIHdpZHRoPSczLjUnIGhlaWdodD0nMTAnIHJ4PScyLjUnIHJ5PScyLjUnIGZpbGw9JyM0YTRhNGEnIHRyYW5zZm9ybT0ncm90YXRlKDYwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMTUpJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9Jy41cycgYmVnaW49JzAuMDgzMzMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDguMjUnIHk9JzQ1JyB3aWR0aD0nMy41JyBoZWlnaHQ9JzEwJyByeD0nMi41JyByeT0nMi41JyBmaWxsPScjNGE0YTRhJyB0cmFuc2Zvcm09J3JvdGF0ZSg5MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTE1KSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScuNXMnIGJlZ2luPScwLjEyNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0OC4yNScgeT0nNDUnIHdpZHRoPSczLjUnIGhlaWdodD0nMTAnIHJ4PScyLjUnIHJ5PScyLjUnIGZpbGw9JyM0YTRhNGEnIHRyYW5zZm9ybT0ncm90YXRlKDEyMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTE1KSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScuNXMnIGJlZ2luPScwLjE2NjY2NjY2NjY2NjY2NjY2cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ4LjI1JyB5PSc0NScgd2lkdGg9JzMuNScgaGVpZ2h0PScxMCcgcng9JzIuNScgcnk9JzIuNScgZmlsbD0nIzRhNGE0YScgdHJhbnNmb3JtPSdyb3RhdGUoMTUwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMTUpJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9Jy41cycgYmVnaW49JzAuMjA4MzMzMzMzMzMzMzMzMzRzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDguMjUnIHk9JzQ1JyB3aWR0aD0nMy41JyBoZWlnaHQ9JzEwJyByeD0nMi41JyByeT0nMi41JyBmaWxsPScjNGE0YTRhJyB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0xNSknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nLjVzJyBiZWdpbj0nMC4yNXMnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0OC4yNScgeT0nNDUnIHdpZHRoPSczLjUnIGhlaWdodD0nMTAnIHJ4PScyLjUnIHJ5PScyLjUnIGZpbGw9JyM0YTRhNGEnIHRyYW5zZm9ybT0ncm90YXRlKDIxMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTE1KSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScuNXMnIGJlZ2luPScwLjI5MTY2NjY2NjY2NjY2NjdzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48cmVjdCAgeD0nNDguMjUnIHk9JzQ1JyB3aWR0aD0nMy41JyBoZWlnaHQ9JzEwJyByeD0nMi41JyByeT0nMi41JyBmaWxsPScjNGE0YTRhJyB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0xNSknPiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0nb3BhY2l0eScgZnJvbT0nMScgdG89JzAnIGR1cj0nLjVzJyBiZWdpbj0nMC4zMzMzMzMzMzMzMzMzMzMzcycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ4LjI1JyB5PSc0NScgd2lkdGg9JzMuNScgaGVpZ2h0PScxMCcgcng9JzIuNScgcnk9JzIuNScgZmlsbD0nIzRhNGE0YScgdHJhbnNmb3JtPSdyb3RhdGUoMjcwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMTUpJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9Jy41cycgYmVnaW49JzAuMzc1cycgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz48L3JlY3Q+PHJlY3QgIHg9JzQ4LjI1JyB5PSc0NScgd2lkdGg9JzMuNScgaGVpZ2h0PScxMCcgcng9JzIuNScgcnk9JzIuNScgZmlsbD0nIzRhNGE0YScgdHJhbnNmb3JtPSdyb3RhdGUoMzAwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMTUpJz4gIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9J29wYWNpdHknIGZyb209JzEnIHRvPScwJyBkdXI9Jy41cycgYmVnaW49JzAuNDE2NjY2NjY2NjY2NjY2N3MnIHJlcGVhdENvdW50PSdpbmRlZmluaXRlJy8+PC9yZWN0PjxyZWN0ICB4PSc0OC4yNScgeT0nNDUnIHdpZHRoPSczLjUnIGhlaWdodD0nMTAnIHJ4PScyLjUnIHJ5PScyLjUnIGZpbGw9JyM0YTRhNGEnIHRyYW5zZm9ybT0ncm90YXRlKDMzMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTE1KSc+ICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSdvcGFjaXR5JyBmcm9tPScxJyB0bz0nMCcgZHVyPScuNXMnIGJlZ2luPScwLjQ1ODMzMzMzMzMzMzMzMzNzJyByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPjwvcmVjdD48L3N2Zz4=';

      return {
        restrict: 'A',
        terminal: true,
        priority: 100,
        link: function (scope, $element, attrs) {
          var url = attrs.ngSrc;
          var limit = attrs.limit;
          var spinner = attrs.defaultImage || defaultSpinner;

          $element.after($spinner).toggleClass(className);

          attrs.$set('src', url);

          if ($element[0].complete) {
            $element.toggleClass(className);
            return;
          }

          var $spinner = angular.element(new Image()).attr( { 'src': spinner, 'class': className + '-spinner' });

          $element.after($spinner);

          outdatedTry(0, url, attrs, limit || 0, $element);
        }
      };
    }
  ]);

  angular.module('angular-preload-image').directive('preloadBgImage', ['preLoader', '$timeout',
    function (preLoader, $timeout) {

      var outdatedTry = function(timeout, element, attrs) {
        $timeout(
          function() {
            preLoader(attrs.preloadBgImage, function () {
              element.css({
                'background-image': 'url("' + attrs.preloadBgImage + '")'
              });
            }, function () {
              outdatedTry(timeout * 2 || 1000, element, attrs);
            });
          },
          timeout
        );
      };

      return {
        restrict: 'A',
        link: function (scope, element, attrs) {

          if (attrs.preloadBgImage !== undefined) {

            //Define default image
            scope.default = attrs.defaultImage || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wEWEygNWiLqlwAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAAMSURBVAjXY/j//z8ABf4C/tzMWecAAAAASUVORK5CYII=';

            element.css({
              'background-image': 'url("' + scope.default+'")'
            });

            outdatedTry(0, element, attrs);
          }
        }
      };
    }
  ]);

})(angular);