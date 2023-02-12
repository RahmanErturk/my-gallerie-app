/*
TODO
x (- Faker-Package installieren)
x (- npm Script einrichten)
x - Faker importieren
x - Models importieren
x - Verbindung zur DB herstellen
x - Collections leeren (deleteMany())
 - 100 Datensätze laut Schema erzeugen (einzelne Objekte, die als Documents gespeichert werden)
 - Datensätze in DB speichern
 - Error Handling
*/

console.log("run seed script");

import { faker } from "@faker-js/faker";
import Photo from "./models/Photo.js";
import Album from "./models/Album.js";
import "./lib/mongoose.js";

const albums = [];

const createPhotographer = () => ({
  firstName: faker.hacker.adjective(),
  lastName: faker.hacker.noun(),
  email: faker.internet.email(),
});

const addPhoto = async () => {
  const index = Math.floor(Math.random() * 5);
  const newPhoto = new Photo({
    price: faker.commerce.price(),
    url: faker.image.image(640, 480, true),
    date: faker.date.past(),
    theme: faker.word.noun(),
    photographer: createPhotographer(),
    album: albums[index],
    // photographers: [
    //   createPhotographer(),
    //   createPhotographer(),
    //   createPhotographer(),
    // ],
  });

  await newPhoto.save();
};

const createAlbum = async () => {
  const newAlbum = new Album({
    name: faker.word.noun(),
    date: faker.date.past(),
    creator: faker.name.fullName(),
  });

  const result = await newAlbum.save();
  albums.push(result._id);
};

const addPhotos = async (count = 20) => {
  for (let i = 0; i < count; i++) {
    console.log("creating photo: ", i + 1);
    await addPhoto();
  }
};

const createAlbums = async (count = 20) => {
  for (let i = 0; i < count / 4; i++) {
    console.log("creating album: ", i + 1);
    await createAlbum();
  }
};

try {
  if (!process.argv.includes("doNotDelete")) {
    console.log("deleting all photos and albums...");
    await Photo.deleteMany();
    await Album.deleteMany();
    console.log("done");
  }

  console.log("creating new photos and albums...");
  await createAlbums();
  await addPhotos(
    process.argv[2] === "doNotDelete" ? undefined : process.argv[2]
  );
  console.log("done");

  console.log("seeding finished, happy coding!");
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
