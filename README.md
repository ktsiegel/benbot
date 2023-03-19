# benbot

* Set up virtualenv: `source env/bin/activate`
* Run `gunicorn server:app`
* Run `python scripts/init_db.py` to bootstrap the SQLite DB.
* Run `python server.py` to start the Flask server.
* To run the frontend, `cd` into `app/` and run `npm run dev`
