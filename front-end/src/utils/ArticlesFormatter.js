const formatData = data => data.nodeQuery.articles.map((article) => {
  let image = '';
  const item = {
    title: article.title,
    nid: article.nid,
    uuid: article.uuid,
  };

  if (article.images) {
    if (article.images.length) {
      if (article.images[0].entity) {
        image = article.images[0].entity.image.derivative.url;
        item.image = image;
      }
    }
  }

  return item;
});

export default formatData;
