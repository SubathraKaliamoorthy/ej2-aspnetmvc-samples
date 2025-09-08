var cBlock = ['js-src-tab', 'html-src-tab'];
var switcherPopup;
var themeSwitherPopup;
var openedPopup;
var searchPopup;
var settingsPopup;
var prevAction;
var searchInstance;
var headerThemeSwitch = document.getElementById('header-theme-switcher');
var settingElement = ej.base.select('.sb-setting-btn');
var themeList = document.getElementById('themelist');
var themeCollection = ['material', 'fabric', 'bootstrap'];
var themeDropDown;
var contentTab;
var sourceTab;
var isExternalNavigation = true;
var defaultTree = false;
var intialLoadCompleted = false;
var resizeManualTrigger = false;
var leftToggle = ej.base.select('#sb-toggle-left');
var sbRightPane = ej.base.select('.sb-right-pane');
var sbContentOverlay = ej.base.select('.sb-content-overlay');
var sbBodyOverlay = ej.base.select('.sb-body-overlay');
var sbHeader = ej.base.select('#sample-header');
var resetSearch = ej.base.select('.sb-reset-icon');
var urlRegex = /(npmci\.syncfusion\.com|ej2\.syncfusion\.com)(\/)(development|production)*/;
var sampleRegex = /#\/(([^\/]+\/)+[^\/\.]+)/;
var sbArray = ['angular', 'react', 'typescript','javascript'];
var sbObj = {
    'angular': 'angular',
    'typescript': '',
    'react': 'react',
    'javascript': 'javascript'
};
var searchEle = ej.base.select('#search-popup');
var inputele = ej.base.select('#search-input');
var searchOverlay = ej.base.select('.e-search-overlay');
var searchButton = document.getElementById('sb-trigger-search');
var setResponsiveElement = ej.base.select('.setting-responsive');
var isMobile = window.matchMedia('(max-width:550px)').matches;
var isTablet = window.matchMedia('(min-width:600px) and (max-width: 850px)').matches;
var isPc = window.matchMedia('(min-width:850px)').matches;
var selectedTheme = location.hash.split('/')[1] || 'material';
var toggleAnim = new ej.base.Animation({ duration: 500, timingFunction: 'ease' });
var controlSampleData = {};
var samplesList = getSampleList();
var samplesTreeList = [];
var execFunction = {};
var searchListView;
//window.apiList = window.apiList;
var sampleNameElement = document.querySelector('#component-name>.sb-sample-text');
var breadCrumbComponent = document.querySelector('.sb-bread-crumb-text>.category-text');
var breadCrumSeperator = ej.base.select('.category-seperator');
var breadCrumbSubCategory = document.querySelector('.sb-bread-crumb-text>.component');
var breadCrumbSample = document.querySelector('.sb-bread-crumb-text>.crumb-sample');
var hsplitter = '<div class="sb-toolbar-splitter sb-custom-item"></div>';
var openNewTemplate = "<div class=\"sb-custom-item sb-open-new-wrapper\"><a id=\"openNew\" target=\"_blank\">\n<div class=\"sb-icons sb-icon-Popout\"></div></a></div>";
var sampleNavigation = "<div class=\"sb-custom-item sample-navigation\"><button id='prev-sample' class=\"sb-navigation-prev\" \n    aria-label=\"previous sample\">\n<span class='sb-icons sb-icon-Previous'></span>\n</button>\n<button  id='next-sample' class=\"sb-navigation-next\" aria-label=\"next sample\">\n<span class='sb-icons sb-icon-Next'></span>\n</button>\n</div>";
var contentToolbarTemplate = '<div class="sb-desktop-setting"><button id="open-plnkr" class="sb-custom-item sb-plnr-section">' +
 '</button>' + hsplitter  + hsplitter +
    '</div>' + sampleNavigation + '<div class="sb-icons sb-mobile-setting"></div>';
var tabContentToolbar = ej.base.createElement('div', { className: 'sb-content-toolbar', innerHTML: contentToolbarTemplate });
var apiGrid;
window.navigateSample = (window.navigateSample !== undefined) ? window.navigateSample : function() { return; };
var isInitRedirected;
var samplePath = [];
var defaultSamples = [];
var samplesAr = [];
var currentControlID;
var currentSampleID;
var currentControl;

function preventTabSwipe(e) {
    if (e.isSwiped) {
        e.cancel = true;
    }
}

