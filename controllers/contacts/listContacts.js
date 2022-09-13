const { Contact } = require("../../models");

const listContacts = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite: favoriteQuery } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit: Number(limit),
    }).populate("owner");

    if (favoriteQuery) {
        const resultFiltered = result.filter(
            ({ favorite }) => favorite.toString() === favoriteQuery
        );
        res.json({ data: resultFiltered });
    } else {
        res.json({
            status: "success",
            code: 200,
            data: result,
        });
    }
};

module.exports = listContacts;
