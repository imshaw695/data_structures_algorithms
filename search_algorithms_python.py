import time
import random


def linear_search(arr, target):
    """
    Linear Search is a simple search algorithm that checks each element in the list
    sequentially until the target element is found or the list ends.

    Use cases:
    - Suitable for small or unsorted datasets.
    - Useful when simplicity and ease of implementation are more critical than performance.

    :param arr: List of elements to search through.
    :param target: Element to search for.
    :return: Index of the target element if found, else -1.
    """
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1


def binary_search(arr, target):
    """
    Binary Search is an efficient search algorithm that works on sorted arrays.
    It repeatedly divides the search interval in half and compares the target value
    to the middle element of the interval.

    Use cases:
    - Suitable for large sorted datasets due to its logarithmic time complexity.
    - Commonly used in applications where data is frequently searched and remains static.

    :param arr: Sorted list of elements to search through.
    :param target: Element to search for.
    :return: Index of the target element if found, else -1.
    """
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1


def interpolation_search(arr, target):
    """
    Interpolation Search is an improvement over Binary Search for instances where the
    values in the array are uniformly distributed. It calculates the probable position
    of the target value based on the value's size relative to the bounds of the search interval.

    Use cases:
    - Suitable for large sorted datasets with uniformly distributed values.
    - Useful when average-case performance is more critical than worst-case performance.

    :param arr: Sorted list of uniformly distributed elements to search through.
    :param target: Element to search for.
    :return: Index of the target element if found, else -1.
    """
    low, high = 0, len(arr) - 1
    while low <= high and arr[low] <= target <= arr[high]:
        if low == high:
            if arr[low] == target:
                return low
            return -1

        # Probing the position with keeping uniform distribution in mind.
        pos = low + ((target - arr[low]) * (high - low) // (arr[high] - arr[low]))

        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1


def measure_time(search_function, arr, target):
    """
    Measure the time taken to search for a target element using a given search function.

    :param search_function: The search function to be used.
    :param arr: List of elements to search through.
    :param target: Element to search for.
    :return: Time taken to search for the target element.
    """
    start_time = time.time()
    search_function(arr, target)
    return time.time() - start_time


if __name__ == "__main__":
    # Generate a large array of random numbers and sort it for binary and interpolation search
    array_size = 10000
    large_array = sorted([random.randint(1, 10000) for _ in range(array_size)])
    target = random.choice(large_array)

    # Copy the array for fair comparison
    arrays = {
        "Linear Search": large_array,
        "Binary Search": large_array,
        "Interpolation Search": large_array
    }

    # Measure time taken for each search algorithm
    timings = {}
    timings["Linear Search"] = measure_time(linear_search, arrays["Linear Search"], target)
    timings["Binary Search"] = measure_time(binary_search, arrays["Binary Search"], target)
    timings["Interpolation Search"] = measure_time(interpolation_search, arrays["Interpolation Search"], target)

    # Print the results
    for search_name, search_time in timings.items():
        print(f"{search_name} Time: {search_time:.5f} seconds")