function renderSbPopups() {
    switcherPopup = new ej.popups.Popup(document.getElementById('sb-switcher-popup'), {
        relateTo: document.querySelector('.sb-header-text-right'),
        position: { X: 'left' },
        collision: { X: 'flip', Y: 'flip' },
        offsetX: 0,
        offsetY: -15,
    });
    themeSwitherPopup = new ej.popups.Popup(document.getElementById('theme-switcher-popup'), {
        offsetY: 2,
        relateTo: document.querySelector('.theme-wrapper'),
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    searchPopup = new ej.popups.Popup(searchEle, {
        offsetY: -80,
        relateTo: inputele,
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    settingsPopup = new ej.popups.Popup(document.getElementById('settings-popup'), {
        offsetX: -245,
        offsetY: 5,
        relateTo: settingElement,
        position: { X: 'right', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' }
    });
    if (!isMobile) {
        settingsPopup.hide();
    } else {
        ej.base.select('.sb-mobile-preference').appendChild(ej.base.select('#settings-popup'));
    }
    searchPopup.hide();
    switcherPopup.hide();
    themeSwitherPopup.hide();
    themeDropDown = new ej.dropdowns.DropDownList({
        index: 0,
        change: function(e) { switchTheme(e.value); }
    });
    themeDropDown.appendTo('#sb-setting-theme');
    contentTab = new ej.navigations.Tab({
        selected: changeTab,
        selecting: preventTabSwipe
    }, '#sb-content');
    sourceTab = new ej.navigations.Tab({
        headerPlacement: 'Bottom',
        cssClass: 'sb-source-code-section',
        selecting: preventTabSwipe
    }, '#sb-source-tab');
    sourceTab.selectedItem = 1;
    apiGrid = new ej.grids.Grid({
        width: '100%',
        dataSource: [],
        toolbar: ['search'],
        allowTextWrap: true,
        columns: [
            { field: 'name', headerText: 'Name', template: '#template', width: 180, textAlign: 'center' },
            { field: 'type', headerText: 'Type', width: 180 },
            { field: 'description', headerText: 'Description', template: '#template-description' },
        ],
        dataBound: dataBound
    });
    apiGrid.appendTo('#api-grid');
    var prevbutton = new ej.buttons.Button({ iconCss: 'sb-icons sb-icon-Previous', cssClass: 'e-flat' }, '#mobile-prev-sample');
    var nextbutton = new ej.buttons.Button({ iconCss: 'sb-icons sb-icon-Next', cssClass: 'e-flat', iconPosition: 'right' }, '#mobile-next-sample');
    var tabHeader = document.getElementById('sb-content-header');
    tabHeader.appendChild(tabContentToolbar);
    var openNew = new ej.popups.Tooltip({
        content: 'Open in New Window'
    });

    openNew.appendTo('.sb-open-new-wrapper');

    var previous = new ej.popups.Tooltip({
        content: 'Previous Sample'
    });
    previous.appendTo('#prev-sample');

    var next = new ej.popups.Tooltip({
        content: 'Next Sample'
    });

    next.appendTo('#next-sample');
    var ele = ej.base.createElement('div', { className: 'copy-tooltip', innerHTML: '<div class="e-icons copycode"></div>' });
    document.getElementById('sb-source-tab').appendChild(ele);
    var copiedTooltip = new ej.popups.Tooltip({ content: 'Copied to clipboard ', position: 'bottom center', opensOn: 'click', closeDelay: 500 }, '.copy-tooltip');
}

function checkApiTableDataSource() {
    var hash = location.hash.split('/');
    var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
    if (!data.length) {
        contentTab.hideTab(2);
    } else {
        contentTab.hideTab(2, false);
    }
}

function changeTab(args) {
    if (args.selectedIndex === 2) {
        var hash = location.hash.split('/');
        var data = window.apiList[hash[2] + '/' + hash[3].replace('.html', '')] || [];
        if (data.length) {
            apiGrid.dataSource = data;
        } else {
            apiGrid.dataSource = [];
        }
    }
}

function dataBound(args) {
    var gridtrs = this.getRows().length;
    var trs = this.getRows();
    for (var count = 0; count < gridtrs; count++) {
        var tr1 = trs[count];
        if (tr1.getBoundingClientRect().height > 100) {
            var desDiv = tr1.querySelector('.sb-sample-description');
            var tag = ej.base.createElement('a', { id: 'showtag', innerHTML: ' show more...' });
            tag.addEventListener('click', tagShowmore.bind(this, desDiv));
            desDiv.classList.add('e-custDesription');
            desDiv.appendChild(tag);
        }
    }
}

function tagShowmore(target) {
    target.classList.remove('e-custDesription');
    target.querySelector('#showtag').classList.add('e-display');
    var hideEle = target.querySelector('#hidetag');
    if (!hideEle) {
        var tag = ej.base.createElement('a', { id: 'hidetag', attrs: {}, innerHTML: 'hide less..' });
        target.appendChild(tag);
        tag.addEventListener('click', taghideless.bind(this, target));
    } else {
        hideEle.classList.remove('e-display');
    }
}

function taghideless(target) {
    target.querySelector('#hidetag').classList.add('e-display');
    target.querySelector('#showtag').classList.remove('e-display');
    target.classList.add('e-custDesription');
}
function setPressedAttribute(ele) {
    var status = ele.classList.contains('active');
    ele.setAttribute('aria-pressed', status ? 'true' : 'false');
}
function sbHeaderClick(action, preventSearch) {
    if (openedPopup) {
        openedPopup.hide(new ej.base.Animation({ name: 'FadeOut', duration: 300, delay: 0 }));
    }
    if (preventSearch !== true && !searchOverlay.classList.contains('sb-hide')) {
        searchOverlay.classList.add('sb-hide');
        searchButton.classList.remove('active');
        setPressedAttribute(searchButton);
    }
    var curPopup;
    switch (action) {
        case 'changeSampleBrowser':
            curPopup = switcherPopup;
            break;
        case 'changeTheme':
            headerThemeSwitch.classList.toggle('active');
            setPressedAttribute(headerThemeSwitch);
            curPopup = themeSwitherPopup;
            break;
        case 'toggleSettings':
            settingElement.classList.toggle('active');
            setPressedAttribute(settingElement);
            themeDropDown.index = themeCollection.indexOf(selectedTheme);
            curPopup = settingsPopup;
            break;
    }
    if (action === 'closePopup') {
        headerThemeSwitch.classList.remove('active');
        settingElement.classList.remove('active');
    }
    if (curPopup && curPopup !== openedPopup) {
        curPopup.show(new ej.base.Animation({ name: 'FadeIn', duration: 400, delay: 0 }));
        openedPopup = curPopup;
    } else {
        openedPopup = null;
    }
    prevAction = action;
}

function toggleSearchOverlay() {
    sbHeaderClick('closePopup', true);
    inputele.value = '';
    searchPopup.hide();
    searchButton.classList.toggle('active');
    setPressedAttribute(searchButton);
    searchOverlay.classList.toggle('sb-hide');
    if (!searchOverlay.classList.contains('sb-hide')) {
        inputele.focus();
    }
}

function changeTheme(e) {
    var target = e.target;
    target = ej.base.closest(target, 'li');
    var themeName = target.id;
    switchTheme(themeName);
}

function switchTheme(str) {
    var hash = location.hash.split('/');
    if (hash[1] !== str) {
        hash[1] = str;
        localStorage.setItem('ej2-switch', ej.base.select('.sb-responsive-section .active').id);
        location.hash = hash.join('/');
    }
}

function onsearchInputChange(e) {
    if (e.keyCode === 27) {
        toggleSearchOverlay();
    }
    var searchString = e.target.value;
    if (searchString.length <= 2) {
        searchPopup.hide();
        return;
    }
    var val = [];
    val = searchInstance.search(searchString, {
        fields: {
            component: { boost: 1 },
            name: { boost: 2 }
        },
        expand: true,
        boolean: 'AND'
    });
    if (val.length) {
        var data = new ej.data.DataManager(val);
        var controls = data.executeLocal(new ej.data.Query().take(10).select('doc'));
        var count = 1;
        var controlCollection = {};
        controlCollection[controls[0].component] = count;
        controls[0].sortId = count;
        for (var i = 1; i < controls.length; i++) {
            var curComponent = controls[i].component;
            var previd = controlCollection[curComponent];
            if (previd) {
                controls[i].sortId = previd;
            } else {
                ++count;
                controlCollection[curComponent] = count;
                controls[i].sortId = count;
            }
        }
        if (!searchListView) {
            searchListView = new ej.lists.ListView({
                dataSource: controls,
                fields: { id: 'uid', text: 'name', groupBy: 'sortId' },
                select: controlSelect,
                template: '<div class="e-text-content e-icon-wrapper" data="${dir}/${url}" uid="${uid}" pid="${parentId}">' +
                '<span class="e-list-text" role="list-item">' +
                '${name}</span></div>',
                groupTemplate: '${if(items[0]["component"])}<div class="e-text-content"><span class="e-search-group">${items[0].component}</span>' +
                '</div>${/if}',
                actionComplete: function() {
                    var searchValue = ej.base.select('#search-input').value;
                    highlight(searchValue, this.element);
                }
            }, searchPopup.element);
        } else {
            searchListView.dataSource = controls;
        }
        searchPopup.show();
    } else {
        searchPopup.element.innerHTML = '<div class="search-no-record">Weâ€™re sorry. We cannot find any matches for your search term.</div>';
        searchPopup.show();
    }
}

function highlight(searchString, listElement) {
    var regex = new RegExp(searchString.split(' ').join('|'), 'gi');
    var contentElements = ej.base.selectAll('.e-list-item .e-text-content .e-list-text', listElement);
    for (var i = 0; i < contentElements.length; i++) {
        var spanText = ej.base.select('.sb-highlight', contentElements[i]);
        if (spanText) {
            contentElements[i].innerHTML = contentElements[i].text;
        }
        contentElements[i].innerHTML = contentElements[i].innerHTML.replace(regex, function(matched) {
            return '<span class="sb-highlight">' + matched + '</span>';
        });
    }
}

function setMouseOrTouch(e) {
    var ele = ej.base.closest(e.target, '.sb-responsive-items');
    var switchType = ele.id;
    changeMouseOrTouch(switchType);
    sbHeaderClick('closePopup');
    localStorage.setItem('ej2-switch', switchType);
    location.reload();
}

function onNextButtonClick(arg) {
    sampleOverlay();
    var curSampleUrl = location.pathname;
    var inx = samplesAr.indexOf(curSampleUrl);
    if (inx !== -1) {
        var prevhref = samplesAr[inx];
        var curhref = samplesAr[inx + 1];
        location.href = curhref;
    }
    window.hashString = location.origin + '/' + curhref;
    setSelectList();
}

function onPrevButtonClick(arg) {
    sampleOverlay();
    var curSampleUrl = location.pathname;
    var inx = samplesAr.indexOf(curSampleUrl);
    if (inx !== -1) {
        var prevhref = samplesAr[inx];
        var curhref = samplesAr[inx - 1];
        location.href = curhref;
    }
    window.hashString = location.origin + '/' + curhref;
    setSelectList();
}

function processResize(e) {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (resizeManualTrigger || (isMobile && !ej.base.select('.sb-mobile-right-pane').classList.contains('sb-hide'))) {
        return;
    }
    isTablet = window.matchMedia('(min-width:550px) and (max-width: 850px)').matches;
    isPc = window.matchMedia('(min-width:850px)').matches;
    processDeviceDependables();
    setLeftPaneHeight();
    var leftPane = ej.base.select('.sb-left-pane');
    var rightPane = ej.base.select('.sb-right-pane');
    var footer = ej.base.select('.sb-footer-left');
    var pref = ej.base.select('#settings-popup');
    if (isTablet || isMobile) {
        contentTab.hideTab(1);
    } else {
        contentTab.hideTab(1, false);
    }
    if (isMobile) {
        leftPane.classList.remove('sb-hide');
        if (leftPane.parentElement.classList.contains('sb-mobile-left-pane')) {
            if (!leftPane.parentElement.classList.contains('sb-hide')) {
                toggleLeftPane();
            }
        } else {
            ej.base.select('.sb-mobile-left-pane').appendChild(leftPane);
            ej.base.select('.sb-left-footer-links').appendChild(footer);
            if (!ej.base.select('.sb-mobile-left-pane').classList.contains('sb-hide')) {
                toggleLeftPane();
            } else {
                leftToggle.classList.remove('toggle-active');
            }
            if (isVisible('.sb-mobile-overlay')) {
                removeMobileOverlay();
            }
        }
        if (!pref.parentElement.classList.contains('sb-mobile-preference')) {
            ej.base.select('.sb-mobile-preference').appendChild(pref);
            settingsPopup.show();
        }
        var propPanel = ej.base.select('#control-content .property-section');
        if (propPanel) {
            ej.base.select('.sb-mobile-prop-pane').appendChild(propPanel);
            ej.base.select('.sb-mobile-setting').classList.remove('sb-hide');
        }
        if (isVisible('.sb-mobile-overlay')) {
            removeMobileOverlay();
        }
    }
    if (isTablet || isPc) {
        if (leftPane.parentElement.classList.contains('sb-mobile-left-pane')) {
            ej.base.select('.sb-content').appendChild(leftPane);
            ej.base.select('.sb-footer').appendChild(footer);
            if (isVisible('.sb-mobile-overlay')) {
                removeMobileOverlay();
            }
        }
        if (isTablet || (ej.base.Browser.isDevice && isPc)) {
            if (!leftPane.classList.contains('sb-hide')) {
                toggleLeftPane();
            }
            setTimeout(function() {
                if (!rightPane.classList.contains('control-fullview')) {
                    rightPane.classList.add('control-fullview');
                }
            }, 600);
        }
        if (isPc && !ej.base.Browser.isDevice && isVisible('.sb-left-pane')) {
            rightPane.classList.remove('control-fullview');
        }
        if (pref.parentElement.classList.contains('sb-mobile-preference')) {
            ej.base.select('#sb-popup-section').appendChild(pref);
            settingsPopup.hide();
        }
        var mobilePropPane = ej.base.select('.sb-mobile-prop-pane .property-section');
        if (mobilePropPane) {
            ej.base.select('#control-content').appendChild(mobilePropPane);
        }
        if (!ej.base.select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
            toggleRightPane();
        }
    }
}

function resetInput(arg) {
    arg.preventDefault();
    arg.stopPropagation();
    document.getElementById('search-input').value = '';
    document.getElementById('search-input-wrapper').setAttribute('data-value', '');
    searchPopup.hide();
}
function bindEvents() {
    document.getElementById('sb-switcher').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeSampleBrowser');
    });
    ej.base.select('.sb-header-text-right').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeSampleBrowser');
    });
    headerThemeSwitch.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('changeTheme');
    });
    themeList.addEventListener('click', changeTheme);
    document.addEventListener('click', sbHeaderClick.bind(this, 'closePopup'));
    settingElement.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        sbHeaderClick('toggleSettings');
    });
    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleSearchOverlay();
    });
    document.getElementById('settings-popup').addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    inputele.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    inputele.addEventListener('keyup', onsearchInputChange);
    setResponsiveElement.addEventListener('click', setMouseOrTouch);
    ej.base.select('#sb-left-back').addEventListener('click', showHideControlTree);
    leftToggle.addEventListener('click', toggleLeftPane);
    ej.base.select('.sb-mobile-overlay').addEventListener('click', toggleMobileOverlay);
    ej.base.select('.sb-header-settings').addEventListener('click', viewMobilePrefPane);
    ej.base.select('.sb-mobile-setting').addEventListener('click', viewMobilePropPane);
    resetSearch.addEventListener('click', resetInput);
    document.getElementById('open-plnkr').addEventListener('click', function() {
        var plnkrForm = ej.base.select('#plnkr-form');
        if (plnkrForm) {
            plnkrForm.submit();
        }
    });
    document.getElementById('switch-sb').addEventListener('click', function(e) {
        var target = ej.base.closest(e.target, 'li');
        if (target) {
            var anchor = target.querySelector('a');
            if (anchor) {
                anchor.click();
            }
        }
    });
    ej.base.select('#next-sample').addEventListener('click', onNextButtonClick);
    ej.base.select('#mobile-next-sample').addEventListener('click', onNextButtonClick);
    ej.base.select('#prev-sample').addEventListener('click', onPrevButtonClick);
    ej.base.select('#mobile-prev-sample').addEventListener('click', onPrevButtonClick);
    window.addEventListener('resize', processResize);
    ej.base.select('.sb-right-pane').addEventListener('click', function() {
        if (isTablet && isLeftPaneOpen()) {
            toggleLeftPane();
        }
    });
    ej.base.select('.copycode').addEventListener('click', copyCode);
    searchEle.addEventListener('click', function(e) {
        var curEle = ej.base.closest(e.target, 'li');
        if (curEle && curEle.classList.contains('e-list-item')) {
            var tcontent = curEle.querySelector('.e-text-content');
            var hashval = '#/' + selectedTheme + '/' + tcontent.getAttribute('data') + '.html';
            inputele.value = '';
            searchPopup.hide();
            searchOverlay.classList.add('e-search-hidden');
            if (location.hash !== hashval) {
                sampleOverlay();
                location.hash = hashval;
                setSelectList();
            }
        }
    });
}

