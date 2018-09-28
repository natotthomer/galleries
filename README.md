# Galleries App

### A pretty basic galleries application.

## Live Site

The live site is available at [https://galleries-noh.herokuapp.com](https://galleries-noh.herokuapp.com)

## Technologies Used

For this project, I used the following:

* JavaScript
* Python
* React
* React Router
* WHATWG Fetch API
* Django
* Postgres (in production)
* Sqlite3 (in development)
* Webpack
* Babel
* Gunicorn
* Amazon S3

## Requirements

In order to spin this up, you'll have to: 

* clone the repo
* `cd` into the directory
* `virtualenv -p python3 env`
* `source env/bin/activate`
* `export DJANGO_DEBUG=True`
* `pip install -r requirements.txt`
* `python make-secret.py`
* `python manage.py migrate`
* `npm install`
* `webpack`
* `python manage.py runserver`

## Improvements

There are a number of improvements I'd like to make, but I'll try to be brief:

* If the project grew larger, I think a global store along the lines of Redux or MobX would be useful. I've not used MobX, but I believe the startup pains are smaller, but some of the debugging becomes more difficult. I like Redux, but it is not for every project
* Similarly, if this grew larger, I would opt for a combination of SASS (or LESS) over traditional CSS and for a BEM-like class architecture. These will help organize and minimize the code base.
* Ideally, I would have done this in Docker, but I'm new to it and wanted to go with a deployment route I was more comfortable with
* I'd love to make this into a sort of social app, where you can look at the most popular galleries by various metrics (all time, this week, etc.), sort of like how you can sort Subreddits.
* Along the same lines, adding a UserProfile model would have been a nice thing to add. It would certainly add to the "social" feel of the app.
* Adding basic route-based code-splitting would be a nice and relatively simple feature that would help improve load times, especially as the project scales.
* Adding a system to pre-view the images selected before actually uploading or saving them would be very nifty.
* If I were building this out for real, I'd probably make a custom User model so that I could add custom methods to it (a serializer method, for example). It's sometimes a bit tricky, so it's best to do early in the dev process.
* I'm not entirely happy with how I handled errors, both on the frontend and the backend. I think especially the frontend is a bit brittle and if I were to do this project again, I'd start by slightly reorganizing my React components in order to ease up on some of that. This is an area where some sort of global store (or stores) would probably come in handy in that I'd be able to more effortlessly push the right errors into the right components rather than checking what the errors look like. If I had more time, this would be a first priority (but it may involve a larger structuraly/architectural reimagining).