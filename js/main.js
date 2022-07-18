$(document).ready(function () {
  $('body').addClass('js-ready');

  // Panel actions
  const $panel = $('.panel');

  // Close panel
  $('.panel-close').on('click', function() {
    var $parentPanel = $(this).parents($panel);
    
    if($parentPanel.hasClass('panel--open')) {
      $parentPanel.removeClass('panel--open');
    }
  });

  // Main nav
  const $mainNav = $('.main-nav__items');

  $('button', $mainNav).on('click', function() {
    // Get desired content value
    var $desiredPanel = $(this).attr('data-destination');

    // Exclude portals button from following function
    if($desiredPanel != 'portals') {
      // Open panel
      if(!$panel.hasClass('panel--open')) {
        $panel.addClass('panel--open');
      }

      // Hide all panel content
      $('.panel-content', $panel).each(function() {
        $(this).hide();
      });

      //Show correct panel content
      $('[data-content="' + $desiredPanel + '"]', $panel).show();
    }
  });

  // Account nav
  const $accountNavTrigger = $('.account-nav-trigger');
  const $accountNav = $('.account-nav');

  $accountNavTrigger.on('click', function() {
    // Toggle active class
    if($accountNav.hasClass('account-nav--active')) {
      $accountNav.removeClass('account-nav--active');
    } else {
      $accountNav.addClass('account-nav--active');
    }
  });

  // Hide dropdown menu on click outside
  $(document).click(function(event) { 
    var $target = $(event.target);
    
    // If you haven't clicked the nav or the nav trigger
    if(!$target.closest($accountNav).length && !$target.closest($accountNavTrigger).length) {
      // If the nav is active, deactivate it
      if($accountNav.hasClass('account-nav--active')) {
        $accountNav.removeClass('account-nav--active');
      }
    }        
  });
});