function copyCode() {
    var copyElem = ej.base.select('#' + cBlock[sourceTab.selectedItem]);
    var textArea = ej.base.createElement('textArea');
    textArea.textContent = copyElem.textContent.trim();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    ej.base.detach(textArea);
    ej.base.select('.copy-tooltip').ej2_instances[0].close();
}

function setSbLink() {
    var href = location.href;
    var link = href.match(urlRegex);
    var sample = href.match(sampleRegex);
    for (var i = 0, len = sbArray.length; i < len; i++) {
        var sb = sbArray[i];
        var ele = ej.base.select('#' + sb);
        ele.href = ((link) ? ('http://' + link[1] + '/' + (link[3] ? (link[3] + '/') : '')) :
            ('http://ej2.syncfusion.com/')) + (sbObj[sb] ? (sb + '/') : '') +
            'demos/#/' + (sample ? (sample[1] + (sb !== 'typescript' ? '' : '.html')) : '');
    }
}

function changeMouseOrTouch(str) {
    var activeEle = setResponsiveElement.querySelector('.active');
    if (activeEle) {
        activeEle.classList.remove('active');
    }
    if (str === 'mouse') {
        document.body.classList.remove('e-bigger');
    } else {
        document.body.classList.add('e-bigger');
    }
    setResponsiveElement.querySelector('#' + str).classList.add('active');
}

