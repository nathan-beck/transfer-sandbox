$(document).ready(function () {
  $('body').addClass('js-ready');

  // Panel actions
  const $panel = $('.panel');
  const $fullPanel = $('.panel--full');

  // Close panel
  $('.panel-close').on('click', function() {
    var $parentPanel = $(this).parents($panel);
    var $this = $(this);
    
    if($parentPanel.hasClass('panel--open')) {
      $parentPanel.removeClass('panel--open');
      $this.attr('tabindex', '-1');
    }
  });

  // Show and hide panels
  const $mainNav = $('.main-nav__items');
  const $accountNavItems = $('.account-nav__items');

  $('button', $mainNav).on('click', function() {
    // Get desired content value
    var $desiredPanel = $(this).attr('data-destination');

    // Exclude portals button from following function
    if($desiredPanel != 'portals') {
      // Open panel
      if(!$panel.hasClass('panel--open')) {
        $panel.addClass('panel--open');
        $('.panel-close').attr('tabindex', '0');
      }

      // Hide all panel content
      $('.panel-content', $panel).each(function() {
        $(this).hide();
      });

      //Show correct panel content
      $('[data-content="' + $desiredPanel + '"]', $panel).show();
    }
    
    // If the account nav is active, deactivate it
    if($accountNav.hasClass('account-nav--active')) {
      $accountNav.removeClass('account-nav--active');
      $accountNavLink.attr('tabIndex', '-1'); // Remove from tabbing order
    }

    // If full panel, hide transfer window
    if($desiredPanel.hasClass('panel--full')) {
      console.log('hide window');
    }
  });

  $('button', $accountNavItems).on('click', function() {
    // Get desired content value
    var $desiredPanel = $(this).attr('data-destination');

    // Open panel
    if(!$fullPanel.hasClass('panel--open')) {
      $fullPanel.addClass('panel--open');
      $('.panel-close').attr('tabindex', '0');
    }

    // Hide all panel content
    $('.panel-content', $panel).each(function() {
      $(this).hide();
    });

    //Show correct panel content
    $('[data-content="' + $desiredPanel + '"]', $panel).show();
    
    // Deactivate account nav
    $accountNav.removeClass('account-nav--active');
    $accountNavLink.attr('tabIndex', '-1'); // Remove from tabbing order
  });

  // Account nav
  const $accountNavTrigger = $('.account-nav-trigger');
  const $accountNav = $('.account-nav');
  var $accountNavLink = $('.account-nav__item > a, .account-nav__item > button');

  $accountNavTrigger.on('click', function() {
    // Toggle active class
    if($accountNav.hasClass('account-nav--active')) {
      $accountNav.removeClass('account-nav--active');
      $accountNavLink.attr('tabIndex', '-1'); // Remove from tabbing order
    } else {
      $accountNav.addClass('account-nav--active');
      $accountNavLink.attr('tabIndex', '0'); // Add back into tabbing order
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
        $accountNavLink.attr('tabIndex', '-1'); // Remove from tabbing order
      }
    }        
  });

  // Assign tabIndex only on active nav

  // Transfer window uploader
  const $uploader = $('#uploader');
  const $uploaderForm = $('#uploader-form');
  
  // Trigger files uploader
  $('#uploader__select-files').click(function() {
    $('#uploader-form__files').click();
  });

  // Trigger directory uploader
  $('#uploader__select-folder').click(function() {
    $('#uploader-form__folders').click();
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
  // const $scrollable = $('.scrollbar-content');

  // $scrollable.scrollbar({
  //   "autoScrollSize": false,
  //   "scrolly": $('.scrollbar-y')
  // });

  // Transfer completion state
  const $transferButton = $('.transfer-button');
  const $transferWindowContainer = $('.transfer-window-container');
  const $discoveryDrawer = $('.discovery-drawer');
  const $drawerDelay = 800;
  
  $transferButton.on('click', function() {
    if(!$transferWindowContainer.hasClass('transfer--complete')) {

      // Show completion state
      $transferWindowContainer.addClass('transfer--complete');

      // Discovery drawer
      if(!$transferWindowContainer.hasClass('drawer--active')) {
        setTimeout(function() {
          $transferWindowContainer.addClass('drawer--active');
          $('a', $discoveryDrawer).attr('tabIndex', '0'); // Add back into tabbing order
        }, $drawerDelay);
      }
    }
  });

  // Close drawer
  $('.close-drawer').on('click', function() {
    if($transferWindowContainer.hasClass('drawer--active')) {
      $transferWindowContainer.removeClass('drawer--active');
    }
  });
});
