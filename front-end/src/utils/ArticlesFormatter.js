const formatData = data => data.nodeQuery.entities.map((val) => {
  let image = '';
  const item = {
    label: val.entityLabel,
    nid: val.nid,
  };

  if (val.fieldMediaImage) {
    if (val.fieldMediaImage.length) {
      if (val.fieldMediaImage[0].entity) {
        image = val.fieldMediaImage[0].entity.image.derivative.url;
        item.image = image;
      }
    }
  }

  return item;
});

export default formatData;