function loadTheme(theme) {
    var body = document.body;
    if (body.classList.length > 0) {
        for (var themeItem in themeCollection) {
            body.classList.remove(themeCollection[themeItem]);
        }
    }
    body.classList.add(theme);
    themeList.querySelector('.active').classList.remove('active');
    themeList.querySelector('#' + theme).classList.add('active');
    var ajax = new ej.base.Ajax('/styles/' + theme + '.css', 'GET', true);
    ajax.send().then(function(result) {
        var doc = document.getElementById('themelink');
        doc.innerHTML = result;
        selectedTheme = theme;
        renderLeftPaneComponents();
        renderSbPopups();
        bindEvents();
        if (isTablet || isMobile) {
            contentTab.hideTab(1);
        }
        processDeviceDependables();
        addRoutes(samplesList);
        if (isTablet && isLeftPaneOpen()) {
            toggleLeftPane();
        }
        elasticlunr.clearStopWords();
        searchInstance = elasticlunr.Index.load(window.searchIndex);
        hasher.initialized.add(parseHash);
        hasher.changed.add(parseHash);
        hasher.init();      
    });
}

function toggleMobileOverlay() {
    if (!ej.base.select('.sb-mobile-left-pane').classList.contains('sb-hide')) {
        toggleLeftPane();
    }
    if (!ej.base.select('.sb-mobile-right-pane').classList.contains('sb-hide')) {
        toggleRightPane();
    }
}

function removeMobileOverlay() {
    ej.base.select('.sb-mobile-overlay').classList.add('sb-hide');
}

function isLeftPaneOpen() {
    return leftToggle.classList.contains('toggle-active');
}

function isVisible(elem) {
    return !ej.base.select(elem).classList.contains('sb-hide');
}

function setLeftPaneHeight() {
    var leftPane = ej.base.select('.sb-left-pane');
    leftPane.style.height = isMobile ? (document.body.offsetHeight + 'px') : '';
}

function toggleLeftPane() {
    var leftPane = ej.base.select('.sb-left-pane');
    var rightPane = ej.base.select('.sb-right-pane');
    var mobileLeftPane = ej.base.select('.sb-mobile-left-pane');
    var reverse = leftPane.classList.contains('sb-hide');
    if (reverse) {
        leftToggle.classList.add('toggle-active');
    } else {
        leftToggle.classList.remove('toggle-active');
    }
    if (!isMobile) {
        leftPane.classList.remove('sb-hide');
        rightPane.classList.add('control-transition');
        rightPane.style.overflowY = 'hidden';
        if (!reverse) {
            rightPane.classList.add('control-animate');
        } else {
            rightPane.classList.add('control-reverse-animate');
        }
    } else {
        reverse = mobileLeftPane.classList.contains('sb-hide');
        mobileLeftPane.classList.remove('sb-hide');
    }
    ej.base.select('.sb-mobile-overlay').classList.toggle('sb-hide');
    if (!reverse) {
        rightPane.classList.remove('control-fullview');
    } else {
        rightPane.classList.add('control-fullview');
    }
    toggleAnim.animate(leftPane, {
        name: reverse ? 'SlideLeftIn' : 'SlideLeftOut',
        end: function() {
            if (!isMobile) {
                rightPane.classList.remove('control-transition');
                rightPane.style.overflowY = 'auto';
                if (!reverse) {
                    leftPane.classList.add('sb-hide');
                    rightPane.classList.remove('control-animate');
                } else {
                    rightPane.classList.remove('control-reverse-animate');
                }
                rightPane.classList.toggle('control-fullview');
            } else if (isMobile && !reverse) {
                mobileLeftPane.classList.add('sb-hide');
            }
            resizeManualTrigger = true;
            window.dispatchEvent(new Event('resize'));
            if (ej.base.Browser.isDevice) {
                window.dispatchEvent(new Event('orientationchange'));
            }
            resizeManualTrigger = false;
        }
    });
}

function toggleRightPane() {
    themeDropDown.index = themeCollection.indexOf(selectedTheme);
    var mRightPane = ej.base.select('.sb-mobile-right-pane');
    ej.base.select('.sb-mobile-overlay').classList.toggle('sb-hide');
    var reverse = mRightPane.classList.contains('sb-hide');
    mRightPane.classList.remove('sb-hide');
    toggleAnim.animate(mRightPane, {
        name: reverse ? 'SlideRightIn' : 'SlideRightOut',
        end: function() {
            if (!reverse) {
                mRightPane.classList.add('sb-hide');
            }
        }
    });
}

function viewMobilePrefPane() {
    ej.base.select('.sb-mobile-prop-pane').classList.add('sb-hide');
    ej.base.select('.sb-mobile-preference').classList.remove('sb-hide');
    toggleRightPane();
}

