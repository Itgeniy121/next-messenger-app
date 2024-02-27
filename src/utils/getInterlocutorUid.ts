const getInterlocutorUid = (combinedUid: string | string[], userUid: string) => {
  let uid;
  userUid == combinedUid.slice(28) ? uid = combinedUid.slice(0, 28) : uid = combinedUid.slice(28)
  return uid
};

export { getInterlocutorUid };
