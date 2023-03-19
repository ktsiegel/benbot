import sqlite3

"""
Run this script to bootstrap the SQLite DB.
"""

if __name__=="__main__":
    connection = sqlite3.connect('database.db')

    with open('scripts/schema.sql') as f:
        connection.executescript(f.read())

    cur = connection.cursor()
    connection.close()
