/*
* Greedy Navigation
*
* http://codepen.io/lukejacksonn/pen/PwmwWV
*
*/

var $nav = $('#site-nav');
var $btn = $('#site-nav button');
var $vlinks = $('#site-nav .visible-links');
var $hlinks = $('#site-nav .hidden-links');
var $identity = $('.masthead__identity');

var navBreakPoint = 0;

function closeMenu() {
  $hlinks.addClass('hidden');
  $btn.removeClass('close')
    .attr('aria-expanded', 'false')
    .attr('aria-label', 'Open navigation menu');

  if(restoreFocus && focusWasInMenu && !$btn.hasClass('hidden')) {
    $btn.focus();
  }
}

function visibleLinksWidth() {
  var width = 0;
  $vlinks.children().each(function() {
    // The spacing belongs to the nested anchor, so measuring the list item
    // alone under-counts the width and makes the overflow control appear late.
    width += $(this).find('a').outerWidth(true);
  });
  return width;
}

function updateNav() {
  var isCollapsed = $hlinks.children().length > 0;

  // Restore every menu item together once the complete navigation fits again.
  if(isCollapsed && $nav.width() >= navBreakPoint) {
    $hlinks.children().appendTo($vlinks);
    $btn.addClass('hidden').attr('count', 0);
    closeMenu();
    isCollapsed = false;
  }

  var availableSpace = $nav.width();

  // The visible list is overflowing the nav
  if(visibleLinksWidth() > availableSpace && $vlinks.children().length) {

    $btn.removeClass('hidden');
    availableSpace = $nav.width() - $btn.outerWidth(true);

    while(visibleLinksWidth() > availableSpace && $vlinks.children().length) {
      breaks.push(visibleLinksWidth());

      // On narrow viewports every item may move into the overflow menu. This
      // keeps the masthead fluid instead of forcing one link into a fixed row.
      $vlinks.children().last().prependTo($hlinks);
    }
  }

  $btn.attr('count', breaks.length);

  if(focusWasInMenu) {
    ($btn.hasClass('hidden') ? $identity : $btn).focus();
  }
}

// Window listeners

var resizeFrame;

function requestNavUpdate() {
  window.cancelAnimationFrame(resizeFrame);
  resizeFrame = window.requestAnimationFrame(updateNav);
}

$(window).resize(requestNavUpdate);

if(window.ResizeObserver) {
  new ResizeObserver(requestNavUpdate).observe($nav[0]);
}

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
  $(this).attr('aria-expanded', !$hlinks.hasClass('hidden'));
});

updateNav();
