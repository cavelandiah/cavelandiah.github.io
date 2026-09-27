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

var breaks = [];

function closeMenu(restoreFocus) {
  var focusWasInMenu = $hlinks.find(document.activeElement).length > 0;

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
  var focusWasInMenu = $hlinks.find(document.activeElement).length > 0;
  var availableSpace = $nav.width() - ($hlinks.children().length ? $btn.outerWidth(true) : 0);

  // Return links from the start of the overflow list so their source order is
  // preserved as space becomes available.
  while(breaks.length && availableSpace > breaks[breaks.length - 1]) {
    $hlinks.children().first().appendTo($vlinks);
    breaks.pop();
  }

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

  if($hlinks.children().length) {
    $btn.removeClass('hidden');
  } else {
    $btn.addClass('hidden');
    closeMenu(false);
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
  if($hlinks.hasClass('hidden')) {
    $hlinks.removeClass('hidden');
    $btn.addClass('close')
      .attr('aria-expanded', 'true')
      .attr('aria-label', 'Close navigation menu');
  } else {
    closeMenu(false);
  }
});

$hlinks.on('click', 'a', function() {
  closeMenu(false);
});

$(document).on('keydown', function(event) {
  if(event.key === 'Escape' && !$hlinks.hasClass('hidden')) {
    event.preventDefault();
    closeMenu(true);
  }
});

$(document).on('click', function(event) {
  if(!$nav.is(event.target) && $nav.has(event.target).length === 0) {
    closeMenu(false);
  }
});

updateNav();
