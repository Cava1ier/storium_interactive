
// storium_data.js
// Data Model and CRUD for Storium Interactive (IIFE, global)


    // --- RelationalDb integration ---
    let dbDriver = null;

    function parseTables(text) {
        // Use RelationalDb.DatabaseDriver to parse tables from text
        dbDriver = new global.RelationalDb.DatabaseDriver();
        dbDriver.loadFromText(text);
        // For legacy compatibility, return a plain object of arrays
        const tables = {};
        for (const tblName in dbDriver.database.tables.tables) {
            const table = dbDriver.database.tables.tables[tblName];
            tables[tblName] = table.rows.data.map(row => {
                const obj = {};
                table.columns.names.forEach((col, i) => { obj[col] = row.data[i]; });
                return obj;
            });
        }
        return tables;
    }

    function buildDataModelFromTables(tables) {
        // Legacy: keep state in sync for now
        function int(v) { return v === undefined || v === null ? null : parseInt(v, 10); }
        state.games = (tables.tblGames||[]).map(r => ({ id: int(r.id), name: r.name, desc: r.desc }));
        state.players = (tables.tblPlayers||[]).map(r => ({ id: int(r.id), name: r.name }));
        state.gameSettings = (tables.tblGameSettings||[]).map(r => ({ id: int(r.id), game_id: int(r.game_id), key: r.setting_key, value: r.setting_value }));
        state.characters = (tables.tblCharacters||[]).map(r => ({ id: int(r.id), game_id: int(r.game_id), name: r.name, status: r.status, is_pc: r.is_pc === '1' }));
        state.playersCharacters = (tables.tblPlayersCharacters||[]).map(r => ({ id: int(r.id), player_id: int(r.player_id), character_id: int(r.character_id), is_primary: r.is_primary === '1' }));
        state.cardTypes = (tables.tblCardTypes||[]).map(r => ({ id: int(r.id), name: r.name, category: r.category, is_wild: r.is_wild === '1' }));
        state.cards = (tables.tblCards||[]).map(r => ({ id: int(r.id), game_id: int(r.game_id), name: r.name, desc: r.desc, card_type_id: int(r.card_type_id) }));
        state.charactersCards = (tables.tblCharactersCards||[]).map(r => ({ id: int(r.id), character_id: int(r.character_id), card_id: int(r.card_id), count: int(r.count) }));
        state.scenes = (tables.tblScenes||[]).map(r => ({ id: int(r.id), game_id: int(r.game_id), name: r.name, desc: r.desc, place_card_id: int(r.place_card_id), status: r.status, intro_narration: r.intro_narration }));
        state.sceneCharacters = (tables.tblSceneCharacters||[]).map(r => ({ id: int(r.id), scene_id: int(r.scene_id), character_id: int(r.character_id), is_npc: r.is_npc === '1' }));
        state.conflicts = (tables.tblConflicts||[]).map(r => ({ id: int(r.id), scene_id: int(r.scene_id), card_id: int(r.card_id), type: r.type, name: r.name, desc: r.desc, max_pips: int(r.max_pips), status: r.status }));
        state.conflictPips = (tables.tblConflictPips||[]).map(r => ({ id: int(r.id), conflict_id: int(r.conflict_id), pip_number: int(r.pip_number), assigned_character_id: int(r.assigned_character_id), assigned_card_instance_id: int(r.assigned_card_instance_id), outcome: r.outcome, narrative: r.narrative }));
        state.cardInstances = (tables.tblCardInstances||[]).map(r => ({ id: int(r.id), card_id: int(r.card_id), owner_character_id: int(r.owner_character_id), scene_id: int(r.scene_id), custom_name: r.custom_name, custom_desc: r.custom_desc, timestamp: r.timestamp, spent: r.spent === '1' }));
        state.moves = (tables.tblMoves||[]).map(r => ({ id: int(r.id), scene_id: int(r.scene_id), conflict_id: int(r.conflict_id), card_instance_id: int(r.card_instance_id), player_id: int(r.player_id), text: r.text, timestamp: r.timestamp }));
        state.goals = (tables.tblGoals||[]).map(r => ({ id: int(r.id), game_id: int(r.game_id), name: r.name, desc: r.desc }));
        state.sceneGoals = (tables.tblSceneGoals||[]).map(r => ({ id: int(r.id), scene_id: int(r.scene_id), goal_id: int(r.goal_id), assigned_character_id: int(r.assigned_character_id), status: r.status }));
        state.assets = (tables.tblAssets||[]).map(r => ({ id: int(r.id), game_id: int(r.game_id), name: r.name, desc: r.desc }));
        state.sceneAssets = (tables.tblSceneAssets||[]).map(r => ({ id: int(r.id), scene_id: int(r.scene_id), asset_id: int(r.asset_id), assigned_character_id: int(r.assigned_character_id), status: r.status }));
        state.subplots = (tables.tblSubplots||[]).map(r => ({ id: int(r.id), card_id: int(r.card_id), name: r.name, desc: r.desc }));
        state.subplotsProgress = (tables.tblSubplotsProgress||[]).map(r => ({ id: int(r.id), character_id: int(r.character_id), subplot_id: int(r.subplot_id), scene_id: int(r.scene_id), progress_note: r.progress_note, timestamp: r.timestamp }));
        state.hostActions = (tables.tblHostActions||[]).map(r => ({ id: int(r.id), scene_id: int(r.scene_id), action_type: r.action_type, details: r.details, timestamp: r.timestamp }));
    }

    function getGames() { return state.games; }
    function getSelectedGameIdx() { return state.selectedGameIdx; }
    function setSelectedGameIdx(idx) { state.selectedGameIdx = idx; }
    function getPlayers() { return state.players; }
    function getGameSettings() { return state.gameSettings; }
    function getCharacters() { return state.characters; }
    function getScenes() { return state.scenes; }
    function createGame(name) {
        const newGame = { id: state.games.length ? Math.max(...state.games.map(g=>g.id||0))+1 : 1, name, desc: '', scenes: [] };
        state.games.push(newGame);
        state.selectedGameIdx = state.games.length - 1;
        return newGame;
    }
    function removeGame(idx) {
        if (state.games.length === 0) return;
        state.games.splice(idx, 1);
        state.selectedGameIdx = Math.max(0, state.selectedGameIdx - 1);
    }
    function updateGame(idx, name) {
        if (state.games.length === 0) return;
        state.games[idx].name = name;
    }
    function updateGameDesc(idx, desc) {
        if (state.games.length === 0) return;
        state.games[idx].desc = desc;
    }

    global.StoriumData = {
        state,
        parseTables,
        buildDataModelFromTables,
        getGames,
        getSelectedGameIdx,
        setSelectedGameIdx,
        getPlayers,
        getGameSettings,
        getCharacters,
        getScenes,
        createGame,
        removeGame,
        updateGame,
        updateGameDesc,
        // RelationalDb API
        getDbDriver: () => dbDriver,
        getDb: () => dbDriver ? dbDriver.getDatabase() : null
    };
})(typeof window !== 'undefined' ? window : this);
