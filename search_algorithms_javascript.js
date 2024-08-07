function linearSearch(arr, target) {
    /**
     * Linear Search is a simple search algorithm that checks each element in the list
     * sequentially until the target element is found or the list ends.
     *
     * Use cases:
     * - Suitable for small or unsorted datasets.
     * - Useful when simplicity and ease of implementation are more critical than performance.
     */
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}

function binarySearch(arr, target) {
    /**
     * Binary Search is an efficient search algorithm that works on sorted arrays.
     * It repeatedly divides the search interval in half and compares the target value
     * to the middle element of the interval.
     *
     * Use cases:
     * - Suitable for large sorted datasets due to its logarithmic time complexity.
     * - Commonly used in applications where data is frequently searched and remains static.
     */
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

function interpolationSearch(arr, target) {
    /**
     * Interpolation Search is an improvement over Binary Search for instances where the
     * values in the array are uniformly distributed. It calculates the probable position
     * of the target value based on the value's size relative to the bounds of the search interval.
     *
     * Use cases:
     * - Suitable for large sorted datasets with uniformly distributed values.
     * - Useful when average-case performance is more critical than worst-case performance.
     */
    let low = 0;
    let high = arr.length - 1;
    while (low <= high && target >= arr[low] && target <= arr[high]) {
        if (low === high) {
            if (arr[low] === target) {
                return low;
            }
            return -1;
        }
        const pos = low + Math.floor(((target - arr[low]) * (high - low)) / (arr[high] - arr[low]));
        if (arr[pos] === target) {
            return pos;
        }
        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }
    return -1;
}

function measureTime(searchFunction, arr, target) {
    /**
     * Measure the time taken to search for a target element using a given search function.
     *
     * :param searchFunction: The search function to be used.
     * :param arr: List of elements to search through.
     * :param target: Element to search for.
     * :return: Time taken to search for the target element.
     */
    const start = performance.now();
    searchFunction(arr, target); // Perform the search
    return performance.now() - start;
}

(function main() {
    // Generate a large array of random numbers and sort it for binary and interpolation search
    const arraySize = 10000;
    const largeArray = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 10000)).sort((a, b) => a - b);
    const target = largeArray[Math.floor(Math.random() * largeArray.length)];

    // Copy the array for fair comparison
    const arrays = {
        "Linear Search": largeArray.slice(),
        "Binary Search": largeArray.slice(),
        "Interpolation Search": largeArray.slice()
    };

    // Measure time taken for each search algorithm
    const timings = {};
    timings["Linear Search"] = measureTime(linearSearch, arrays["Linear Search"], target);
    timings["Binary Search"] = measureTime(binarySearch, arrays["Binary Search"], target);
    timings["Interpolation Search"] = measureTime(interpolationSearch, arrays["Interpolation Search"], target);

    // Print the results
    for (const [searchName, searchTime] of Object.entries(timings)) {
        console.log(`${searchName} Time: ${searchTime.toFixed(5)} milliseconds`);
    }
})();
