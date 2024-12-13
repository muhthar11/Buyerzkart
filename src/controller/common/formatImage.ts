export const formatImage = ({ file, source }: any) => {
  if (source === "imageKit") {
    return {
      url: file.url,
      width: file.width,
      height: file.height,
      name: file.name,
      size: file.size,
      thumbnailUrl: file.thumbnailUrl,
      source: "imageKit",
      metaData: file,
    };
  }
};