function viewMobilePropPane() {
    ej.base.select('.sb-mobile-preference').classList.add('sb-hide');
    ej.base.select('.sb-mobile-prop-pane').classList.remove('sb-hide');
    toggleRightPane();
}

function getSampleList() {
    if (ej.base.Browser.isDevice) {
        var tempList = ej.base.extend([], window.samplesList);
        for (var i = 0; i < tempList.length; i++) {
            var temp = tempList[i];
            var data = new ej.data.DataManager(temp.samples);
            temp.samples = data.executeLocal(new ej.data.Query().where('hideOnDevice', 'notEqual', true));
        }
        return tempList;
    }
    return window.samplesList;
}


function renderLeftPaneComponents() {
    samplesTreeList = getTreeviewList(samplesList);
    var sampleTreeView = new ej.navigations.TreeView({
        fields: {
            dataSource: samplesTreeList,
            id: 'id',
            parentID: 'pid',
            text: 'name',
            hasChildren: 'hasChild',
            htmlAttributes: 'url'
        },
        nodeClicked: controlSelect
    }, '#controlTree');
    var controlList = new ej.lists.ListView({
        dataSource: controlSampleData[location.href.split('/')[3]] || controlSampleData.Button,
        fields: { id: 'uid', text: 'name', groupBy: 'order', htmlAttributes: 'data' },
		select: controlSelect,
        template: '<div class="e-text-content e-icon-wrapper"> <span class="e-list-text" role="listitem">${name}' +
        '${if(type)}<span class="e-samplestatus ${type}"></span>${/if}</span>' +
        '${if(directory)}<div class="e-icons e-icon-collapsible"></div>${/if}</div>',
        groupTemplate: '${if(items[0]["category"])}<div class="e-text-content">' +
        '<span class="e-list-text">${items[0].category}</span>' +
        '</div>${/if}',
        actionComplete: setSelectList
    }, '#controlList');
}

function getTreeviewList(list) {
    var id;
    var pid;
    var tempList = [];
    var category = '';
    for (var i = 0; i < list.length; i++) {
        if (category !== list[i].category) {
            category = list[i].category;
            tempList = tempList.concat({ id: i + 1, name: list[i].category, hasChild: true, expanded: true });
            pid = i + 1;
            id = pid;
        }
        id += 1;
        tempList = tempList.concat({
            id: id,
            pid: pid,
            name: list[i].name,
            url: {
                'data-path': '/' + list[i].directory + '/' + list[i].samples[0].url,
                'control-name': list[i].directory,
            }
        });
        controlSampleData[list[i].directory] = getSamples(list[i].samples);
    }
    return tempList;
}

function getSamples(samples) {
    var tempSamples = [];
    for (var i = 0; i < samples.length; i++) {
        tempSamples[i] = samples[i];
        tempSamples[i].data = { 'sample-name': samples[i].url, 'data-path': '/' + samples[i].dir + '/' + samples[i].url };
    }
    return tempSamples;
}

function controlSelect(arg) {
    var path = (arg.node || arg.item).getAttribute('data-path');
    var curHashCollection = '/' + location.href.split('/').slice(3).join('/');
    if (!arg.item || path.split('/')[1] === curHashCollection.split('/')[1]) {
        controlListRefresh(arg.node || arg.item);
    }
    if (path) {
        if (path !== curHashCollection) {
            sampleOverlay();
            var theme = location.hash.split('/')[1] || 'material';
            if (arg.item && ((isMobile && !ej.base.select('.sb-mobile-left-pane').classList.contains('sb-hide')) ||
                ((isTablet || (ej.base.Browser.isDevice && isPc)) && isLeftPaneOpen()))) {
                toggleLeftPane();
            }

            if (arg.data) {
                if (theme == 'material') {
                    location.href = location.origin + '/' + arg.data.component + '/' + arg.data.name;
                }
                else {
                    location.href = location.origin + '/' + arg.data.component + '/' + arg.data.name + '#/' + theme;
                }
            } 
        }
    }
}

function controlListRefresh(ele) {
    var samples = controlSampleData[ele.getAttribute('control-name')];
   // var samples = controlSampleData[location.href.split('/')[3]];
    if (samples) {
        var listView = ej.base.select('#controlList').ej2_instances[0];
        listView.dataSource = samples;
        showHideControlTree();
    }
}

function showHideControlTree() {
    var controlTree = ej.base.select('#controlTree');
    var controlList = ej.base.select('#controlSamples');
    var reverse = ej.base.select('#controlTree').style.display === 'none';
    if (reverse) {
        viewSwitch(controlList, controlTree, reverse);

    } else {
        viewSwitch(controlTree, controlList, reverse);
    }
}

function viewSwitch(from, to, reverse) {
    var anim = new ej.base.Animation({ duration: 500, timingFunction: 'ease' });
    var controlTree = ej.base.select('#controlTree');
    var controlList = ej.base.select('#controlList');
    controlTree.style.overflowY = 'hidden';
    controlList.classList.remove('e-view');
    controlList.classList.remove('sb-control-list-top');
    controlList.classList.add('sb-adjust-juggle');
    to.style.display = '';
    anim.animate(from, {
        name: reverse ? 'SlideRightOut' : 'SlideLeftOut',
        end: function() {
            controlTree.style.overflowY = 'auto';
            from.style.display = 'none';
            controlList.classList.add('e-view');
            controlList.classList.add('sb-control-list-top');
            controlList.classList.remove('sb-adjust-juggle');
        }
    });
    anim.animate(to, { name: reverse ? 'SlideLeftIn' : 'SlideRightIn' });
}

function setSelectList() {
    var hString = window.href || location.href;
    var hash = hString.split('/');
	var list = ej.base.select('#controlList').ej2_instances[0];

	var control = ej.base.select('[control-name="' + hash[3] + '"]');

    if (control) {
        var selectSample = ej.base.select('[sample-name="' + hash.slice(-1)[0] + '"]') || ej.base.select('[sample-name="' + list.localData[0].name + '"]') ||
 ej.base.select('[sample-name="' + location.href.split('/')[3] + '"]');
        if (selectSample) {
            if (ej.base.select('#controlTree').style.display !== 'none') {
                showHideControlTree();
            }
            list.selectItem(selectSample);
        }
    } else {
        showHideControlTree();
        list.selectItem(ej.base.select('[sample-name="line"]'));
    }
}

function toggleButtonState(id, state) {
    var ele = document.getElementById(id);
    var mobileEle = document.getElementById('mobile-' + id);
    ele.disabled = state;
    mobileEle.disabled = state;
    if (state) {
        mobileEle.classList.add('e-disabled');
        ele.classList.add('e-disabled');
    } else {
        mobileEle.classList.remove('e-disabled');
        ele.classList.remove('e-disabled');
    }
}

function setPropertySectionHeight() {
    if (!isTablet && !isMobile) {
        var propertypane = ej.base.select('.property-section');
        var ele = document.querySelector('.control-section');
        if (ele && propertypane) {
            ele.classList.add('sb-property-border');
        } else {
            ele.classList.remove('sb-property-border');
        }
    }
}

