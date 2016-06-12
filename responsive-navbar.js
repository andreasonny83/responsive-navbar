(function(rNav, undefined) {
  'use strict';

  function ResponsiveNav() {
    var self = this;

    self.startX = 0;
    self.currentX = 0;

    self.body =
    document.body;

    self.showButtonEl =
      document.querySelector('.js-menu-show');

    self.responsiveNavEl =
      document.querySelector('.js-responsive-nav');

    self.responsiveNavContainer =
      document.querySelector('.js-responsive-nav-container');

    self.showButtonEl
      .addEventListener('click', self.showResponsiveNav.bind(self));

    self.responsiveNavEl
      .addEventListener('click', self.hideResponsiveNav.bind(self));

    self.responsiveNavContainer
      .addEventListener('click', self.ignoreHide);

    document
      .addEventListener('touchstart', self.onTouchStart.bind(self));

    document
      .addEventListener('touchmove', self.onTouchMove.bind(self));

    document
      .addEventListener('touchend', self.onTouchEnd.bind(self));

    self.onTransitionEnd = function() {
      self.responsiveNavEl
        .classList.remove('responsive-nav--animatable');

      self.responsiveNavContainer
        .removeEventListener('transitionend', self.onTransitionEnd);
    };
  }

  ResponsiveNav.prototype.showResponsiveNav = function() {
    if (!this.body.hasAttribute('style')) {
      this.body.setAttribute('style', 'overflow-y:hidden;');
    }

    this.responsiveNavEl
      .classList.add('responsive-nav--visible', 'responsive-nav--animatable');

    this.responsiveNavEl
      .addEventListener('transitionend', this.onTransitionEnd);
  };

  ResponsiveNav.prototype.hideResponsiveNav = function() {
    if (this.body.hasAttribute('style')) {
      this.body.removeAttribute('style');
    }

    this.responsiveNavEl
      .classList.remove('responsive-nav--visible');

    this.responsiveNavEl
      .classList.add('responsive-nav--animatable');

    this.responsiveNavEl
      .addEventListener('transitionend', this.onTransitionEnd);
  };

  ResponsiveNav.prototype.ignoreHide = function(evt) {
    evt.stopPropagation();
  };

  ResponsiveNav.prototype.update = function() {
    requestAnimationFrame(this.update.bind(this));

    if(!this.touchingSideNav || this.touchingList) {
      return;
    }

    if (!this.moving && !this.swipeFromLeft) {
      translateX = this.currentX;

      return;
    }

    var translateX;

    if (this.swipeFromLeft) {
      translateX = 20 + Math.min(-20, this.currentX - this.startX -
        this.responsiveNavContainer.getBoundingClientRect().width);
    } else {
      translateX = Math.min(0, this.currentX - this.startX);
    }

    this.responsiveNavContainer.style.transform =
      'translateX(' + translateX + 'px)';

  };

  ResponsiveNav.prototype.onTouchStart = function(evt) {
    var self = this;
    self.touchingList = false;

    if (!this.responsiveNavEl.classList.contains('responsive-nav--visible') &&
        evt.touches[0].pageX > 20) {
      return;
    }

    evt.path.forEach(function(i) {
      if (i.classList && i.classList.contains('responsive-nav__container')) {
        self.touchingList = true;
      }
    });

    if (!this.body.hasAttribute('style')) {
      this.body.setAttribute('style', 'overflow-y:hidden;');
    }

    this.startX = evt.touches[0].pageX;
    this.startY = evt.touches[0].pageY;

    this.currentX = this.startX;
    this.currentY = this.startY;
    this.touchingSideNav = true;

    this.swipeFromLeft = this.startX < 20 &&
      !this.responsiveNavEl.classList.contains('responsive-nav--visible') ?
      true : false;

    if (!!this.swipeFromLeft &&
        !this.responsiveNavEl.classList.contains('responsive-nav--visible')) {
      this.responsiveNavEl
        .classList.add('responsive-nav--visible', 'responsive-nav--animatable');
    }

    requestAnimationFrame(this.update.bind(this));
  };

  ResponsiveNav.prototype.onTouchMove = function(evt) {
    if (!this.touchingSideNav) {
      return;
    }

    this.currentX = evt.touches[0].pageX;
    this.currentY = evt.touches[0].pageY;

    if ((this.moving === 'x' || !!this.swipeFromLeft) &&
        this.responsiveNavContainer.style.overflowY !== 'hidden') {
      this.responsiveNavContainer.style.overflowY = 'hidden';
    }

    if (!this.moving && Math.abs(this.currentX - this.startX) > 10) {
      this.moving = 'x';
      this.touchingList = false;
    } else if (!!this.touchingList &&
        !this.moving && Math.abs(this.currentY - this.startY) > 10) {
      this.moving = 'y';
    }
  };

  ResponsiveNav.prototype.onTouchEnd = function(evt) {
    if (!this.touchingSideNav) {
      return;
    }

    this.touchingSideNav = false;
    this.moving = null;
    this.responsiveNavContainer.style = '';

    if (!!this.touchingList) {
      return;
    }

    var translateX = this.currentX - this.startX;

    if ((!this.swipeFromLeft && translateX < -60) ||
        (!!this.swipeFromLeft && translateX < 60)) {
      this.hideResponsiveNav();
    } else if (!!this.swipeFromLeft && translateX > 60) {
      this.showResponsiveNav();
    }
  };

  function init() {
    new ResponsiveNav;
  };

  rNav = {
    init: init,
    version: 'ResponsiveNav v.0.0.4'
  };

  window.ResponsiveNav = rNav;
}(window.ResponsiveNav || {}));
