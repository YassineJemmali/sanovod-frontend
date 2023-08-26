export const generateYoutubeIframe = (youtubeLink) => {
  if (youtubeLink) {
    const videoId = youtubeLink.split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
      <iframe
        width="100%"
        height="315"
        src={embedUrl}
        title="Bande-annonce"
        frameBorder="0"
        allowFullScreen
      />
    );
  }
  return null;
};