function routeDefault() {
    crossroads.addRoute('', function() {
        window.location.href = '#/' + selectedTheme + '/chart/line.html';
        isInitRedirected = true;
    });
    crossroads.bypassed.add(function(request) {
        var hash = request.split('.html')[0].split('/');
        if (samplePath.indexOf(hash.slice(1).join('/')) === -1) {
            location.hash = '#/' + hash[0] + '/' + (defaultSamples[hash[1]] || 'chart/line.html');
            isInitRedirected = true;
        }
    });
}

function destroyControls() {
    var elementlist = ej.base.selectAll('.e-control', document.getElementById('control-content1'));
    for (var i = 0; i < elementlist.length; i++) {
        var control = elementlist[i];
        for (var a = 0; a < control.ej2_instances.length; a++) {
            var instance = control.ej2_instances[a];
            instance.destroy();
        }
    }
}

function loadScriptfile(path) {
    var scriptEle = document.querySelector('script[src="' + path + '"]');
    var doFun;
    var p2 = new Promise(function(resolve, reject) {
        doFun = resolve;
    });
    if (!scriptEle) {
        scriptEle = document.createElement('script');
        scriptEle.setAttribute('type', 'text/javascript');
        scriptEle.setAttribute('src', path);
        scriptEle.onload = doFun;
        if (typeof scriptEle !== 'undefined') {
            document.getElementsByTagName('head')[0].appendChild(scriptEle);
        }
    } else {
        doFun();
    }
    return p2;
}

function getExecFunction(sample) {
    if (execFunction.hasOwnProperty(sample)) {
        return execFunction[sample];
    } else {
        execFunction[sample] = window.default;
        return execFunction[sample];
    }
}

function errorHandler(error) {
  //  document.getElementById('control-content').innerHTML = error ? error : 'Not Available';
   // ej.base.select('#control-content').classList.add('error-content');
    removeOverlay();
}

function plunker(results) {
    var plnkr = JSON.parse(results);
    var prevForm = ej.base.select('#plnkr-form');
    if (prevForm) {
        ej.base.detach(prevForm);
    }
    var form = ej.base.createElement('form');
    form.setAttribute('action', 'http://plnkr.co/edit/?p=preview');
    form.setAttribute('method', 'post');
    form.setAttribute('target', '_blank');
    form.id = 'plnkr-form';
    form.style.display = 'none';
    document.body.appendChild(form);
    var plunks = Object.keys(plnkr);
    for (var x = 0; x < plunks.length; x++) {
        var ip = ej.base.createElement('input');
        ip.setAttribute('type', 'hidden');
        ip.setAttribute('value', plnkr[plunks[x]]);
        ip.setAttribute('name', 'files[' + plunks[x] + ']');
        form.appendChild(ip);
    }
}

function addRoutes(samplesList) {
    var loop1 = function(node) {
        defaultSamples[node.directory] = node.directory + '/' + node.samples[0].url + '.html';
        var dataManager = new ej.data.DataManager(node.samples);
        var samples = dataManager.executeLocal(new ej.data.Query().sortBy('order', 'ascending'));
        var loop2 = function(subNode) {
            var control = node.directory;
            var sample = subNode.url;
            samplePath = samplePath.concat(control + '/' + sample);
            var sampleName = node.name + ' / ' + ((node.name !== subNode.category) ?
                (subNode.category + ' / ') : '') + subNode.name;
            var selectedTheme = location.hash.split('/')[1] ? location.hash.split('/')[1] : 'material';
            var urlString = '/'+ control + '/' + sample ;
            samplesAr.push(urlString);
            if (location.pathname == urlString) {
                var dataSourceLoad = document.getElementById(node.dataSourcePath);
                if (node.dataSourcePath && !dataSourceLoad) {
                    var dataAjax = new ej.base.Ajax(node.dataSourcePath, 'GET', true);
                    dataAjax.send().then(function (result) {
                        var ele = ej.base.createElement('script', { id: node.dataSourcePath, innerHTML: result });
                        document.getElementsByTagName('head')[0].appendChild(ele);
                        onDataSourceLoad(node, subNode, control, sample, sampleName);               
                    });
                }
                else {
                    onDataSourceLoad(node, subNode, control, sample, sampleName);
                }
            }
        };
        for (var i = 0; i < samples.length; i++) {
            var subNode = samples[i];
            loop2(subNode);
        }
    };
    for (var i = 0; i < samplesList.length; i++) {
        var node = samplesList[i];
        loop1(node);
    }
}

