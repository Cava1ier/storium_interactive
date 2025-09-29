// TODO: UIX/DATA FILES
// - uix/storium_uix.js: Main UI rendering logic
// - uix/storium_uix_treeview.js: TreeView rendering logic (modularize from main UIX)
// - uix/storium_uix_eventfactory.js: Event wiring/factory for UI events
// - data/storium_data.js: Data model, CRUD, and RelationalDb integration
// - data/storium_data_treebuilder.js: Tree data builder logic (modularize from main data)
// - data/storium_data_textarea_table_builder.js: Textarea table loader/parser logic
//
// TODO: Modularize treeview and event logic into the new files above.

// storium_uix.js
// UIX Library: All UI rendering and event logic for Storium Interactive (IIFE, global)

(function(global) {
    function renderGamesDropdown(games, selectedIdx, DOMHandler) {
        const dd = document.getElementById('gamesDropdown');
        dd.innerHTML = '';
        games.forEach((g, i) => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = g.name;
            dd.appendChild(opt);
        });
        dd.selectedIndex = selectedIdx;
    }

    global.StoriumUIX = {
        renderGamesDropdown,
        renderTreeView: global.StoriumUIXTreeView ? global.StoriumUIXTreeView.renderTreeView : function() {}
    };
})(typeof window !== 'undefined' ? window : this);
