const formatData = data => data.nodeQuery.entities.map((entity) => {
  let image = '';
  const item = {
    title: entity.title,
    nid: entity.nid,
  };

  if (entity.images) {
    if (entity.images.length) {
      if (entity.images[0].entity) {
        image = entity.images[0].entity.image.derivative.url;
        item.image = image;
      }
    }
  }

  return item;
});

export default formatData;
