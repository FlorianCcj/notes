package main
// github.com/florianccj/rubik_s_parser

import "github.com/spf13/viper"

import (
	"github.com/florianccj/utils"
)

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"strings"
	"strconv"
	//"regexp"
)

const SESSION_PREFIX = "session"
const SESSION_PREFIX_LENGTH = len(SESSION_PREFIX)
const FILE_PATH = "assets/cstimer.json"

//func readConfigFile() {
//	// read config files
//	viper.SetConfigName("rubik.config.yml")
//	viper.SetConfigType("yaml")
//	viper.AddConfigPath("/etc/appname/")
//	viper.AddConfigPath("$HOME/.appname")
//	viper.AddConfigPath(".")
//	err := viper.ReadInConfig() // Find and read the config file
//	if err != nil { // Handle errors reading the config file
//		panic(fmt.Errorf("fatal error config file: %w", err))
//	}
//}

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

func openjsonfile(filePath string) map[string]interface{} {
	// Open our jsonFile
	jsonFile, err := os.Open(filePath)
	// if we os.Open returns an error then handle it
	if err != nil {
			fmt.Println(err)
	}
	fmt.Println("Successfully Opened users.json")
	// defer the closing of our jsonFile so that we can parse it later on
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	var fileData map[string]interface{}

	err = json.Unmarshal([]byte(byteValue), &fileData)
	if err != nil {
		fmt.Println(err)
	}

	return fileData
}

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

func fromsessionnametoid (sessionName string) int {
	idSession, _ := strconv.Atoi(string(sessionName[SESSION_PREFIX_LENGTH:]))
	return idSession
}

func main() {

	readConfigFile()
	fmt.Println("'toto'", viper.Get("session_prefix"))

	fileData := openjsonfile(FILE_PATH)

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
					toto.SessionId = fromsessionnametoid(iSession)
					fmt.Println(toto)
				}
			}
		}
	}
}
