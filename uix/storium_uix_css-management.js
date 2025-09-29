// TODOs for storium_uix_css-management.js
// 1. Centralize all UI class/style definitions for the app.
// 2. Register all styles and classes with CssManagement.StyleRegistry.
// 3. Expose a StyleBody (or similar) component for use throughout UIX.
// 4. Ensure all UIX files use only these class names via getClassName.
// 5. Support easy extension for new UI elements/components.

(function(global) {
    // Centralized style component for all Storium Interactive UI
    class StyleBody extends global.CssManagement.Component {
        constructor(registry) {
            super('app', registry);
            this.nl = registry.nullValue;
            // Define all styles used in the app
            this.styles = [
                'display', 'border-bottom', 'background', 'padding', 'gap',
                'cursor', 'border', 'font-weight', 'outline', 'color', 'border-radius',
                'min-height', 'width', 'align-items', 'margin-bottom',
                'font-size', 'margin-left', 'resize', 'margin-right', 'vertical-align'
            ];
            this.cssclasses = [
                // Tabs
                'tabs-main', 'tabs-secondary', 'tabs-accent', 'tabs-muted', 'tabs-highlight',
                // Tab Buttons
                'tab-default', 'tab-active', 'tab-secondary', 'tab-danger', 'tab-info',
                // Tab Content
                'tabcontent-inactive', 'tabcontent-active', 'tabcontent-secondary', 'tabcontent-muted', 'tabcontent-highlight',
                // Dropdowns
                'dropdown-root', 'dropdown-secondary', 'dropdown-accent', 'dropdown-muted', 'dropdown-highlight',
                // CRUD Buttons
                'crudbtn-root', 'crudbtn-danger', 'crudbtn-success', 'crudbtn-info', 'crudbtn-muted',
                // Textarea
                'textarea-root', 'textarea-secondary', 'textarea-accent', 'textarea-muted', 'textarea-highlight',
                // Icon Buttons
                'iconbtn-primary', 'iconbtn-secondary', 'iconbtn-danger', 'iconbtn-success', 'iconbtn-info',
                // TreeView
                'tree-label', 'tree-item', 'tree-group', 'tree-header', 'tree-selected'
            ];
            this.cssvalues = [
                // Tabs
                `flex,2px solid #ccc,#fafafa,0px,0px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,2px solid #bbb,#f0f0f0,2px,2px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,2px solid #09c,#eaf6ff,0px,0px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,2px solid #eee,#f9f9f9,0px,0px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,2px solid #f90,#fffbe6,0px,0px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                // Tab Buttons
                `${this.nl},${this.nl},#f7f7f7,12px 24px,${this.nl},pointer,none,bold,none,#222,3px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},#fff,12px 24px,${this.nl},pointer,none,bold,none,#222,3px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},#e0e0e0,12px 24px,${this.nl},pointer,none,normal,none,#555,3px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},#ffdddd,12px 24px,${this.nl},pointer,none,bold,none,#a00,3px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},#ddeeff,12px 24px,${this.nl},pointer,none,normal,none,#036,3px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                // Tab Content
                `none,${this.nl},#fff,24px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,100%,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `block,${this.nl},#fff,24px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,100%,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `block,${this.nl},#f7f7f7,16px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,100%,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `block,${this.nl},#fafafa,8px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,100%,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `block,${this.nl},#fffbe6,24px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,100%,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                // Dropdown Editable
                `flex,${this.nl},#fff,0px,8px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,${this.nl},${this.nl},center,16px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,${this.nl},#f7f7f7,4px,8px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},2px,${this.nl},${this.nl},center,8px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,${this.nl},#eaf6ff,8px,12px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},4px,${this.nl},${this.nl},center,12px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,${this.nl},#fafafa,0px,4px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,${this.nl},${this.nl},center,4px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                `flex,${this.nl},#fffbe6,0px,8px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},0px,${this.nl},${this.nl},center,16px,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl}`,
                // CRUD Buttons
                `${this.nl},1px solid #ccc,#eee,2px 6px,${this.nl},pointer,${this.nl},#222,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},2px,1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #f00,#ffdddd,2px 6px,${this.nl},pointer,${this.nl},#a00,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},2px,1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #0a0,#e0ffe0,2px 6px,${this.nl},pointer,${this.nl},#070,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},2px,1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #09c,#ddeeff,2px 6px,${this.nl},pointer,${this.nl},#036,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},2px,1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #eee,#fafafa,2px 6px,${this.nl},pointer,${this.nl},#aaa,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},2px,1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                // Textarea Large
                `${this.nl},1px solid #ccc,#fff,8px,${this.nl},${this.nl},4px,#222,${this.nl},${this.nl},4px,180px,100%,${this.nl},12px,1em,vertical,${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #bbb,#f7f7f7,6px,${this.nl},${this.nl},4px,#333,${this.nl},${this.nl},4px,120px,100%,${this.nl},8px,0.9em,vertical,${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #09c,#eaf6ff,10px,${this.nl},${this.nl},6px,#036,${this.nl},${this.nl},6px,220px,100%,${this.nl},16px,1.1em,vertical,${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #eee,#fafafa,4px,${this.nl},${this.nl},2px,#aaa,${this.nl},${this.nl},2px,80px,100%,${this.nl},4px,0.8em,vertical,${this.nl},${this.nl},${this.nl}`,
                `${this.nl},1px solid #f90,#fffbe6,8px,${this.nl},${this.nl},4px,#a60,${this.nl},${this.nl},4px,200px,100%,${this.nl},10px,1em,vertical,${this.nl},${this.nl},${this.nl}`,
                // Icon Button Group
                `${this.nl},1px solid #bbb,#e0e0e0,4px 10px,${this.nl},pointer,${this.nl},#222,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},6px,middle,${this.nl}`,
                `${this.nl},1px solid #ccc,#f7f7f7,4px 10px,${this.nl},pointer,${this.nl},#555,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},6px,middle,${this.nl}`,
                `${this.nl},1px solid #f00,#ffdddd,4px 10px,${this.nl},pointer,${this.nl},#a00,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},6px,middle,${this.nl}`,
                `${this.nl},1px solid #0a0,#e0ffe0,4px 10px,${this.nl},pointer,${this.nl},#070,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},6px,middle,${this.nl}`,
                `${this.nl},1px solid #09c,#ddeeff,4px 10px,${this.nl},pointer,${this.nl},#036,none,${this.nl},3px,${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},6px,middle,${this.nl}`,
                // TreeView
                `${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},#333,none,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},#222,none,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},#666,none,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},#111,none,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},${this.nl},${this.nl},${this.nl}`,
                `${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},#09c,none,${this.nl},${this.nl},${this.nl},${this.nl},${this.nl},1em,${this.nl},${this.nl},${this.nl},${this.nl}`
            ];
            this.registerStyles();
        }
    }

    // Expose StyleBody for use in UIX
    global.StoriumUIXStyleBody = { StyleBody };
})(typeof window !== 'undefined' ? window : this);