import random

SECRET_KEY = ''.join([random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)') for i in range(50)])

SECRET_FILE = open("secret.txt","w+")

SECRET_FILE.write(SECRET_KEY)