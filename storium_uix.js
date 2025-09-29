// storium_uix.js
// UIX Library: All UI rendering and event logic for Storium Interactive

export function renderGamesDropdown(games, selectedIdx, DOMHandler) {
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

export function renderTreeView(game, allData, DOMHandler, appendAll, createManyElements, renderGroupList, renderLiSpans, renderLiSpanAndText) {
    const container = document.getElementById('treeView');
    container.innerHTML = '';
    if (!game) return;
    // Game Desc & Settings
    const gameDesc = DOMHandler.createElement('div', { class: 'tree-item' });
    appendAll(gameDesc, createManyElements('span', [
        { class: 'tree-label', textContent: 'Desc:' },
        { textContent: game.desc || '(none)' }
    ]));
    appendAll(gameDesc, [DOMHandler.createElement('button', { class: 'crud-btn', title: 'Edit Desc', 'data-action': 'editGameDesc', textContent: '✎' })]);
    appendAll(container, [gameDesc]);
    // ... (rest of tree rendering as in index.html) ...
}
