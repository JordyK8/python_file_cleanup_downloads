module.exports = (paths) => {
    const tree = [];
    for (var i = 0; i < paths.length; i++) {
        const path = paths[i];
        let currentLevel = tree;
        for (let j = 0; j < path.length; j++) {
            const part = path[j];
    
            const existingPath = findWhere(currentLevel, 'label', part);
    
            if (existingPath) {
                currentLevel = existingPath.children;
            } else {
                const newPart = {
                    id: paths[i].join('/'),
                    label: part,
                    children: [],
                }
    
                currentLevel.push(newPart);
                currentLevel = newPart.children;
            }
        }
    }
    return tree;
    
    function findWhere(array, key, value) {
        t = 0;
        while (t < array.length && array[t][key] !== value) { t++; };
    
        if (t < array.length) {
            return array[t]
        } else {
            return false;
        }
    }
}
