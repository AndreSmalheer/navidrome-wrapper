from flask import Flask, render_template, jsonify
import sqlite3
import os

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/list_all_albums")
def list_all_albums():
    base_dir = os.path.dirname(__file__)
    db_path = os.path.join(base_dir, "../navidrome/data/navidrome.db")

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM album")
    rows = cursor.fetchall()

    column_names = [description[0] for description in cursor.description]

    conn.close()

    if not rows:
        return jsonify({"message": "no albums found"})

    albums = []
    for row in rows:
        album_dict = dict(zip(column_names, row))
        albums.append(album_dict)

    return jsonify(albums)

if __name__ == "__main__":
    app.run(debug=True)





def list_all_songs_in_album(album_id):
    base_dir = os.path.dirname(__file__)
    db_path = os.path.join(base_dir, "../navidrome/data/navidrome.db")
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM media_file WHERE album_id = ?", (album_id,))
    
    rows = cursor.fetchall()
    if(rows != []):
     for row in rows:
         print(row)
    else:
        print("no albums found")     
    
    conn.close()
 