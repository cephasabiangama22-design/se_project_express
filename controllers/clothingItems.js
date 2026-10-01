const ClothingItem = require("../models/clothingItems");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.error(err);
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner, like, createAt } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner, like, createAt })
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "validationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
      return res.status(SERVER_ERROR_CODE).send({
        message: "An error has occurred on the server",
      });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Requested resource not found" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.status(200).send(clothingItem))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
