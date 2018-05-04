const formatData = data => data.nodeQuery.articles.map((article) => {
  const {
    access, title, nid, uuid, entityUrl, images, image,
  } = article;
  const item = {
    access,
    title,
    nid,
    uuid,
    entityUrl,
    url: '',
  };

  if (images) {
    if (images.length) {
      if (images[0].entity) {
        const { url } = images[0].entity.image.max;
        item.url = url;
      }
    } else if (image && image.max && image.max.url) {
      item.url = image.max.url;
    }
  }


  return item;
});


export const normalizeArticleImages = article => article.images.map(({ entity = {}, mid }) => {
  if (entity && entity.image && entity.image.max && entity.image.max.url) {
    const { image: { max: { url }, file: { filesize, filename } } } = entity;
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

