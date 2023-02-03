const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const models = require("../models");

const avatarDirectory = process.env.AVATAR_DIRECTORY || "public/";
const imageDirectory = process.env.AVATAR_DIRECTORY || "public/";

// Gestion Avatars
const renameAvatar = (req, res, next) => {
  // On récupère le nom du fichier
  const { originalname } = req.file;

  // On récupère le nom du fichier
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${avatarDirectory}${filename}`,
    `${avatarDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.avatar = `${uuid}-${originalname}`;
      next();
    }
  );
};

const sendAvatar = (req, res) => {
  const { fileName } = req.params;

  res.download(avatarDirectory + fileName, fileName, (err) => {
    if (err) {
      res.status(404).send({
        message: `Avatar not found.`,
      });
    }
  });
};

const updateAvatar = (req, res) => {
  const id = req.payloads.sub;
  const { avatar } = req;

  models.user
    .updateAvatar(id, avatar)
    .then(([result]) => {
      if (result.affectedRows === 0) res.sendStatus(404);
      else res.status(202).send({ avatar });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const browse = (req, res) => {
  models.image
    .findAll()
    .then(([results]) => {
      res.send(results);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  const { id } = req.params;

  models.image
    .find(id)
    .then(([results]) => {
      if (!results[0]) {
        res.sendStatus(404);
        return;
      }
      const image = results[0];
      models.comment
        .getComments(req.params.id)
        .then(([imageComments]) => {
          image.comment = imageComments;
          res.send(image);
        })
        .catch((err) => {
          console.error(err);
          res.sendStatus(500);
        });
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const [results] = await models.image.find(id);
    const imageName = results[0].name;

    const [result] = await models.image.delete(id);
    if (result.affectedRows === 0) res.sendStatus(404);
    else {
      fs.unlink(`${imageDirectory}${imageName}`, (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const renameImage = (req, res, next) => {
  // On récupère le nom du fichier
  const { originalname } = req.file;

  // On récupère le nom du fichier
  const { filename } = req.file;

  // On utilise la fonction rename de fs pour renommer le fichier
  const uuid = uuidv4();
  fs.rename(
    `${imageDirectory}${filename}`,
    `${imageDirectory}${uuid}-${originalname}`,
    (err) => {
      if (err) throw err;
      req.img = `${uuid}-${originalname}`;
      next();
    }
  );
};

const uploadImage = (req, res) => {
  const image = req.body;
  const imageName = req.img;

  models.image
    .insert(image, imageName)
    .then(([result]) => {
      res.status(201).location(`/api/image/${result.insertId}`).send();
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const sendImage = (req, res) => {
  const { fileName } = req.params;

  res.download(imageDirectory + fileName, fileName, (err) => {
    if (err) {
      console.error("error download: ", err);
    }
  });
};

module.exports = {
  renameAvatar,
  sendAvatar,
  updateAvatar,
  sendImage,
  renameImage,
  uploadImage,
  destroy,
  read,
  browse,
};
