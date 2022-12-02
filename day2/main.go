package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"strings"
)

var (
	win  int = 6
	draw int = 3
	rock     = &Shape{
		name:   "Rock",
		points: 1,
	}
	paper = &Shape{
		name:   "Paper",
		points: 2,
	}
	scissors = &Shape{
		name:   "Scissors",
		points: 3,
	}
)

type Shape struct {
	name   string
	points int
}

func main() {
	file, err := os.Open("./input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	lineScanner := bufio.NewScanner(file)

	playerScore := 0
	compScore := 0
	elfScore := 0

	for lineScanner.Scan() {
		line := lineScanner.Text()
		game := strings.Fields(line)
		p, c := calculateScore(game[1], game[0])
		playerScore += p
		compScore += c

		s := elfStrategyBasedCalulation(game[1], game[0])
		elfScore += s
	}
	fmt.Println("-----")
	fmt.Println("Part1:", playerScore, "Punkte")
	fmt.Println("Part2:", elfScore, "Punkte")
}

func calculateScore(user, comp string) (scoreUser, scoreComp int) {
	userShape, err := getShapeByInput(user)
	if err != nil {
		log.Fatal(err)
	}
	compShape, err := getShapeByInput(comp)
	if err != nil {
		log.Fatal(err)
	}

	if userShape.name == compShape.name {
		return draw + userShape.points, draw + compShape.points
	}

	switch userShape.name {
	case "Rock":
		if compShape.name == "Paper" {
			return userShape.points, win + compShape.points
		}
		if compShape.name == "Scissors" {
			return win + userShape.points, compShape.points
		}
	case "Paper":
		if compShape.name == "Rock" {
			return win + userShape.points, compShape.points
		}
		if compShape.name == "Scissors" {
			return userShape.points, win + compShape.points
		}
	case "Scissors":
		if compShape.name == "Rock" {
			return userShape.points, win + compShape.points
		}
		if compShape.name == "Paper" {
			return win + userShape.points, compShape.points
		}
	}
	return 0, 0
}

func elfStrategyBasedCalulation(user, comp string) (scoreUser int) {
	compShape, err := getShapeByInput(comp)
	if err != nil {
		log.Fatal(err)
	}

	switch compShape.name {
	case "Rock":
		if user == "X" {
			return scissors.points
		}
		if user == "Y" {
			return draw + rock.points
		}
		if user == "Z" {
			return win + paper.points
		}
	case "Paper":
		if user == "X" {
			return rock.points
		}
		if user == "Y" {
			return draw + paper.points
		}
		if user == "Z" {
			return win + scissors.points
		}
	case "Scissors":
		if user == "X" {
			return paper.points
		}
		if user == "Y" {
			return draw + scissors.points
		}
		if user == "Z" {
			return win + rock.points
		}
	}
	return 0
}

func getShapeByInput(input string) (*Shape, error) {
	switch input {
	case "A", "X":
		return rock, nil
	case "B", "Y":
		return paper, nil
	case "C", "Z":
		return scissors, nil
	}
	return nil, fmt.Errorf("shape %q not found.", input)
}
