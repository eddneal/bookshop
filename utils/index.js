import {curry, compose} from 'ramda';

const objectAssign = curry((extensionObject, originalObject) => Object.assign(originalObject, extensionObject));

const removeEntryFromObject = curry((keyToRemove, object) => {
  const  {[keyToRemove]: value, ...keywordsToKeep } = object;
  return keywordsToKeep;
});

export const convertKeywordsStringToObject = keywordsString => {
  return keywordsString.split(',')
    .reduce((acc, i) => {
        const keywordPairs = i.split(':');
        return keywordPairs[1]
          ? Object.assign(acc, {[keywordPairs[0]]: keywordPairs[1]})
          : Object.assign(acc, {keyword: keywordPairs[0]});
      },
      {});
};

export const convertKeywordsObjectToString = keywordsObject => {
  const {keyword, ...otherKeywords} = keywordsObject;
  const otherKeywordsEntries = Object.entries(otherKeywords);

  return (!keyword && otherKeywordsEntries.length === 0)
    ? ''
    : otherKeywordsEntries.reduce((acc, i, n, a) => `${acc}${i[0]}:${i[1]}${n + 1 === a.length ? '' : ','}`,
      keyword ? `${keyword}${otherKeywordsEntries.length ? ',' : ''}` : '');
};

export const addKeyword = (keywordString, keywordToAdd) => {
  const composeKeyword = compose(convertKeywordsObjectToString, objectAssign(keywordToAdd), convertKeywordsStringToObject);
  return composeKeyword(keywordString);
};

export const removeKeyword = (keywordString, keywordToRemove) => {
  const composeRemoveKeyword = compose(convertKeywordsObjectToString, removeEntryFromObject(keywordToRemove), convertKeywordsStringToObject);
  return composeRemoveKeyword(keywordString);
};

export const shallowParseInts = (objectA, objectB) => {
  return Object.entries(objectB).reduce((acc, el) => {
    return { ...acc, [el[0]]: typeof objectA[el[0]] === 'number' ? parseInt(el[1], 10) : el[1] };
  }, {});
};
