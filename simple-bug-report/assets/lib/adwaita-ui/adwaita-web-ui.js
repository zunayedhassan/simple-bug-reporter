"use strict";

class Utilities {
    static IS_MOUSE_WITHIN_THE_ELEMENT(element, mouseEvent) {
        if ((element === undefined) || (element === null) || (mouseEvent === undefined)) {
            return false;
        }
        
        let x           = mouseEvent.clientX;
        let y           = mouseEvent.clientY;
        let elementMinX = element.getBoundingClientRect().left;
        let elementMinY = element.getBoundingClientRect().top;
        let elementMaxX = elementMinX + element.getBoundingClientRect().width;
        let elementMaxY = elementMinY + element.getBoundingClientRect().height;

        if ((x >= elementMinX) && (x <= elementMaxX) &&
            (y >= elementMinY) && (y <= elementMaxY)) {

            return true;

        }
        
        return false;
    }
    
    static GET_RANDOM_INTEGER_WITHIN_RANGE(min, max) {
        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
    
    static GET_UNIQUE_ID() {
        function _getUID() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return _getUID() + _getUID() + '-' + _getUID() + '-' + _getUID() + '-' + _getUID() + '-' + _getUID() + _getUID() + _getUID();
    }
}

class Drag {
    constructor(dragSourceElement, onDragStarted, onDragMoved, onDragDone) {
        this.OnDragStarted      = onDragStarted;
        this.OnDragMoved        = onDragMoved;
        this.OnDragDone         = onDragDone;
        
        let _dragSourceElement  = dragSourceElement;
        let _isClicked          = false;
        let _previousX          = null;
        let _previousY          = null;
        
        // Overload your method here
        document.querySelector("body").addEventListener("mousedown", event => {
            if (_dragSourceElement !== undefined) {
                _isClicked = Utilities.IS_MOUSE_WITHIN_THE_ELEMENT(_dragSourceElement, event);

                if (_isClicked) {
                    if (this.OnDragStarted !== null) {
                        this.OnDragStarted(event, _previousX, _previousY);
                    }

                    _previousX = event.clientX;
                    _previousY = event.clientY;
                }
            }
        });
        
        document.querySelector("body").addEventListener("mousemove", event => {
            if (_dragSourceElement !== undefined) {
                if (_isClicked) {
                    if (this.OnDragMoved !== null) {
                        this.OnDragMoved(event, _previousX, _previousY);
                    }

                    _previousX = event.clientX;
                    _previousY = event.clientY;
                }
            }
        });
        
        document.querySelector("body").addEventListener("mouseup", event => {
            if (_dragSourceElement !== undefined) {
                if (this.OnDragDone !== null) {
                    this.OnDragDone(event, _previousX, _previousY);
                }

                _clear();
            }
        });
        
        let _clear = function() {
            _isClicked      = false;
            _previousX      = null;
            _previousY      = null;
        };
    }
}

class AdwaitaUI {
    constructor() {
        this.MaxTitledPaneHeight = 256;
        
        /* Toggle Button */
        this.InitializeToggleButtons = function() {
            let toggleButtons = document.querySelectorAll(".aiom-adwaita-ui-toggle-button");

            toggleButtons.forEach((toggleButton, index) => {
                this.InitializeToggleButtonEvent(toggleButton);
            });
        };
        
        this.InitializeToggleButtonEvent = function(toggleButton) {
            toggleButton.addEventListener("click", event => {
                if (event.target.getAttribute("data-checked") === "true") {
                    event.target.setAttribute("data-checked", "false");
                }
                else {
                    event.target.setAttribute("data-checked", "true");
                }
            });
        };
        
        /* Number Spinner */
        this.InitializeSpinners = function() {
            let spinnerStepDownButtons = document.querySelectorAll(".aiom-adwaita-ui-spinner-step-down");
            
            spinnerStepDownButtons.forEach((spinnerDownButton, index) => {
                this.InitializeSpinnerStepDownButtonEvent(spinnerDownButton);
            });
            
            let spinnerStepUpButtons   = document.querySelectorAll(".aiom-adwaita-ui-spinner-step-up");
            
            spinnerStepUpButtons.forEach((spinnerUpButton, index) => {
                this.InitializeSpinnerStepUpButtonEvent(spinnerUpButton);
            });
        };
        
        this.InitializeSpinnerStepDownButtonEvent = function(spinnerDownButton) {
            spinnerDownButton.addEventListener("click", event => {
                let textBox = event.target.parentNode.querySelector("input");
                let value = parseInt(textBox.getAttribute("value")) - 1;

                textBox.setAttribute("value", value);
            });
        };
        
        this.InitializeSpinnerStepUpButtonEvent = function(spinnerUpButton) {
            spinnerUpButton.addEventListener("click", event => {
                let textBox = event.target.parentNode.querySelector("input");
                let value = parseInt(textBox.getAttribute("value")) + 1;

                textBox.setAttribute("value", value);
            });
        };
        
        /* Accordion, Titled Pane */
        this.InitializeAccodions = function() {
            let titledPaneHeaders = document.querySelectorAll(".aiom-adwaita-ui-titled-pane-title");
            
            titledPaneHeaders.forEach((titledPaneHeader, index) => {
                this.InitializeTitledPaneEvents(titledPaneHeader);
            });
            
            let titledPanes = document.querySelectorAll(".aiom-adwaita-ui-titled-pane");
            
            titledPanes.forEach((titledPane, index) => {
                let isCollapsed = titledPane.getAttribute("data-collapse");
                let contentNode = titledPane.querySelector(".aiom-adwaita-ui-titled-pane-contents");
                
                if (isCollapsed === "true") {
                    this.SetTitledPaneCollapse(contentNode);
                }
                else {
                    this.SetTitledPaneExpand(contentNode);
                }
            });
        };
        
        this.InitializeTitledPaneEvents = function(titledPaneHeader) {
            titledPaneHeader.addEventListener("click", event => {
                let titledPane  = titledPaneHeader.parentNode;
                let isCollpased = titledPane.getAttribute("data-collapse");
                let contentNode = titledPane.querySelector(".aiom-adwaita-ui-titled-pane-contents");

                if (contentNode === undefined) {
                    contentNode = titledPaneHeader.parentNode.parentNode.querySelector(".aiom-adwaita-ui-titled-pane-contents");
                }

                if (isCollpased === "true") {
                    titledPane.setAttribute("data-collapse", "false");
                    this.SetTitledPaneExpand(contentNode);
                }
                else {
                    titledPane.setAttribute("data-collapse", "true");
                    this.SetTitledPaneCollapse(contentNode);
                }
            });
        };
        
        this.SetTitledPaneCollapse = function(contentNode) {
            contentNode.style.height = "0px";
        };
        
        this.SetTitledPaneExpand = function(contentNode) {
            contentNode.style.height = this.MaxTitledPaneHeight + "px";
        };
        
        /* Tab */
        /* Tab: Top */
        this.InitializeTopTabs = function() {
            let tabPanes = document.querySelectorAll(".aiom-adwaita-ui-tabpane");
            
            tabPanes.forEach((tabPane, index) => {
                this.InitializeTopTab(tabPane, true);
            });
        };
        
        this.InitializeTopTab = function(tabPane, isInitializeEvent) {
            let selectedTab = tabPane.querySelector(".aiom-adwaita-ui-tab[data-selected='true']");
            
            if (selectedTab !== undefined) {
                let selectedTabId = selectedTab.querySelector("a").getAttribute("href");
                let tabContents   = tabPane.querySelectorAll(".aiom-adwaita-ui-tab-content");
                
                tabContents.forEach((tabContent, index) => {
                    tabContent.style.opacity = 0;
                });
                
                document.querySelector(selectedTabId).style.opacity = 1;
            }
            
            if (isInitializeEvent) {
                let tabLinks = tabPane.querySelectorAll(".aiom-adwaita-ui-tab a");
            
                tabLinks.forEach((tab, index) => {
                    this.InitializeTopTabEvent(tab, tabPane);
                });
            }
        };
        
        this.InitializeTopTabEvent = function(tab, tabPane) {
            tab.addEventListener("click", event => {
                let allTabs = tabPane.querySelectorAll(".aiom-adwaita-ui-tab");
                
                allTabs.forEach((currentTab, index) => {
                    currentTab.setAttribute("data-selected", "false");
                });
                
                let tabParent = tab.parentNode;
                tabParent.setAttribute("data-selected", "true");
                
                this.InitializeTopTab(tabPane, false);
                
                event.preventDefault();
            });
        };
        
        /* Tab: Bottom */
        this.InitializeBottomTabs = function() {
            let tabPanes = document.querySelectorAll(".aiom-adwaita-ui-tabpane-bottom");
            
            tabPanes.forEach((tabPane, index) => {
                this.InitializeBottomTab(tabPane, true);
            });
        };

        this.InitializeBottomTab = function(tabPane, isInitializeEvent) {
            let selectedTab = tabPane.querySelector(".aiom-adwaita-ui-tab-bottom[data-selected='true']");
            
            if (selectedTab !== undefined) {
                let selectedTabId = selectedTab.querySelector("a").getAttribute("href");
                let tabContents   = tabPane.querySelectorAll(".aiom-adwaita-ui-tab-content-bottom");
                
                tabContents.forEach((tabContent, index) => {
                    tabContent.style.opacity = 0;
                });
                
                document.querySelector(selectedTabId).style.opacity = 1;
            }
            
            if (isInitializeEvent) {
                let tabLinks = tabPane.querySelectorAll(".aiom-adwaita-ui-tab-bottom a");
            
                tabLinks.forEach((tab, index) => {
                    this.InitializeBottomTabEvent(tab, tabPane);
                });
            }
        };
        
        this.InitializeBottomTabEvent = function(tab, tabPane) {
            tab.addEventListener("click", event => {
                let allTabs = tabPane.querySelectorAll(".aiom-adwaita-ui-tab-bottom");
                
                allTabs.forEach((currentTab, index) => {
                    currentTab.setAttribute("data-selected", "false");
                });
                
                let tabParent = tab.parentNode;
                tabParent.setAttribute("data-selected", "true");
                
                this.InitializeBottomTab(tabPane, false);
                
                event.preventDefault();
            });
        };
        
        /* Sliders */
        this.InitializeSliders = function() {
            let sliders = document.querySelectorAll(".aiom-adwaita-ui-slider");
            
            sliders.forEach((slider, index) => {
                this.InitializeSlider(slider);
            });
        };
        
        this.SetSliderValue = function(slider, value) {
            if (value < 0) {
                value = 0;
            }
            else if (value > 100) {
                value = 100;
            }
            
            let sliderValueIndicator         = slider.querySelector(".aiom-adwaita-ui-slider-value-indicator");
            let sliderWidth                  = slider.getBoundingClientRect().width;
            let sliderValueWidth             = ((value / 100.0) * sliderWidth);
            
            sliderValueIndicator.style.width = sliderValueWidth + "px";
            
            let sliderThumb                  = slider.querySelector(".aiom-adwaita-ui-slider-thumb");
            let sliderThumbWidth             = sliderThumb.getBoundingClientRect().width;
            let thumbPosition                = (sliderValueWidth - (sliderThumbWidth / 2.0));
            
            if (thumbPosition < 0) {
                thumbPosition = 0;
            }
            
            sliderThumb.style.left           = thumbPosition + "px";
            
            slider.setAttribute("title", parseInt(value) + "%");
        };
        
        this.InitializeSliderEvent = function(slider) {
            slider.addEventListener("click", event => {
                let value = (100.0 / slider.getBoundingClientRect().width) * (event.clientX - slider.getBoundingClientRect().left);
                this.SetSliderValue(slider, value);
            });
        };
        
        this.InitializeSlider = function(slider) {
            let sliderValue                  = slider.querySelector(".aiom-adwaita-ui-slider-value");
            let value                        = parseFloat(sliderValue.value);
            
            this.SetSliderValue(slider, value);
            this.InitializeSliderEvent(slider);
            
            let sliderThumb = slider.querySelector(".aiom-adwaita-ui-slider-thumb");
            
            let dragEvent = new Drag(sliderThumb, null, (event, previousX, previousY) => {
                let value = (100.0 / slider.getBoundingClientRect().width) * (event.clientX - slider.getBoundingClientRect().left);
                this.SetSliderValue(slider, value);

            }, null);
        };
        
        /* Progress Bars */
        this.InitializeProgressBar = function(progressBar) {
            let progressValueElement         = document.querySelector(".aiom-adwaita-ui-progress-value");
            let value                        = parseFloat(progressValueElement.value);
            
            this.SetProgressBarValue(progressBar, value);
        };
        
        this.SetProgressBarValue = function(progressBar, value) {
            let progressBarWidth             = progressBar.getBoundingClientRect().width;
            let progressLength               = progressBarWidth * (value / 100.0);
            let progressBarIndicator         = progressBar.querySelector(".aiom-adwaita-ui-progress-value-indicator");
            
            progressBarIndicator.style.width = progressLength + "px";
            
            progressBar.setAttribute("title", value + "%");
        };
        
        this.IniatlizeProgressBars = function() {
            let progressBars = document.querySelectorAll(".aiom-adwaita-ui-progress");
            
            progressBars.forEach((progressBar, index) => {
                this.InitializeProgressBar(progressBar);
            });
        };
        
        /* Table */
        this.InitializeTable = function(table) {
            let rows = table.querySelectorAll("tbody tr");
            
            rows.forEach((row, index) => {
                row.addEventListener("click", event => {
                    rows.forEach((currentRow, i) => {
                        if (currentRow.classList.contains("aiom-adwaita-ui-table-row-selected")) {
                            currentRow.classList.remove("aiom-adwaita-ui-table-row-selected");
                        }
                    });
                    
                    let selectedRow = event.target.parentNode;
                    selectedRow.classList.add("aiom-adwaita-ui-table-row-selected");
                });
            });
        };
        
        this.InitializeTables = function() {
            let tables = document.querySelectorAll(".aiom-adwaita-ui-table");
            
            tables.forEach((table, index) => {
                this.InitializeTable(table);
            });
        };
        
        /* Treeview */
        this.SetTreeViewItemCollapsed = function(item, isCollapsed) {
            let contents = item.parentNode.querySelector(".aiom-adwaita-ui-tree-root-contents");
            
            if (isCollapsed) {
                item.setAttribute("data-isCollpased", "false");
                contents.style.height = 0 + "px";
            }
            else {
                item.setAttribute("data-isCollpased", "true");
                contents.style.height = 128 + "%";
            }
        };
        
        this.InitializeTreeView = function(tree) {
            let isCollapsed = (tree.getAttribute("data-isCollpased") === "true") ? true : false;
            this.SetTreeViewItemCollapsed(tree, isCollapsed);
        };
        
        this.InitializeTreeViewEvent = function(tree) {
            tree.addEventListener("click", event => {
                this.InitializeTreeView(tree);

                event.preventDefault();
            });
        };
        
        this.InitializeTrees = function() {
            let trees = document.querySelectorAll(".aiom-adwaita-ui-tree-root");
            
            trees.forEach((tree, index) => {
                this.InitializeTreeView(tree);
                this.InitializeTreeViewEvent(tree);
            });
        };
        
        /* Context Menu */
        this.InitializeContextMenuEvent = function(contextMenuParent) {
            contextMenuParent.addEventListener("contextmenu", event => {
                let contextMenu = contextMenuParent.querySelector(".aiom-adwaita-ui-context-menu");

                contextMenu.style.display = "inline-block";
                contextMenu.style.left    = event.pageX + "px";
                contextMenu.style.top     = (event.pageY - 16) + "px";

                event.preventDefault();
            });
        };
        
        this.InitializeContextMenus = function() {
            let contextMenuParents = document.querySelectorAll(".aiom-adwaita-ui-context-menu-parent");
            
            contextMenuParents.forEach((contextMenuParent, index) => {
                this.InitializeContextMenuEvent(contextMenuParent);
            });
            
            document.querySelector("body").addEventListener("click", event => {
                let contextMenus = document.querySelectorAll(".aiom-adwaita-ui-context-menu");
                
                contextMenus.forEach((contextMenu, index) => {
                    contextMenu.style.display = "none";
                });
            });
        };
        
        /* Combo Box */
        this.HideComboBoxList = function(comboBoxeList) {
            comboBoxeList.style.display = "none";
        };
        
        this.HideAllComboBoxList = function() {
            // Hide all comboboxs list
            let comboBoxeLists = document.querySelectorAll(".aiom-adwaita-ui-combobox-list");

            comboBoxeLists.forEach((comboBoxeList, event) => {
                this.HideComboBoxList(comboBoxeList);
            });
        };
        
        this.InitializeComboBoxEvent = function(comboBox) {
            let isClickedOnListItem = false;
            
            comboBox.addEventListener("click", event => {
                this.HideAllComboBoxList();
                
                // Show current combobox list
                if (!isClickedOnListItem) {
                    comboBox.querySelector(".aiom-adwaita-ui-combobox-list").style.display = "inline-block";
                }
                
                isClickedOnListItem = false;
                
                event.preventDefault();
            });
            
            let items = comboBox.querySelectorAll(".aiom-adwaita-ui-combobox-list > li");
            
            items.forEach((item, index) => {
                item.addEventListener("click", event => {
                    let label        = comboBox.querySelector(".aiom-adwaita-ui-combobox-value");
                    let selectedItem = item.innerHTML;                    
                    
                    items.forEach((currentItem, j) => {
                        currentItem.setAttribute("data-selected", false);
                    });
                    
                    item.setAttribute("data-selected", true);
                    label.innerHTML = selectedItem;
            
                    this.HideAllComboBoxList();
                    
                    isClickedOnListItem = true;
                    
                    event.preventDefault();
                });
            });
        };
        
        this.InitializeComboBox = function(comboBox) {
            let selectedItemContent = null;
            let list                = comboBox.querySelectorAll(".aiom-adwaita-ui-combobox-list > li");

            for (let i = 0; i < list.length; i++) {
                let item = list[i];

                if (item.getAttribute("data-selected") !== undefined) {
                    let isSelected = item.getAttribute("data-selected");

                    if (isSelected) {
                        selectedItemContent = item.innerHTML;
                        break;
                    }
                }
            }

            if (selectedItemContent !== null) {
                let label = comboBox.querySelector(".aiom-adwaita-ui-combobox-value");
                label.innerHTML = selectedItemContent;
            }
            
            this.InitializeComboBoxEvent(comboBox);
        };
        
        this.InitializesComboBoxes = function() {
            let comboBoxes = document.querySelectorAll(".aiom-adwaita-ui-combobox");
            
            comboBoxes.forEach((comboBox, i) => {
                this.InitializeComboBox(comboBox);
            });
            
            document.querySelector("body").addEventListener("click", event => {
                comboBoxes.forEach((comboBox, i) => {
                    if (!Utilities.IS_MOUSE_WITHIN_THE_ELEMENT(comboBox, event)) {
                        this.HideComboBoxList(comboBox.querySelector(".aiom-adwaita-ui-combobox-list"));;
                    }
                });
            });
        };
        
        /* Tooltip */
        const tooltipDelay = 1500;
        var intervalMethod  = null;
        
        this.ShowTooltip = function(tooltip, event) {
            const dispositionX = 16;
            const dispositionY = 16;
            
            intervalMethod = setInterval(function() {
                    if (tooltip.style.display === "none") {
                        tooltip.style.display = "inline-block";
                        tooltip.style.position = "absolute";
                        tooltip.style.left = (event.pageX + dispositionX) + "px";
                        tooltip.style.top  = (event.pageY + dispositionY) + "px";
                        tooltip.style.opacity = 1;
                    }
                },

                tooltipDelay);
        };
        
        this.HideTooltip = function(tooltip) {
            if (intervalMethod !== null) {
                clearInterval(intervalMethod);
            }
            
            if (tooltip.style.display !== "none") {
                tooltip.style.opacity = 0;
                tooltip.style.display = "none";
            }
        };
        
        this.InitializeToolTipEvent = function(tooltipParent, tooltip) {
            tooltipParent.addEventListener("mouseenter", event => {
                this.HideTooltip(tooltip);
                this.ShowTooltip(tooltip, event);
            });
            
            tooltipParent.addEventListener("mousemove", event => {
                this.HideTooltip(tooltip);
                this.ShowTooltip(tooltip, event);
            });
            
            tooltipParent.addEventListener("mouseleave", event => {
                this.HideTooltip(tooltip);
            });
        };
        
        this.InitializeTooltip = function(tooltipParent) {
            let   tooltip         = tooltipParent.querySelector(".aiom-adwaita-ui-tooltip");
            
            this.InitializeToolTipEvent(tooltipParent, tooltip);
        };
        
        this.InitializeToolTips = function() {
            let toolTipParents = document.querySelectorAll(".aiom-adwaita-ui-tooltip-parent");
            
            toolTipParents.forEach((tooltipParent, index) => {
                this.InitializeTooltip(tooltipParent);
            });
        };
        
        /* SplitPane (Vertical) */
        this.InitializeVerticalSplitPaneEvent = function(splitPane) {
            let handle = splitPane.querySelector(".aiom-adwaita-ui-splitpane-vertical-handle");
            
            let drag = new Drag(
                    handle,
                    null,
                    (event, previousX, previousY) => {    
                        let parent          = document.querySelector("#" + splitPane.getAttribute("data-parent"));
                        
                        if ((parent === null) || (parent === undefined)) {
                            parent = splitPane;
                        }
                        
                        let mousePositionY  = (event.pageY - parent.offsetTop);
                        let splitPaneHeight = splitPane.getBoundingClientRect().height;
                        let splitValue      = ((1.0 / splitPaneHeight) * mousePositionY);
                        
                        handle.setAttribute("data-split",  splitValue);

                        this.InitializeVerticalSplitPane(splitPane, false);
                        
                        event.preventDefault();
                    },
                    null
            );
        };
        
        this.InitializeVerticalSplitPane = function(splitPane, isInitializeEvent) {
            let handle                  = splitPane.querySelector(".aiom-adwaita-ui-splitpane-vertical-handle");
            let splitValue              = parseFloat(handle.getAttribute("data-split"));
            
            if (splitValue < 0) {
                splitValue = 0.0;
            }
            else if (splitValue > 1.0) {
                splitValue = 1.0;
            }
            
            let splitPaneTotalHeight    = splitPane.getBoundingClientRect().height;
            let topContent              = splitPane.querySelector(".aiom-adwaita-ui-splitpane-vertical-top-content");
            let bottomContent           = splitPane.querySelector(".aiom-adwaita-ui-splitpane-vertical-bottom-content");
            let height                  = (splitPaneTotalHeight * splitValue);
            let handleHeight            = handle.getBoundingClientRect().height;
            
            topContent.style.height     = height + "px";
            topContent.style.top        = "0px";
            topContent.style.left       = "0px";
            
            bottomContent.style.height  = (splitPaneTotalHeight - height) + "px";
            bottomContent.style.top     = height + "px";
            bottomContent.style.left    = "0px";
            
            handle.style.top            = (height - (handleHeight / 2.0)) + "px";
            
            if ((isInitializeEvent !== null) && isInitializeEvent) {
                this.InitializeVerticalSplitPaneEvent(splitPane);
            }
        };
        
        this.InitializeVerticalSplitPanes = function() {
            let splitPanes = document.querySelectorAll(".aiom-adwaita-ui-splitpane-vertical");
            
            splitPanes.forEach((splitPane, index) => {
                this.InitializeVerticalSplitPane(splitPane, true);
            });
        };
        
        /* SplitPane (Horizontal) */
        this.InitializeHorizontalSplitPaneEvent = function(splitPane) {
            let handle = splitPane.querySelector(".aiom-adwaita-ui-splitpane-horizontal-handle");

            let drag = new Drag(
                    handle,
                    null,
                    (event, previousX, previousY) => {    
                        let parent          = document.querySelector("#" + splitPane.getAttribute("data-parent"));
                        
                        if ((parent === null) || (parent === undefined)) {
                            parent = splitPane;
                        }
                        
                        let mousePositionX  = (event.pageX - parent.offsetLeft);
                        let splitPaneWidth  = splitPane.getBoundingClientRect().width;
                        let splitValue      = ((1.0 / splitPaneWidth) * mousePositionX);

                        handle.setAttribute("data-split",  splitValue);

                        this.InitializeHorizontalSplitPane(splitPane, false);

                        event.preventDefault();
                    },
                    null
            );
        };
        
        this.InitializeHorizontalSplitPane = function(splitPane, isInitializeEvent) {
            let handle                  = splitPane.querySelector(".aiom-adwaita-ui-splitpane-horizontal-handle");
            let splitValue              = parseFloat(handle.getAttribute("data-split"));
            
            if (splitValue < 0) {
                splitValue = 0.0;
            }
            else if (splitValue > 1.0) {
                splitValue = 1.0;
            }
            
            let splitPaneTotalWidth     = splitPane.getBoundingClientRect().width;
            let leftContent             = splitPane.querySelector(".aiom-adwaita-ui-splitpane-horizontal-left-content");
            let rightContent            = splitPane.querySelector(".aiom-adwaita-ui-splitpane-horizontal-right-content");
            let width                   = (splitPaneTotalWidth * splitValue);
            let handleWidth             = handle.getBoundingClientRect().width;
            
            leftContent.style.width     = width + "px";
            leftContent.style.top       = "0px";
            leftContent.style.left      = "0px";
            
            rightContent.style.width    = (splitPaneTotalWidth - width) + "px";
            rightContent.style.top      = "0px";
            rightContent.style.left     = width + "px";
            
            handle.style.left           = (width - (handleWidth / 2.0)) + "px";
            
            if ((isInitializeEvent !== null) && isInitializeEvent) {
                this.InitializeHorizontalSplitPaneEvent(splitPane);
            }
        };
        
        this.InitializeHorizontalSplitPanes = function() {
            let splitPanes = document.querySelectorAll(".aiom-adwaita-ui-splitpane-horizontal");

            splitPanes.forEach((splitPane, index) => {
                this.InitializeHorizontalSplitPane(splitPane, true);
            });
        };
        
        /* Dialog Message */
        this.ShowDialog = function(dialog) {
            dialog.style.display = "inline-block";
            
            let positionX        = (window.scrollX + ((window.innerWidth - dialog.getBoundingClientRect().width) / 2.0));
            let positionY        = (window.scrollY + ((window.innerHeight - dialog.getBoundingClientRect().height) / 2.0));
                
            dialog.style.left    = positionX + "px";
            dialog.style.top     = positionY + "px";
        };
        
        this.CloseDialog = function(dialog) {
            dialog.style.display = "none";
        };
        
        this.InitializeDialog = function(dialog) {
            let titleBar = dialog.querySelector(".aiom-adwaita-ui-dialog-title-bar");
            
            let drag = new Drag(
                    titleBar,
                    null,
                    (event, previousX, previousY) => {
                        let diffX = event.pageX - previousX;
                        let diffY = event.pageY - previousY;
                        
                        let positionX = dialog.getBoundingClientRect().left + diffX;
                        let positionY = dialog.getBoundingClientRect().top + diffY;
                        
                        dialog.style.left    = positionX + "px";
                        dialog.style.top     = positionY + "px";
                    },
                    null
            );
    
            let closeButton = dialog.querySelector(".aiom-adwaita-ui-dialog-close");
            
            closeButton.addEventListener("click", event => {
                this.CloseDialog(dialog);
                
                event.preventDefault();
            });
        };
        
        this.InitializeDialogs = function() {
            let dialogs = document.querySelectorAll(".aiom-adwaita-ui-dialog");
            
            dialogs.forEach((dialog, index) => {
                this.InitializeDialog(dialog);
            });
        };
        
        /* Color Chooser */
        this.GetSelectedColor = function(colorChooser) {
            let selectedColor = colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-value").getAttribute("value");
            
            return selectedColor;
        };
        
        this.SetColorOnColorChooser = function(colorChooser, color) {
            colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-value").setAttribute("value", color);
        };
        
        this.InitializeEventOnCustomColorPellet = function(colorChooser, colorPellet) {
            colorPellet.addEventListener("click", event => {
                let colorPellets = colorChooser.querySelectorAll(".aiom-adwaita-ui-color-chooser-predefined-color");
                
                colorPellets.forEach((currentColorPellet, i) => {
                    currentColorPellet.style.borderColor = "#e7e7e6";
                    currentColorPellet.setAttribute("data-selected", "false");
                });
                
                colorPellet.style.borderColor = "#6495ED";
                colorPellet.setAttribute("data-selected", "true");
                
                let color = colorPellet.getAttribute("data-value");
                colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-value").setAttribute("value", color);
                
                colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-input rect").setAttribute("fill", color);
                
                event.preventDefault();
            });
        };
        
        this.GetNewlyCreatedCustomColorPellet = function(colorChooser, color) {
            let span = document.createElement("span");
            span.classList.add("aiom-adwaita-ui-color-chooser-predefined-color");
            span.setAttribute("data-selected", "false");
            span.setAttribute("data-value", color);
            span.style.background = color;
            
            this.InitializeEventOnCustomColorPellet(colorChooser, span);
            
            return span;
        };
        
        this.SetSelectColorPellet = function(colorChooser, selectedColorPellet) {
            let colorPellets = colorChooser.querySelectorAll(".aiom-adwaita-ui-color-chooser-predefined-color");
            
            colorPellets.forEach((currentColorPellet, i) => {
                currentColorPellet.style.borderColor = "#e7e7e6";
                currentColorPellet.setAttribute("data-selected", "false");
            });

            selectedColorPellet.style.borderColor = "#6495ED";
            selectedColorPellet.setAttribute("data-selected", "true");
            
            colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-input rect").setAttribute("fill", selectedColorPellet.getAttribute("data-value"));
        };
        
        this.InitializeColorChooser = function(colorChooser) {
            let customColorsAttribute = colorChooser.getAttribute("data-custom-colors");
            let customColors          = new Array();

            if (!((customColorsAttribute === "") || (customColorsAttribute === undefined) || (customColorsAttribute === null))) {
                let colors = customColorsAttribute.split(";");
                customColors = colors;

                let customColorsPane = colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-custom-colors-pane");

                customColors.forEach((color, j) => {
                    customColorsPane.append(this.GetNewlyCreatedCustomColorPellet(colorChooser, color));
                });
            }


            let colorPellets = colorChooser.querySelectorAll(".aiom-adwaita-ui-color-chooser-predefined-color");

            colorPellets.forEach((colorPellet, j) => {
                this.InitializeEventOnCustomColorPellet(colorChooser, colorPellet);

                let color = colorPellet.getAttribute("data-value");
                colorPellet.style.background = color;
            });


            let closeButton = colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-header-button");

            closeButton.addEventListener("click", event => {
                let dialog = colorChooser.querySelector(".aiom-adwaita-ui-dialog");
                this.CloseDialog(dialog);

                event.preventDefault();
            });


            let customColorChooserDialog = colorChooser.querySelector("input[type='color']");
            let customColorChooserButton = colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-custom-color");

            customColorChooserButton.addEventListener("click", event => {
                customColorChooserDialog.value = this.GetSelectedColor(colorChooser);
                customColorChooserDialog.click();
            });

            customColorChooserDialog.addEventListener("input", event => {
                let selectedColor = event.target.value;
                this.SetColorOnColorChooser(colorChooser, selectedColor);

                let customColorsAttribute = colorChooser.getAttribute("data-custom-colors");
                let isAddNewPellete = true;

                if ((customColorsAttribute !== "") || (customColorsAttribute !== undefined) || (customColorsAttribute !== null)) {
                    let customColors = customColorsAttribute.split(";");

                    if (customColors.length > 7) {
                        isAddNewPellete = false;
                    }
                }

                let selectedColorPellet = null;
                let customColorsPane = colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-custom-colors-pane");

                if (isAddNewPellete) {
                    selectedColorPellet = this.GetNewlyCreatedCustomColorPellet(colorChooser, selectedColor);
                    customColorsPane.appendChild(selectedColorPellet);
                    colorChooser.setAttribute("data-custom-colors", customColorsAttribute + ";" + selectedColor);
                    customColors.push(selectedColor);
                }
                else {
                    customColors[0] = selectedColor;

                    let currentColorAttribute = "";

                    customColors.forEach((customColor, j) => {
                        if (j === customColors.length - 1) {
                            currentColorAttribute += customColor;
                        }
                        else {
                            currentColorAttribute += customColor + ";";
                        }
                    });

                    colorChooser.setAttribute("data-custom-colors", currentColorAttribute);

                    let allColorPellets = customColorsPane.querySelectorAll(".aiom-adwaita-ui-color-chooser-predefined-color");

                    selectedColorPellet = allColorPellets[0];
                    selectedColorPellet.setAttribute("data-selected", "false");
                    selectedColorPellet.setAttribute("data-value", selectedColor);
                    selectedColorPellet.style.background = selectedColor;
                }

                this.SetSelectColorPellet(colorChooser, selectedColorPellet);
            });

            let button = colorChooser.querySelector(".aiom-adwaita-ui-color-chooser-input");

            button.addEventListener("click", event => {
                let dialog = colorChooser.querySelector(".aiom-adwaita-ui-dialog");

                this.ShowDialog(dialog);
            });
        };
        
        this.InitializeColorChoosers = function() {
            let colorChoosers = document.querySelectorAll(".aiom-adwaita-ui-color-chooser");
            
            colorChoosers.forEach((colorChooser, i) => {
                this.InitializeColorChooser(colorChooser);
            });
        };
    }
    
    InitializeAdwaitaUI() {
        this.InitializeToggleButtons();
        this.InitializeSpinners();
        this.InitializeAccodions();
        this.InitializeTopTabs();
        this.InitializeBottomTabs();
        this.InitializeSliders();
        this.IniatlizeProgressBars();
        this.InitializeTables();
        this.InitializeTrees();
        this.InitializeContextMenus();
        this.InitializesComboBoxes();
        this.InitializeToolTips();
        this.InitializeVerticalSplitPanes();
        this.InitializeHorizontalSplitPanes();
        this.InitializeDialogs();
        this.InitializeColorChoosers();
    }
}