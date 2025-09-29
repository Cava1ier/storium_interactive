// storium_hub.js
// Hub: Connects data and UIX, manages state and event wiring

import * as Data from './storium_data.js';
import * as UIX from './storium_uix.js';

export function updateGamesDropdown(DOMHandler) {
    UIX.renderGamesDropdown(Data.getGames(), Data.getSelectedGameIdx(), DOMHandler);
}

export function updateTreeView(DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText) {
    const games = Data.getGames();
    const idx = Data.getSelectedGameIdx();
    UIX.renderTreeView(games[idx], {
        players: Data.getPlayers(),
        gameSettings: Data.getGameSettings(),
        characters: Data.getCharacters(),
        scenes: Data.getScenes(),
        cardTypes: Data.state.cardTypes,
        cards: Data.state.cards,
        conflicts: Data.state.conflicts,
        conflictPips: Data.state.conflictPips,
        cardInstances: Data.state.cardInstances,
        moves: Data.state.moves,
        goals: Data.state.goals,
        sceneGoals: Data.state.sceneGoals,
        assets: Data.state.assets,
        sceneAssets: Data.state.sceneAssets,
        subplots: Data.state.subplots,
        subplotsProgress: Data.state.subplotsProgress,
        hostActions: Data.state.hostActions,
    }, DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText);
}

export function createGame(DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText) {
    const name = prompt("Game name?");
    if (!name) return;
    Data.createGame(name);
    updateGamesDropdown(DOMHandler);
    updateTreeView(DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText);
}
