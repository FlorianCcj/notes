import { getObjectFromFile, writeObjectInFile } from './file_manager';

const doItExist = (res, id) => {
  return !!res.find(data => data.id === id);
};

const isObject = a => (!!a) && (a.constructor === Object);

const isArray = a => (!!a) && (a.constructor === Array);

function findMaxId(arr) {
  let max = 0;
  if (isArray(arr)) {
    for (let i = 0, len = arr.length; i < len; i += 1) {
      const totest = arr[i];
      if (isObject(totest) && totest.hasOwnProperty('id')) {
        const v = arr[i].id;
        max = (v > max) ? v : max;
      }
    }
  }
  return max;
}

class AbstractModel {
  constructor(model) {
    this.model = model;
    this.file = `data/${this.model}.data.json`;
    this.makefile().then();
  }

  async create(objectToCreate) {
    await getObjectFromFile(this.file).then((res) => {
      const newId = findMaxId(res) + 1;
      const newRes = [...res, { ...objectToCreate, id: newId }];
      writeObjectInFile(newRes, this.file).then();
    });
    return { status: 201 };
  }

  async read(id) {
    return await getObjectFromFile(this.file).then((res) => {
      if (doItExist(res, id)) {
        return res.find(data => data.id === id);
      }
      return {status: 404};
    });
  }

  async list() {
    return await getObjectFromFile(this.file).then(res => res);
  }

  async update(objectToEdit) {
    if (isObject(objectToEdit) && objectToEdit.hasOwnProerty('id')) {
      await getObjectFromFile(this.file).then((res) => {
        if (doItExist(res, objectToEdit.id)) {
          writeObjectInFile(
            [...res.filter(data => data.id !== objectToEdit.id), objectToEdit],
            this.file,
          ).then();
        }
      });
    } else {
      {status: 400};
    }
  }

  async delete(id) {
    await getObjectFromFile(this.file).then((res) => {
      if (doItExist(res, id)) {
        writeObjectInFile(res.filter(data => data.id !== id), this.file).then(
          () => ({ status: 201 }),
        );
      }
    });
  }

  async makefile() {
    await getObjectFromFile(this.file).catch(() => writeObjectInFile([], this.file).then());
  }
}

export { AbstractModel };
