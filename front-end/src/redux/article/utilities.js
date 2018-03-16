export const generateImageUrlMid = (images) => {
  const newImages = images.map(image => (
    { url: image.entity.image.derivative.url, mid: image.mid }
  ));
  return newImages;
}

export const formatFetchArticlesResult = result => result.data.user.nodes.articles.map((node) => {
  const newNode = { ...node };
  newNode.images = generateImageUrlMid(node.images);
  return newNode;
});

export const removeArticleFromArticles = (articles, nid) => {
  const newArticles = articles.slice();
  const index = newArticles.findIndex(item => item.nid === nid);
  if (index === -1) { return false; }
  newArticles.splice(index, 1);
  return newArticles;
};

export const updateArticlesWithArticle = (articles, page) => {
  const newArticles = articles.slice();
  const index = newArticles.findIndex(item => item.nid === page.nid);
  if (index === -1) { return newArticles; }
  newArticles[index] = page;
  return newArticles;
};

export const getArticleFromNid = (articles, nid) => {
  const index = articles.findIndex(item => item.nid === nid);
  return articles[index];
};
