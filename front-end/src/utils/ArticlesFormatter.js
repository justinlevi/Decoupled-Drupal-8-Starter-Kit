const formatData = data => data.nodeQuery.articles.map((article) => {
  let image = '';
  const item = {
    access: article.access,
    title: article.title,
    nid: article.nid,
    uuid: article.uuid,
    entityUrl: article.entityUrl,
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


export const normalizeArticleImages = article => article.images.map(({ entity = {}, mid }) => {
  if (entity && entity.image && entity.image.derivative && entity.image.derivative.url) {
    const { image: { derivative: { url }, file: { filesize, filename } } } = entity;
    return {
      mid,
      url,
      fileSize: filesize,
      fileName: filename,
    };
  }
  return null;
});

export default formatData;