//function onDataSourceLoad(node, subNode, control, sample, sampleName) {
//    var controlID = node.uid;
//    var sampleID = subNode.uid;
//    document.getElementById('open-plnkr').disabled = true;
//    var openNew = ej.base.select('#openNew');
//    if (openNew) {
//        openNew.href = location.href.split('#')[0] + 'samples/' + node.directory + '/' + subNode.url + '/index.html';
//    }
//    setSbLink();
//    //var ajaxHTML = new ej.base.Ajax('Button/Default', 'GET', true);
//    //var p1 = ajaxHTML.send();
//    //var p2 = loadScriptfile('src/' + control + '/' + sample + '.js');
//    //var ajaxHTML = new ej.base.Ajax('SourceCodeTab?file=Views/Button/Default.cshtml', 'POST', true);
//    //var p1 = ajaxHTML.send();
//    var ajaxHTML = new ej.base.Ajax('Button/Default', 'GET', true);
//    var p1 = ajaxHTML.send();
//    var ajaxHTML = new ej.base.Ajax('SourceCodeTab?file=Controllers/buttonController.cs', 'POST', true);
//    var p2 = ajaxHTML.send();
//    var ajaxJs = new ej.base.Ajax('src/' + control + '/' + sample + '.js', 'GET', true);
//    sampleNameElement.innerHTML = node.name;
//    sourceTab.selectedItem = 0;
//    contentTab.selectedItem = 0;
//    breadCrumbComponent.innerHTML = node.name;
//    if (node.name !== subNode.category) {
//        breadCrumbSubCategory.innerHTML = subNode.category;
//        breadCrumbSubCategory.style.display = '';
//        breadCrumSeperator.style.display = '';
//    } else {
//        breadCrumbSubCategory.style.display = 'none';
//        breadCrumSeperator.style.display = 'none';
//    }
//    breadCrumbSample.innerHTML = subNode.name;
//    for (var k = 0; k < 2; k++) {
//        var header = getSourceTabHeader(k);
//        if (header) {
//            header.innerHTML = sample + (k ? '.html' : '.js');
//        }
//    }
//    var title = document.querySelector('title');
//    txt = title.innerHTML;
//    num = txt.indexOf('-');
//    if (num !== -1) {
//        txt = txt.slice(0, num + 1);
//        txt += ' ' + node.name + ' > ' + subNode.name;
//    }
//    else {
//        txt += ' - ' + node.name + ' > ' + subNode.name;
//    }
//    title.innerHTML = txt;
//    ajaxJs.send().then(function(value) {
//        document.querySelector('.js-source-content').innerHTML = value.toString().replace(/</g, '&lt;').replace(/\>/g, '&gt;');
//        hljs.highlightBlock(document.querySelector('.js-source-content'));
//    });
//    var plunk = new ej.base.Ajax('src/' + control + '/' + sample + '-plnkr.json', 'GET', true);
//    var p3 = plunk.send();
//    p3.then(function(result) {
//        document.getElementById('open-plnkr').disabled = false;
//        plunker(result);
//    });
//    Promise.all([
//        p1,
//        p2
//    ]).then(function(results) {
//        var htmlString = results[0].toString();
//        destroyControls();
//        currentControlID = controlID;
//        currentSampleID = sampleID;
//        currentControl = node.directory;
//        var curIndex = samplesAr.indexOf(location.hash);
//        var samLength = samplesAr.length - 1;
//        if (curIndex === samLength) {
//            toggleButtonState('next-sample', true);
//        } else {
//            toggleButtonState('next-sample', false);
//        }
//        if (curIndex === 0) {
//            toggleButtonState('prev-sample', true);
//        } else {
//            toggleButtonState('prev-sample', false);
//        }
//        ej.base.select('#control-content').classList.remove('error-content');
//        document.getElementById('control-content').innerHTML = htmlString;
//        var controlEle = document.querySelector('.control-section');
//        var controlString = controlEle.innerHTML;
//        controlEle.innerHTML = '';
//        controlEle.appendChild(ej.base.createElement('div', { className: 'control-wrapper', innerHTML: controlString }));
//        renderPropertyPane('#property');
//        renderDescription();
//        renderActionDescription();
//        var htmlCode = ej.base.createElement('div', { innerHTML: htmlString });
//        var description = htmlCode.querySelector('#description');
//        if (description) {
//            ej.base.detach(description);
//        }
//        var actionDesc = htmlCode.querySelector('#action-description');
//        if (actionDesc) {
//            ej.base.detach(actionDesc);
//        }
//        var htmlCodeSnippet = htmlCode.innerHTML.replace(/&/g, '&amp;')
//            .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//        document.querySelector('.html-source-content').innerHTML = htmlCodeSnippet;
//        hljs.highlightBlock(document.querySelector('.html-source-content'));
//        getExecFunction(control + sample)();
//        window.navigateSample();
//        isExternalNavigation = defaultTree = false;
//        //  checkApiTableDataSource();
//        setPropertySectionHeight();
//        removeOverlay();
//        var mobilePropPane = ej.base.select('.sb-mobile-prop-pane .property-section');
//        if (mobilePropPane) {
//            ej.base.detach(mobilePropPane);
//        }
//        var propPanel = ej.base.select('#control-content .property-section');
//        if (isMobile) {
//            if (propPanel) {
//                ej.base.select('.sb-mobile-setting').classList.remove('sb-hide');
//                ej.base.select('.sb-mobile-prop-pane').appendChild(propPanel);
//            } else {
//                ej.base.select('.sb-mobile-setting').classList.add('sb-hide');
//            }
//        }
//    }).catch(function(reason) {
//        errorHandler(reason.message);
//    });
//}

function onDataSourceLoad(node, subNode, control, sample, sampleName) {
    var controlID = node.uid;
    var sampleID = subNode.uid;
    document.getElementById('open-plnkr').disabled = true;
    var openNew = ej.base.select('#openNew');
    if (openNew) {
        openNew.href = location.href.split('#')[0] + 'Button/Default';
    }
    setSbLink();
    var ajaxHTML = new ej.base.Ajax('/Button/DefaultFunctionalities', 'GET', true);
    var p1 = ajaxHTML.send();
    var ajaxCS = new ej.base.Ajax('/Controllers/' + subNode.component + '/' + subNode.name  + 'Controller.cs', 'GET', true);
    var ajaxCSHTML = new ej.base.Ajax('/Views/' + subNode.component + '/' + subNode.name + '.cshtml', 'GET', true);
        //var p2 = loadScriptfile('src/' + control + '/' + sample + '.js');
        //var ajaxJs = new ej.base.Ajax('src/' + control + '/' + sample + '.js', 'GET', true);
    sampleNameElement.innerHTML = node.name;
    sourceTab.selectedItem = 0;
    contentTab.selectedItem = 0;
    breadCrumbComponent.innerHTML = node.name;
    if (node.name !== subNode.category) {
        breadCrumbSubCategory.innerHTML = subNode.category;
        breadCrumbSubCategory.style.display = '';
        breadCrumSeperator.style.display = '';
    } else {
        breadCrumbSubCategory.style.display = 'none';
        breadCrumSeperator.style.display = 'none';
    }
    if (location.pathname == '/' + subNode.component + '/' + subNode.name) {
        breadCrumbSample.innerHTML = subNode.name;
    }
    for (var k = 0; k < 2; k++) {
        var header = getSourceTabHeader(k);
        if (header) {
            if (location.pathname == '/' + subNode.component + '/' + subNode.name) {
                header.innerHTML = subNode.name + (k ? '.cshtml' : 'Controller.cs');
            }
        }
    }
    var title = document.querySelector('title');
    txt = title.innerHTML;
    num = txt.indexOf('-');
    if (num !== -1) {
        txt = txt.slice(0, num + 1);
        txt += ' ' + node.name + ' > ' + subNode.name;
    }
    else {
        txt += ' - ' + node.name + ' > ' + subNode.name;
    }
    title.innerHTML = txt;
    ajaxCS.send().then(function (value) {
        document.querySelector('.js-source-content').innerHTML = value;
        hljs.highlightBlock(document.querySelector('.js-source-content'));
    });
    ajaxCSHTML.send().then(function (value) {
        document.querySelector('.html-source-content').innerHTML = value;
        hljs.highlightBlock(document.querySelector('.html-source-content'));
    });
    //var plunk = new ej.base.Ajax('src/' + control + '/' + sample + '-plnkr.json', 'GET', true);
    //var p3 = plunk.send();
    //p3.then(function (result) {
    //    document.getElementById('open-plnkr').disabled = false;
    //    plunker(result);
    //});
    Promise.all([
        p1
    ]).then(function (results) {
        var htmlString = results[0].toString();
        //destroyControls();
        currentControlID = controlID;
        currentSampleID = sampleID;
        currentControl = node.directory;
        var curIndex = samplesAr.indexOf(location.pathname);
        var samLength = samplesAr.length - 1;
        if (curIndex === samLength) {
            toggleButtonState('next-sample', true);
        } else {
            toggleButtonState('next-sample', false);
        }
        if (curIndex === 0) {
            toggleButtonState('prev-sample', true);
        } else {
            toggleButtonState('prev-sample', false);
        }
        //ej.base.select('#control-content').classList.remove('error-content');
        //document.getElementById('control-content').innerHTML = htmlString;
        //var controlEle = document.querySelector('.control-section');
        //var controlString = controlEle.innerHTML;
        //controlEle.innerHTML = '';
        //controlEle.appendChild(ej.base.createElement('div', { className: 'control-wrapper', innerHTML: controlString }));
        //renderPropertyPane('#property');
       // renderDescription();
        renderActionDescription();
        var htmlCode = ej.base.createElement('div', { innerHTML: htmlString });
        var description = htmlCode.querySelector('#description');
        if (description) {
            ej.base.detach(description);
        }
        var actionDesc = htmlCode.querySelector('#action-description');
        if (actionDesc) {
            ej.base.detach(actionDesc);
        }
        var htmlCodeSnippet = htmlCode.innerHTML.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        //document.querySelector('.html-source-content').innerHTML = htmlCodeSnippet;
        //hljs.highlightBlock(document.querySelector('.html-source-content'));
        getExecFunction(control + sample)();
        window.navigateSample();
        isExternalNavigation = defaultTree = false;
        //  checkApiTableDataSource();
        setPropertySectionHeight();
        removeOverlay();
        var mobilePropPane = ej.base.select('.sb-mobile-prop-pane .property-section');
        if (mobilePropPane) {
            ej.base.detach(mobilePropPane);
        }
       // var propPanel = ej.base.select('#control-content .property-section');
        if (isMobile) {
            if (propPanel) {
                ej.base.select('.sb-mobile-setting').classList.remove('sb-hide');
                ej.base.select('.sb-mobile-prop-pane').appendChild(propPanel);
            } else {
                ej.base.select('.sb-mobile-setting').classList.add('sb-hide');
            }
        }
    }).catch(function (reason) {
        errorHandler(reason.message);
    });
}
function removeOverlay() {
    document.body.setAttribute('aria-busy', 'false');
    sbContentOverlay.classList.add('sb-hide');
    //sbRightPane.classList.remove('sb-right-pane-overlay');
    //sbHeader.classList.remove('sb-right-pane-overlay');
    mobNavOverlay(false);
    if (!sbBodyOverlay.classList.contains('sb-hide')) {
        sbBodyOverlay.classList.add('sb-hide');
    }
    if (!isMobile) {
        sbRightPane.scrollTop = 0;
    } else {
        sbRightPane.scrollTop = 74;
    }
}

