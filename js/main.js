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

  // Transfer window options
  const $transferOptionsTrigger = $('.transfer-options-trigger');
  const $transferOptions = $('.transfer-window__options');
  const $transferWindowContent = $('.transfer-window__content');
  const $optionsSpeed = 500;

  $transferOptionsTrigger.on('click', function() {
    // Toggle active class
    if($transferOptions.hasClass('transfer-options--active')) {
      $transferWindowContent.animate( { scrollTop:0 }, $optionsSpeed);
      setTimeout(function() {
        $transferOptions.removeClass('transfer-options--active');
      }, $optionsSpeed);
    } else {
      $transferOptions.addClass('transfer-options--active');
      $transferWindowContent.animate( { 
        scrollTop: $transferWindowContent.prop('scrollHeight')
      }, $optionsSpeed);
    }
  });

  // Hide options on click outside
  $transferWindowContent.click(function(event) { 
    var $target = $(event.target);
    
    // If you haven't clicked on the options
    if(!$target.closest($transferOptions).length) {
      // If options are active, deactivate
      if($transferOptions.hasClass('transfer-options--active')) {
        $transferWindowContent.animate( { scrollTop:0 }, $optionsSpeed);
        setTimeout(function() {
          $transferOptions.removeClass('transfer-options--active');
        }, $optionsSpeed);
      }
    }        
  });

  // Custom scrollbars
  const $scrollable = $('.scrollbar-content');

  $scrollable.scrollbar({
    "autoScrollSize": false,
    "scrolly": $('.scrollbar-y')
  });
});
