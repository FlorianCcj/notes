INSTALL

pip install robotframework
pip install --upgrade robotframework
pip install robotframework==2.9.2
pip install https://github.com/robotframework/robotframework/archive/master.zip
pip uninstall robotframework
robot --version

STANDALONE USE

java -jar robotframework-3.0.jar mytests.robot
java -jar robotframework-3.0.jar --variable name:value mytests.robot
java -jar robotframework-3.0.jar rebot output.xml
java -jar robotframework-3.0.jar libdoc MyLibrary list

MODULE USE

python -m robot tests.robot
python3 -m robot.run tests.robot
jython -m robot tests.robot


GOOD PRACTICE

https://www.slideshare.net/pekkaklarck/robot-framework-dos-and-donts
https://github.com/robotframework/HowToWriteGoodTestCases/blob/master/HowToWriteGoodTestCases.rst

101: https://www.slideshare.net/pekkaklarck/robot-framework-introduction

demo:
  * https://github.com/robotframework/QuickStartGuide
  * https://github.com/robotframework/WebDemo