/*!
 * u.formlabel.js - Version 0.1.0
 * Sticky form labels
 * Author: Steve Ottoz <so@dev.so>
 * Build date: 2016-07-29
 * Copyright (c) 2016 Steve Ottoz
 * Released under the MIT license
 */
;(function (factory) {
  'use strict';

  if (/^f/.test(typeof define) && define.amd) {
    define(['jquery'], factory);
  }
  else if (/^o/.test(typeof exports)) {
    factory(require('jquery'));
  }
  else {
    factory(jQuery);
  }
})(function ($) {


  'use strict';

  var pluginName = 'formLabel',
      defaults = {
        class: 'not-empty',
      };

  function FormLabel(element, options) {
    this.el = element;
    this.$el = $(this.el);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  FormLabel.prototype = {

    init: function() {
      var $parent = this.$el.parent();
      var cls = this.options.class;
      this.$el.on('focus blur input', function(e) {
        if (this.value === '') {
          $parent.removeClass(cls);
        }
        else {
          $parent.addClass(cls);
        }
      }).trigger('input');
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$(this).data(pluginName)) {
        $(this).data(pluginName, new FormLabel(this, options));
      }
    });
  };


});
