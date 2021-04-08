USE Heartbeats_dev;

INSERT INTO patient (name,box_id,type_dementia,hr_tresh) VALUES ("Melvin Devos", "mskd4646sdfs","Early stage",80);

INSERT INTO playlist (patient_id, name) VALUES (1, "Melvin custom playlist");
INSERT INTO playlist (patient_id, name) VALUES (1, "Melvin custom playlist 2");

INSERT INTO songs (name, yt_link) VALUES ("We are number one, Remix","qol5HvBR8jc");
INSERT INTO songs (name, yt_link) VALUES ("Seven Nation Army, Evokings Remix","KyZlegM0eKY");
INSERT INTO songs (name, yt_link) VALUES ("Sea Shanty - Wellerman (Official Music Video)","ErHFQ3r9K2Y");
INSERT INTO songs (name, yt_link) VALUES ("Crazy Frog","k85mRPqvMbE");
INSERT INTO songs (name, yt_link) VALUES ("Ketchup song","k85mRPqvMbE");
INSERT INTO songs (name, yt_link) VALUES ("Battle of the Fates SW","k85mRPqvMbE");

INSERT INTO playlist_songs (playlist_id, song_id) VALUES (1, 1);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (1, 3);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (1, 5);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (1, 6);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (2, 1);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (2, 2);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (2, 3);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (2, 4);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (2, 5);
INSERT INTO playlist_songs (playlist_id, song_id) VALUES (2, 6);

INSERT INTO playlist_songs(playlist_id, song_id) VALUES (1, 1);