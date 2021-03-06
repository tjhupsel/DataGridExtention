mxui.dom.addCss(require.toUrl("DataGridExtension/widget/ui/DataGridExtension.css"));

require(["DataGridExtension/widget/PagingButtons", "DataGridExtension/widget/EmptyTable", "DataGridExtension/widget/ToolbarButtons", "DataGridExtension/widget/RowClasses", "DataGridExtension/widget/InlineButtons", "DataGridExtension/widget/FlexColumns", "dojo/text!DataGridExtension/widget/ui/DataGridExtension.html"],
    function(Paging, EmptyTable, ToolbarButtons, RowClasses, InlineButtons, FlexColumns, template) {
        "user strict";
        var widget = {
            mixins: [Paging, EmptyTable, ToolbarButtons, RowClasses, InlineButtons, FlexColumns, dijit._TemplatedMixin],

            templateString: template,

            inputargs: {
                // All parameters are defined in the mixed in objects
            },

            grid: null,

            // version: 2.4
            // Date: 28 Oct 2014
            // Author:  Andries Smit
            // Company: Flock of Birds
            // 
            // ISSUES:        
            // When new column are shown, the order of the column is not stored as it is displayed
            // 
            // TODO:
            // Check other error cases
            // 
            // FUTURE:   
            // Test other browser versions
            // Distribute width over all columns after column is added/removed in the modeller.
            // Add responsive columns support in flex header feature.
            // Make flex header compatible with Widht unit = Pixels .
            // review the usage of gridAttributesStore variable
            // Row class text to css class conversion should remove leading digits too
            // Disable move when there is only one column left.
            // Allow multiple inlinebuttons in one column
            // Add further support for Template Grid ( hide un-usable buttons )        // 
            // 
            // RESOLVED:
            // DONE test across browsers. Safari 5.1.7 Chrome 33, IE 11,(emulate 10, 9 ok, 8fails), FF 27 ok, FF3.6 fails 
            // FIXED Display Names are not updated when changed in modeller
            // FIXED Reset will not reset the sort order
            // DONE Added App store Empty table gird functions
            // DONE hide buttons that need selected rows in case that there is no row selected
            // DONE Hide first last page button when there are not many buttons.
            // DONE show hide toolbar buttons when needed based on row selection
            // DONE set table row styling based on data grid column value
            // DONE No more Cookie! Html local storage!
            // DONE columns visibility can be changed with submenu, hence modeller 0 width columns can now made visible
            // DONE give warning message if last column is hidden via column menu
            // DONE move template string to html file
            // DONE check if the configuration is valid. 
            // FIXED removed required "Row Class Attribute" form context XML
            // FIXED hide controlbar buttons of Microflows of type "selection" (single select data grid)
            // FIXED Shared array conflicting with multiple widgets in a page (toolbar buttons)
            // DONE Enable datagrid extention to work on reference set selector too.
            // DONE Can hide / show grid buttons when a grid is empty or not with the classes "hideOnEmpty" or "showOnEmpty"
            // FIXED When paging is hidden in modeller and dynamic hiding is enabled resulted in an error
            // DONE empty table header can be hidden without showing a button.
            // FIXED Mx5.4 Grid buttons where no working well; Mx renamed eventGridRowClicked to eventItemClicked in datagrid.
            // DONE Handler refresh of grid buttons on double click        
            // FIXED When conditional visibility is set via the modeller the dgExtension overwrites, this should not happen.
            // DONE Error configuration feedback in UI
            // DONE support Non Persistable Entities in Row Class Mapping.
            // ADDED Inline buttons in data grid (one button per column)
            // FIXED Button Toolbar conditional visibility
            // DONE added inlineButtonContainer class on td (less padding is needed for btn instead of text)
            // DONE inline button, value as attribute
            // DONE Button Toolbar conditional visibility: Select All button shows when 0 records are in the DataGrid, hide on all rows are selected
            // FIXED missing include NodeList-traverse
            // FIXED Detection Reference Set selector, broken by new 5.7 class for testing.
            // ADDED support for template grid; empty message and dynamic show of paging 
            // FIXED Broken compare check for stored Flex Columns in Mx5.7 (no settings for column attr anymore )
            // FIXED Broken sorting in Mx5.7 (th domData, changed from key to, index and use of _visibleColumns) replaced buildGridBody only compatible with mx5.7 and up
            // DONE On close header menu close sub menus.
            // DONE Able to store column  settings related to account, so no local cache is needed.
            // DONE splitting functions in different files and use AMD loading.
            // FIXED issues with MX 5.10 (removeContext


            postCreate: function() {
                // post create function of dojo widgets.
                // TODO Check if objects are not accidently shared by object. 

                try {
                    var colindex = this.domNode.parentNode.cellIndex;
                    this.grid = dijit.findWidgets(this.domNode.parentNode.parentNode.previousSibling.cells[colindex])[0];
                    if (this.grid === null) {
                        this.showError("Error: unable to find grid. Is the widget placed in a row underneath a grid?");
                        this.loaded();
                        return;
                    }

                    if (this.grid.declaredClass === "mxui.widget.ReferenceSetSelector")
                        this.grid = this.grid._datagrid;

                    this.postCreateInlineButtons();
                    this.postCreatePagingButtons();
                    this.postCreateRowClasses();
                    this.postCreateToolbarButtons();
                    this.postCreateFlexColumns();
                    this.postCreateEmptyTable();

                } catch (e) {
                    this.showError("error in create widget:" + e);
                }
                this.loaded();
            },

            showError: function(msg) {
                console.error(msg);
                this.domNode.appendChild(mxui.dom.create("div", {
                    style: "color:red"
                }, msg));
            },

            destroy: function() {
                //is there anything left to destroy?
            }

        };
        mxui.widget.declare("DataGridExtension.widget.DataGridExtension", widget);
        mxui.widget.declare("DataGridExtension.widget.DataGridExtensionNoContext", widget);
    });
    
//@ sourceURL=widgets/DataGridExtension/widget/DataGridExtension.js