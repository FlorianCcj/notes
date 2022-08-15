package utils

func readConfigFile() {
	// read config files
	viper.SetConfigName("rubik.config.yml")
	viper.SetConfigType("yaml")
	viper.AddConfigPath("/etc/appname/")
	viper.AddConfigPath("$HOME/.appname")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig() // Find and read the config file
	if err != nil { // Handle errors reading the config file
		panic(fmt.Errorf("fatal error config file: %w", err))
	}
}
