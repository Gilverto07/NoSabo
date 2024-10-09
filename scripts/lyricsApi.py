import sys
from lyricsgenius import Genius

genius = Genius("0JlpcqqinzZiVZ2b0aL28BUVHpM1mRiFDuHcVKwaLpCklu7VcMfrDljUa2TJYYJ3")
sys.stdout.reconfigure(encoding='utf-8')

def get_song_details(songs):
    return [{'fullTitle': song['result']['full_title'], 'artist': song['result']['artist_names']} for song in songs['hits']]

def main():

    if len(sys.argv) == 3:
        song_title = sys.argv[1]
        artist_name = sys.argv[2]
        song = genius.search_song(song_title, artist_name)
        print(song.lyrics)
    else: 
        search_term = sys.argv[1]
        request = genius.search_songs(search_term, per_page = 5)
        song_details = get_song_details(request)
        print(song_details)



if __name__ == "__main__":
    main()

