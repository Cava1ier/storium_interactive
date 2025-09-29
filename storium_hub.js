
// storium_hub.js
// Hub: Connects data and UIX, manages state and event wiring (IIFE, global)

// storium_hub.js
// Hub: Connects data and UIX, manages state and event wiring (IIFE, global)

(function(global) {
    // Helper to load a script if not already present
    function loadScriptIfNeeded(src, globalName, cb) {
        if (global[globalName]) { cb && cb(); return; }
        var s = document.createElement('script');
        s.src = src;
        s.onload = function() { cb && cb(); };
        document.head.appendChild(s);
    }
    function updateGamesDropdown(DOMHandler) {
        window.StoriumUIX.renderGamesDropdown(window.StoriumData.getGames(), window.StoriumData.getSelectedGameIdx(), DOMHandler);
    }

    function updateTreeView(DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText) {
        const games = window.StoriumData.getGames();
        const idx = window.StoriumData.getSelectedGameIdx();
        window.StoriumUIX.renderTreeView(games[idx], {
            players: window.StoriumData.getPlayers(),
            gameSettings: window.StoriumData.getGameSettings(),
            characters: window.StoriumData.getCharacters(),
            scenes: window.StoriumData.getScenes(),
            cardTypes: window.StoriumData.state.cardTypes,
            cards: window.StoriumData.state.cards,
            conflicts: window.StoriumData.state.conflicts,
            conflictPips: window.StoriumData.state.conflictPips,
            cardInstances: window.StoriumData.state.cardInstances,
            moves: window.StoriumData.state.moves,
            goals: window.StoriumData.state.goals,
            sceneGoals: window.StoriumData.state.sceneGoals,
            assets: window.StoriumData.state.assets,
            sceneAssets: window.StoriumData.state.sceneAssets,
            subplots: window.StoriumData.state.subplots,
            subplotsProgress: window.StoriumData.state.subplotsProgress,
            hostActions: window.StoriumData.state.hostActions,
        }, DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText);
    }

    function createGame(DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText) {
        const name = prompt("Game name?");
        if (!name) return;
        window.StoriumData.createGame(name);
        updateGamesDropdown(DOMHandler);
        updateTreeView(DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText);
    }

    function init() {
        // Load dependencies in order: CssManagement, databasegrokai, storium_data, storium_uix
        function loadCssManagement(cb) {
            if (window.CssManagementLoaded) { cb(); return; }
            const script = document.createElement('script');
            script.src = 'https://raw.githubusercontent.com/Cava1ier/libraries/refs/heads/main/css/css-management.js';
            script.onload = function() { window.CssManagementLoaded = true; cb(); };
            document.head.appendChild(script);
        }
        function loadDatabaseGrok(cb) {
            if (window.RelationalDb) { cb(); return; }
            var s = document.createElement('script');
            s.src = 'https://raw.githubusercontent.com/Cava1ier/libraries/main/database/databasegrokai.js';
            s.onload = cb;
            document.head.appendChild(s);
        }
        loadCssManagement(function() {
            loadDatabaseGrok(function() {
                loadScriptIfNeeded('storium_data.js', 'StoriumData', function() {
                    loadScriptIfNeeded('storium_uix.js', 'StoriumUIX', function() {
                        // Build root UI (assume buildRootUI is global or in window)
                        const refs = window.buildRootUI();
                        // Wire up events (assume wireEvents is global or in window)
                        if (window.wireEvents) window.wireEvents(refs);
                        // Initial render
                        updateGamesDropdown(window.CssManagement.DOMHandler);
                        updateTreeView(window.CssManagement.DOMHandler);
                    });
                });
            });
        });
    }

    global.StoriumHub = {
        updateGamesDropdown,
        updateTreeView,
        createGame,
        init
    };
})(typeof window !== 'undefined' ? window : this);
