import { hashSync } from 'bcrypt';

const getNotFoundError = () => {
  const notFoundError = new Error(`Data not found`);
  notFoundError.status = 404;
  return notFoundError;
};

export const getOne = model => async (req, res) => {
  const doc = await model
    .findOne({ _id: req.params.id })
    .lean()
    .exec();

  if (!doc) {
    throw getNotFoundError();
  }

  return res.status(200).json({ data: doc });
};

export const getMany = model => async (req, res) => {
  const docs = await model
    .find()
    .lean()
    .exec();

  if (docs.length === 0) {
    throw getNotFoundError();
  }

  return res.status(200).json({ data: docs });
};

export const createOne = model => async (req, res) => {
  const doc = await model.create(req.body);
  res.status(201).json({ data: doc });
};

export const updateOne = model => async (req, res) => {
  const updatedDoc = await model
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    )
    .lean()
    .exec();

  if (!updatedDoc) {
    throw getNotFoundError();
  }

  return res.status(200).json({ data: updatedDoc });
};

export const removeOne = model => async (req, res) => {
  const removed = await model.findOneAndRemove({
    _id: req.params.id,
  });

  if (!removed) {
    throw getNotFoundError();
  }

  return res.status(200).json({ data: removed });
};

export const createOneUser = model => async (req, res) => {
  let { body, user } = req;

  let User = new model({
    ...body,
    password: hashSync(`${body.password}`, 10),
  });

  User.save((err, dbUser) => {
    if (err) {
      res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      user: dbUser,
      createdBy: user._id,
    });
  });
};

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
  createOneUser: createOneUser(model),
});
