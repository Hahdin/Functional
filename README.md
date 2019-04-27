# Functional Programming

> Functional code is characterised by one thing: the absence of side effects. It doesn’t rely on data outside the current function, and it doesn’t change data that exists outside the current function. Every other “functional” thing can be derived from this property. Use it as a guide rope as you learn. - [A practical introduction to functional programming][exampleSite]

## The Examples
The race.js and bands.js are based on examples at [the referenced link][exampleSite]. The originals are coded in Python.

### race.js
The imperative equivalent is given as follows:
```py
from random import random

time = 5
car_positions = [1, 1, 1]

while time:
    # decrease time
    time -= 1

    print ''
    for i in range(len(car_positions)):
        # move car
        if random() > 0.3:
            car_positions[i] += 1

        # draw car
        print '-' * car_positions[i]
```

> [The code is written imperatively. A functional version would be declarative. It would describe what to do, rather than how to do it.][exampleSite]

### bands.js

The imperative equivalent is given as follows:
```py

bands = [{'name': 'sunset rubdown', 'country': 'UK', 'active': False},
         {'name': 'women', 'country': 'Germany', 'active': False},
         {'name': 'a silver mt. zion', 'country': 'Spain', 'active': True}]

def format_bands(bands):
    for band in bands:
        band['country'] = 'Canada'
        band['name'] = band['name'].replace('.', '')
        band['name'] = band['name'].title()

format_bands(bands)

print bands
# => [{'name': 'Sunset Rubdown', 'active': False, 'country': 'Canada'},
#     {'name': 'Women', 'active': False, 'country': 'Canada' },
#     {'name': 'A Silver Mt Zion', 'active': True, 'country': 'Canada'}]
```

> [Worries are stirred by the name of the function. “format” is very vague. Upon closer inspection of the code, these worries begin to claw. Three things happen in the same loop. The 'country' key gets set to 'Canada'. Punctuation is removed from the band name. The band name gets capitalized. It is hard to tell what the code is intended to do and hard to tell if it does what it appears to do. The code is hard to reuse, hard to test and hard to parallelize.][exampleSite]

[exampleSite]: https://maryrosecook.com/blog/post/a-practical-introduction-to-functional-programming