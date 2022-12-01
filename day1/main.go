package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
)

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	lineScanner := bufio.NewScanner(file)

	elves := make(map[int]int)
	elfCount := 0
	caloriesCount := 0

	for lineScanner.Scan() {
		line := lineScanner.Text()

		if line == "" {
			elves[elfCount] = caloriesCount
			elfCount += 1
			caloriesCount = 0
			continue
		}

		calories, err := strconv.Atoi(line)
		if err != nil {
			log.Fatal(err)
		}
		caloriesCount += calories
	}

	values := make([]int, 0, len(elves))
	for _, v := range elves {
		values = append(values, v)
	}
	sort.Sort(sort.Reverse((sort.IntSlice(values))))

	fmt.Println("Part 1: ", values[0])

	sumOfTop, err := sumTop(3, values)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Part 2: ", sumOfTop)
}

// sumTop adds all values of the top x
func sumTop(topX int, values []int) (int, error) {
	if len(values) == 0 {
		return 0, fmt.Errorf("values are empty")
	}
	if topX > len(values) {
		return 0, fmt.Errorf("%d is not valid. choose between 1 and %d", topX, len(values))
	}
	sum := 0
	for i := 0; i < topX; i++ {
		sum += values[i]
	}
	return sum, nil
}
