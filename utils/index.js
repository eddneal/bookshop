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
  const keywordsObject = convertKeywordsStringToObject(keywordString);
  const newKeywords = Object.assign(keywordsObject, keywordToAdd);
  return convertKeywordsObjectToString(newKeywords);
};

export const removeKeyword = (keywordString, keywordToRemove) => {
  const keywordsObject = convertKeywordsStringToObject(keywordString);
  const  {[keywordToRemove]: value, ...keywordsToKeep } = keywordsObject;
  return convertKeywordsObjectToString(keywordsToKeep);
};
