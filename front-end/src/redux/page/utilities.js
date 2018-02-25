export const formatFetchPageResult = result => result.data.user.nodes.pages.map((node) => {
  const newNode = { ...node };
  newNode.images = newNode.images.map(image => (
    { url: image.entity.image.derivative.url, mid: image.mid }
  ));
  return newNode;
});

export const removePageFromPages = (pages, nid) => {
  const newPages = pages.slice();
  const index = newPages.findIndex(item => item.nid === nid);
  if (index === -1) { return false; }
  newPages.splice(index, 1);
  return newPages;
};

export const updatePagesWithPage = (pages, page) => {
  const newPages = pages.slice();
  const index = newPages.findIndex(item => item.nid === page.nid);
  if (index === -1) { return newPages; }
  newPages[index] = page;
  return newPages;
};

export const getPageFromNid = (pages, nid) => {
  const index = pages.findIndex(item => item.nid === nid);
  return pages[index];
};
