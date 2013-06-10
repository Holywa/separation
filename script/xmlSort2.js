Quicksort.sort(wordsNodes);
 var Quicksort = (function () {

    function swap(array, indexA, indexB) {
        var temp = array[indexA];
        array[indexA] = array[indexB];  //echange des deux noeuds
        array[indexB] = temp;
    }


    function partition(wordsArray, pivot, left, right) {
        var storeIndex = left,
            pivotValue = wordsArray[pivot].getAttribute("freq");
        swap(wordsArray, pivot, right);
        for (var v = left; v < right; v++) {
            if (wordsArray[v].getAttribute("freq") < pivotValue) {
                swap(wordsArray, v, storeIndex);
                storeIndex++;
            }
        }
        swap(wordsArray, right, storeIndex);
        return storeIndex;
    }


    function sort(array, left, right) {
        var pivot = null;
        if (typeof left !== 'number') {
            left = 0;
        }
        if (typeof right !== 'number') {
            right = array.length - 1;
        }
        if (left < right) {
            pivot = left + Math.ceil((right - left) * 0.5);
            newPivot = partition(array, pivot, left, right);
            sort(array, left, newPivot - 1);
            sort(array, newPivot + 1, right);
        }
    }
    return {
        sort: sort
    };

})();