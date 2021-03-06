DROP DATABASE IF EXISTS Heartbeats_dev;

CREATE database Heartbeats_dev;

USE Heartbeats_dev;

CREATE TABLE `admin` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL unique,
  `password` varchar(1024) NOT NULL,
  `level` int NOT NULL
);

CREATE TABLE `patient` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `box_id` varchar(255),
  `type_dementia` varchar(255),
  `hr_tresh` int DEFAULT 90
);

CREATE TABLE `songs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `yt_link` varchar(255) NOT NULL
);

CREATE TABLE `playlist_songs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `playlist_id` int NOT NULL,
  `song_id` int NOT NULL
);

CREATE TABLE `playlist` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `patient_id` int NOT NULL,
  `name` varchar(255) NOT NULL
);

ALTER TABLE `playlist` ADD FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`) ON DELETE CASCADE;

ALTER TABLE `playlist_songs` ADD FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE;

ALTER TABLE `playlist_songs` ADD FOREIGN KEY (`song_id`) REFERENCES `songs` (`id`);



