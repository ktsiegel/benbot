import sqlite3

from dataclasses import dataclass
from typing import Optional


# TODO: maybe use an actual ORM
@dataclass
class Practice:
    id: int
    created: str
    content: str
    stroke: Optional[str]

    @classmethod
    def from_row(cls, row):
        return cls(**row)

    def dict(self):
        return {
            'id': self.id,
            'created': self.created,
            'content': self.content.split('\n'),
            'stroke': self.stroke
        }


class PracticeDB:
    def get_db_connection(self):
        conn = sqlite3.connect('database.db')
        conn.row_factory = sqlite3.Row
        return conn
    
    def get_all_practices(self):
        with self.get_db_connection() as conn:
            cursor = conn.cursor()
            rows = cursor.execute("SELECT * FROM practices").fetchall()
            cursor.close()
            return [Practice.from_row(r) for r in rows]

    def get_practices_by_stroke(self, stroke):
        with self.get_db_connection() as conn:
            cursor = conn.cursor()
            rows = cursor.execute(f"SELECT * FROM practices where stroke = '{stroke}'").fetchall()
            cursor.close()
            return [Practice.from_row(r) for r in rows]

    def insert_practice(self, content, stroke):
        with self.get_db_connection() as conn:
            cursor = conn.cursor()
            print(f"Inserting new practice into db: {content}, {stroke}")
            rows = cursor.execute("INSERT INTO practices(content, stroke) VALUES (?, ?)", (content, stroke))
            cursor.close()

