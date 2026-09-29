const clothingItem = require("../models/clothingItems.js");
const {
  BAD_REQUEST_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SERVER_ERROR_CODE,
} = require("../utils/errors");

const getItems = (req, res) => {
  clothingItem
    .find({})
    .then((clothingItems) => res.status(200).send(clothingItems))
    .catch((err) => {
      console.log(err);
      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "Requested resource not found" });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner, like, createAt } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner, like, createAt })
    .then((clothingItem) => res.status(201).send(clothingItem))
    .catch((err) => {
      console.error(err);
      if (err.name === "validationError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndDelete(itemId)
    .orFail()
    .then((clothingItem) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: "Requested resource not found" });
      } else if (err.name === "DocumentNotFoundError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE)
          .send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "Requested resource not found" });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_ERROR_CODE0)
          .send({ message: err.message });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: err.message });
      }

      return res
        .status(SERVER_ERROR_CODE)
        .send({ message: "Requested resource not found" });
    });
};

const dislikeItem = (req, res) => {
  req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
      .orFail()
      .then((item) => res.status(200).send(item))
      .catch((err) => {
        if (err.name === "CastError") {
          return res
            .status(BAD_REQUEST_ERROR_CODE)
            .send({ message: err.message });
        }

        if (err.name === "DocumentNotFoundError") {
          return res
            .status(NOT_FOUND_ERROR_CODE)
            .send({ message: err.message });
        }

        return res
          .status(SERVER_ERROR_CODE)
          .send({ message: "Requested resource not found" });
      });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
