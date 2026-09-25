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

var navBreakPoint = 0;

function closeMenu() {
  $hlinks.addClass('hidden');
  $btn.removeClass('close').attr('aria-expanded', 'false');
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

  // When the full navigation no longer fits, move every page link into the
  // dropdown at once. The first item is the site identity and always remains.
  if(!isCollapsed && $vlinks.width() > $nav.width() && $vlinks.children().length > 1) {
    navBreakPoint = $vlinks.width();
    $vlinks.children().not(':first').appendTo($hlinks);
    $btn.removeClass('hidden').attr('count', $hlinks.children().length);
  }
}

// Window listeners

$(window).resize(function() {
  updateNav();
});

$btn.on('click', function() {
  $hlinks.toggleClass('hidden');
  $(this).toggleClass('close');
  $(this).attr('aria-expanded', !$hlinks.hasClass('hidden'));
});

updateNav();