function sampleOverlay() {
    document.body.setAttribute('aria-busy', 'true');
    //sbHeader.classList.add('sb-right-pane-overlay');
    //sbRightPane.classList.add('sb-right-pane-overlay');
    mobNavOverlay(true);
  //  sbContentOverlay.classList.remove('sb-hide');
}

function overlay() {
    sbHeader.classList.add('sb-right-pane-overlay');
    sbBodyOverlay.classList.remove('sb-hide');
}

function mobNavOverlay(isOverlay) {
    if (ej.base.isDevice) {
        var mobileFoorter = ej.base.select('.sb-mobilefooter');
        if (isOverlay) {
            mobileFoorter.classList.add('sb-right-pane-overlay');
        } else {
            mobileFoorter.classList.remove('sb-right-pane-overlay');
        }
    }
}

function checkSampleLength(directory) {
    var data = new ej.data.DataManager(samplesList);
    var controls = data.executeLocal(new ej.data.Query().where('directory', 'equal', directory));
    return controls[0].samples.length > 1;
}

function parseHash(newHash, oldHash) {
    var newTheme = newHash.split('/')[0];
    var control = newHash.split('/')[1];
    if (newTheme !== selectedTheme && themeCollection.indexOf(newTheme) !== -1) {
        location.reload();
        crossroads.parse(newHash);
    }
    /* if (newHash.length && !ej.base.select('#' + control + '-common') && checkSampleLength(control)) {
         var scriptElement = document.createElement('script');
         scriptElement.src = 'src/' + control + '/common.js';
         scriptElement.id = control + '-common';
         scriptElement.type = 'text/javascript';
         scriptElement.onload = function () {
             crossroads.parse(newHash);
         };
         document.getElementsByTagName('head')[0].appendChild(scriptElement);
     }*/

    crossroads.parse(newHash);
}

function getSourceTabHeader(index) {
    return document.querySelectorAll('.sb-source-code-section>.e-tab-header .e-tab-text')[index];
}

function processDeviceDependables() {
    if (ej.base.Browser.isDevice) {
        ej.base.select('.sb-desktop-setting').classList.add('sb-hide');
    } else {
        ej.base.select('.sb-desktop-setting').classList.remove('sb-hide');
    }
}

function checkTabHideStatus() {
    if (!intialLoadCompleted) {
        content.hideTab(1);
        intialLoadCompleted = true;
    }
}

function renderPropertyPane(ele) {
    var contentEle = ej.base.select('#control-content');
    var elem = contentEle.querySelector(ele);
    var title;
    if (!elem) {
        return;
    }
    title = elem.getAttribute('title');
    var parentEle = elem.parentElement;
    elem = ej.base.detach(elem);
    elem.classList.add('property-panel-table');
    var parentPane = ej.base.createElement('div', {
        className: 'property-panel-section',
        innerHTML: "<div class=\"property-panel-header\">" + title + "</div><div class=\"property-panel-content\"></div>"
    });
    parentPane.children[1].appendChild(elem);
    parentEle.appendChild(parentPane);
}

function renderDescription() {
    var header;
    var description = ej.base.select('#description', ej.base.select('#control-content'));
    var descElement = ej.base.select('.description-section');
    var iDescription = ej.base.select('#description', descElement);
    if (iDescription) {
        ej.base.detach(iDescription);
    }
    if (description) {
        descElement.appendChild(description);
    }
}

function renderActionDescription() {
    var aDescription = ej.base.select('#action-description', ej.base.select('#control-content'));
    var aDescElem = ej.base.select('.sb-action-description');
    if (aDescription) {
        aDescElem.innerHTML = '';
        aDescElem.appendChild(aDescription);
        aDescElem.style.display = '';
    } else if (aDescElem) {
        aDescElem.style.display = 'none';
    }
}

function loadJSON() {
    var switchText = localStorage.getItem('ej2-switch') || 'touch';
    if (ej.base.Browser.isDevice || window.screen.width <= 850) {
        switchText = 'touch';
    }
    setLeftPaneHeight();
    if (isMobile) {
        ej.base.select('.sb-left-footer-links').appendChild(ej.base.select('.sb-footer-left'));
        ej.base.select('.sb-mobile-left-pane').appendChild(ej.base.select('.sb-left-pane'));
        leftToggle.classList.remove('toggle-active');
    }
    /**
     * Tab View
     */
    if (isTablet || (ej.base.Browser.isDevice && isPc)) {
        leftToggle.classList.remove('toggle-active');
        ej.base.select('.sb-left-pane').classList.add('sb-hide');
        ej.base.select('.sb-right-pane').classList.add('control-fullview');
    }

    //overlay();
    changeMouseOrTouch(switchText);
    localStorage.removeItem('ej2-switch');
    ej.base.enableRipple(selectedTheme === 'material' || !selectedTheme);
    loadTheme(selectedTheme);
}
loadJSON();