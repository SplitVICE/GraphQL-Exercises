from time import sleep
from os import system

commands = [
    "cd .. && npm run test"
]

while True:
    for c in commands:
        system(c)
    sleep(0.1)
