package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	//"regexp"
)

const SESSION_PREFIX = "session"
//const SESSION_PREFIX_LENGTH = len(SESSION_PREFIX)
const FILE_PATH = "assets/cstimer.json"

type Time struct {
	Phases   				[]int
	Scramble   			string
	WhatTimeAttr1   string
	Date 						float64
	SessionId				int
}

//type SessionProperties struct {
//	Name 	string
//	Opt 	string
//	Rank 	int
//}
//
//type CsTimerData struct {
//	Sessions 	[]SessionProperties
//	Times 		[]Time
//}
//
//func substr(input string, start int, length int) string {
//	asRunes := []rune(input)
//	
//	if start >= len(asRunes) {
//			return ""
//	}
//	
//	if start+length > len(asRunes) {
//			length = len(asRunes) - start
//	}
//	
//	return string(asRunes[start : start+length])
//}

func fromrawtotime(rawTime interface{}) Time {
	iTime, _ := rawTime.([]interface{})
	phases, _ := iTime[0].([]interface{})
	var intPhase []int

	for _, iPhase := range phases {
		floatPhase, _ := iPhase.(float64)
		intPhase = append(intPhase, int(floatPhase))
	}

	iScrambleTime, _ := iTime[1].(string)
	iWhatTimeAttr1Time, _ := iTime[2].(string)
	iDateTime, _ := iTime[3].(float64)

	return Time{
		Phases: intPhase,
		Scramble: iScrambleTime,
		WhatTimeAttr1: iWhatTimeAttr1Time,
		Date: iDateTime,
	}
}

func main() {

  // Open our jsonFile
	jsonFile, err := os.Open(FILE_PATH)
	// if we os.Open returns an error then handle it
	if err != nil {
			fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	//var fileData map[string]interface{}
	var fileData map[string]interface{}
	//var mappedData = CsTimerData{}

	//var sessionData map[int]interface{}
	csTimerUnMarshalErr := json.Unmarshal([]byte(byteValue), &fileData)
	if csTimerUnMarshalErr != nil {
		fmt.Println(csTimerUnMarshalErr)
	}
	
	// iterate in each key of the cs time
	for iSession, iSessionData := range fileData {
		// check if it is a sessions
		if strings.HasPrefix(iSession, SESSION_PREFIX) {
			// if session convert array of time
			if mappedISessionData, ok := iSessionData.([]interface{}); ok {
				// if there is times
				if (len(mappedISessionData) > 0) {
					// convert time data
					var toto = fromrawtotime(mappedISessionData[0])
					fmt.Println(toto)
				}
			}
		}
	}
}
