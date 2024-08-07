import time
import random


# Function to perform Bubble Sort
def bubble_sort(arr):
    """
    Bubble Sort is a simple comparison-based sorting algorithm.
    It repeatedly steps through the list, compares adjacent elements,
    and swaps them if they are in the wrong order. This process is repeated
    until the list is sorted.

    Use cases:
    - Best used for small datasets due to its quadratic time complexity.
    - Educational purposes to illustrate the basic concepts of sorting algorithms.

    :param arr: List of elements to be sorted.
    :return: Sorted list.
    """
    n = len(arr)
    for i in range(n):
        swapped = False  # Track if a swap was made
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr


# Function to perform Quick Sort
def quick_sort(arr):
    """
    Quick Sort is an efficient, divide-and-conquer sorting algorithm.
    It works by selecting a 'pivot' element from the array and partitioning
    the other elements into two sub-arrays according to whether they are
    less than or greater than the pivot. The sub-arrays are then sorted recursively.

    Use cases:
    - Suitable for large datasets due to its average-case time complexity of O(n log n).
    - Often used in practice due to its efficient performance on average.

    :param arr: List of elements to be sorted.
    :return: Sorted list.
    """
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[len(arr) // 2]  # Choose the middle element as pivot
        left = [x for x in arr if x < pivot]  # Elements less than pivot
        middle = [x for x in arr if x == pivot]  # Elements equal to pivot
        right = [x for x in arr if x > pivot]  # Elements greater than pivot
        return quick_sort(left) + middle + quick_sort(right)


# Function to perform Insertion Sort
def insertion_sort(arr):
    """
    Insertion Sort is a simple comparison-based sorting algorithm.
    It builds the final sorted array one item at a time by repeatedly picking
    the next item and inserting it into the correct position.

    Use cases:
    - Best used for small datasets or nearly sorted arrays due to its quadratic time complexity.
    - Useful when adding a small number of new elements to a previously sorted array.

    :param arr: List of elements to be sorted.
    :return: Sorted list.
    """
    for i in range(1, len(arr)):
        key = arr[i]  # Current element to be positioned
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key  # Place key after the last element smaller than it
    return arr


# Function to perform Merge Sort
def merge_sort(arr):
    """
    Merge Sort is an efficient, stable, divide-and-conquer sorting algorithm.
    It works by dividing the array into two halves, sorting each half recursively,
    and then merging the sorted halves to produce the final sorted array.

    Use cases:
    - Suitable for large datasets due to its consistent O(n log n) time complexity.
    - Preferred when stability (preserving the relative order of equal elements) is required.

    :param arr: List of elements to be sorted.
    :return: Sorted list.
    """
    if len(arr) > 1:
        mid = len(arr) // 2  # Find the middle of the array
        left_half = arr[:mid]  # Divide the array elements into 2 halves
        right_half = arr[mid:]

        merge_sort(left_half)  # Recursively sort the left half
        merge_sort(right_half)  # Recursively sort the right half

        i = j = k = 0

        # Copy data to temp arrays left_half[] and right_half[]
        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        # Checking if any element was left in the left_half
        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        # Checking if any element was left in the right_half
        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1
    return arr


def measure_time(sort_function, arr):
    """
    Measure the time taken to sort an array using a given sorting function.

    :param sort_function: The sorting function to be used.
    :param arr: List of elements to be sorted.
    :return: Time taken to sort the array.
    """
    start_time = time.time()  # Record the start time
    sort_function(arr)  # Perform the sorting
    return time.time() - start_time  # Calculate the elapsed time


if __name__ == "__main__":
    # Generate a large array of random numbers
    array_size = 10000
    large_array = [random.randint(1, 10000) for _ in range(array_size)]

    # Copy the array for fair comparison
    arrays = {
        "Bubble Sort": large_array.copy(),
        "Quick Sort": large_array.copy(),
        "Insertion Sort": large_array.copy(),
        "Merge Sort": large_array.copy()
    }

    # Measure time taken for each sorting algorithm
    timings = {}
    timings["Bubble Sort"] = measure_time(bubble_sort, arrays["Bubble Sort"])
    timings["Quick Sort"] = measure_time(quick_sort, arrays["Quick Sort"])
    timings["Insertion Sort"] = measure_time(insertion_sort, arrays["Insertion Sort"])
    timings["Merge Sort"] = measure_time(merge_sort, arrays["Merge Sort"])

    # Print the results
    for sort_name, sort_time in timings.items():
        print(f"{sort_name} Time: {sort_time:.5f} seconds")
