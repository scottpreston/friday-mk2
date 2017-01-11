import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(03, GPIO.OUT)
GPIO.output(03, GPIO.HIGH)
GPIO.cleanup()
