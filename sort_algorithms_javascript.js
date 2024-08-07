function bubbleSort(arr) {
    /**
     * Bubble Sort is a simple comparison-based sorting algorithm.
     * It repeatedly steps through the list, compares adjacent elements,
     * and swaps them if they are in the wrong order. This process is repeated
     * until the list is sorted.
     *
     * Use cases:
     * - Best used for small datasets due to its quadratic time complexity.
     * - Educational purposes to illustrate the basic concepts of sorting algorithms.
     */
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arr;
}

function quickSort(arr) {
    /**
     * Quick Sort is an efficient, divide-and-conquer sorting algorithm.
     * It works by selecting a 'pivot' element from the array and partitioning
     * the other elements into two sub-arrays according to whether they are
     * less than or greater than the pivot. The sub-arrays are then sorted recursively.
     *
     * Use cases:
     * - Suitable for large datasets due to its average-case time complexity of O(n log n).
     * - Often used in practice due to its efficient performance on average.
     */
    if (arr.length <= 1) return arr;
    let pivot = arr[Math.floor(arr.length / 2)];
    let left = arr.filter(x => x < pivot);
    let middle = arr.filter(x => x === pivot);
    let right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

function insertionSort(arr) {
    /**
     * Insertion Sort is a simple comparison-based sorting algorithm.
     * It builds the final sorted array one item at a time by repeatedly picking
     * the next item and inserting it into the correct position.
     *
     * Use cases:
     * - Best used for small datasets or nearly sorted arrays due to its quadratic time complexity.
     * - Useful when adding a small number of new elements to a previously sorted array.
     */
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

function mergeSort(arr) {
    /**
     * Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm.
     * It works by dividing the array into two halves, sorting each half recursively,
     * and then merging the sorted halves to produce the final sorted array.
     *
     * Use cases:
     * - Suitable for large datasets due to its consistent O(n log n) time complexity.
     * - Preferred when stability (preserving the relative order of equal elements) is required.
     */
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function measureTime(sortFunction, arr) {
    /**
     * Measure the time taken to sort an array using a given sorting function.
     *
     * :param sortFunction: The sorting function to be used.
     * :param arr: List of elements to be sorted.
     * :return: Time taken to sort the array.
     */
    const start = performance.now();
    sortFunction([...arr]); // Clone array to avoid in-place sorting affecting other measurements
    return performance.now() - start;
}

(function main() {
    // Generate a large array of random numbers
    const arraySize = 10000;
    const largeArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 10000));

    // Copy the array for fair comparison
    const arrays = {
        "Bubble Sort": [...largeArray],
        "Quick Sort": [...largeArray],
        "Insertion Sort": [...largeArray],
        "Merge Sort": [...largeArray]
    };

    // Measure time taken for each sorting algorithm
    const timings = {};
    timings["Bubble Sort"] = measureTime(bubbleSort, arrays["Bubble Sort"]);
    timings["Quick Sort"] = measureTime(quickSort, arrays["Quick Sort"]);
    timings["Insertion Sort"] = measureTime(insertionSort, arrays["Insertion Sort"]);
    timings["Merge Sort"] = measureTime(mergeSort, arrays["Merge Sort"]);

    // Print the results
    for (const [sortName, sortTime] of Object.entries(timings)) {
        console.log(`${sortName} Time: ${sortTime.toFixed(5)} milliseconds`);
    }
})();
