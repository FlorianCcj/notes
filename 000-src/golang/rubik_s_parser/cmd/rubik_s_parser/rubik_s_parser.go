package main

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
