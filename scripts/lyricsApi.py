import sys
from lyricsgenius import Genius

genius = Genius("0JlpcqqinzZiVZ2b0aL28BUVHpM1mRiFDuHcVKwaLpCklu7VcMfrDljUa2TJYYJ3")
sys.stdout.reconfigure(encoding='utf-8')


def main():
    song_title = sys.argv[1]
    artist_name = sys.argv[2]
    song = genius.search_song(song_title, artist_name)
    print("Lyrics: ", song.lyrics)

if __name__ == "__main__":
    main()

