void setup() {
  // initialize serial communication at 9600 bits per second:
  Serial.begin(9600);
}

// the loop routine runs over and over again forever:
void loop() {
  // read the input on analog pin 0:
  int s1Value = analogRead(A0);
  int s2Value = analogRead(A1);
  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
  float voltage1 = s1Value * (5.0 / 1023.0);
  float voltage2 = s2Value * (5.0 / 1023.0);
  // print out the value you read:
  String vString = String(voltage1) + "~" + String(voltage2);
  Serial.println(vString);
}
