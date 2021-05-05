USE Heartbeats_dev;

INSERT INTO patient (name,box_id,type_dementia,hr_tresh) VALUES ("Melvin Devos", "mskd4646sdfs","Early stage",80);
INSERT INTO patient (name,box_id,type_dementia,hr_tresh) VALUES ("Bryanana", "idk","Weird stage",90);

INSERT INTO songs (name, yt_link, duration) VALUES ("We are number one, Remix","qol5HvBR8jc","5:03");
INSERT INTO songs (name, yt_link, duration) VALUES ("Seven Nation Army, Evokings Remix","KyZlegM0eKY","5:03");
INSERT INTO songs (name, yt_link, duration) VALUES ("Sea Shanty - Wellerman (Official Music Video)","ErHFQ3r9K2Y","5:03");
INSERT INTO songs (name, yt_link, duration) VALUES ("Crazy Frog","k85mRPqvMbE","5:03");
INSERT INTO songs (name, yt_link, duration) VALUES ("Ketchup song","k85mRPqvMbE","5:03");
INSERT INTO songs (name, yt_link, duration) VALUES ("Battle of the Fates SW","k85mRPqvMbE","5:03");

INSERT INTO playlist_songs (patient_id, song_id) VALUES (1, 1);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (1, 3);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (1, 5);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (1, 6);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (2, 1);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (2, 2);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (2, 3);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (2, 4);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (2, 5);
INSERT INTO playlist_songs (patient_id, song_id) VALUES (2, 6);