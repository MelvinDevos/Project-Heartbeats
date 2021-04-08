USE Heartbeats_dev;

SELECT * FROM songs;

SELECT  id
       ,name
       ,yt_link
FROM songs
WHERE id IN ( 
SELECT  song_id
FROM playlist_songs
WHERE playlist_id IN ( 
SELECT  id
FROM playlist
WHERE patient_id = 2)); 