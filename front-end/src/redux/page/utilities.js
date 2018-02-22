export const formatFetchPageResult = result => result.data.user.nodes.entities.map((node) => {
  const newNode = { ...node };
  newNode.images = newNode.images.map(image => (
    { url: image.entity.image.derivative.url, mid: image.mid }
  ));
  return newNode;
});

export const removePageFromPages = (pages, nid) => {
  const newPages = pages.slice();
  const index = newPages.findIndex(n => n.nid === nid);
  if (index === -1) { return false; }
  newPages.splice(index, 1);
  return newPages;
};

const utilities = {
  formatFetchPageResult,
};

export default utilities;
