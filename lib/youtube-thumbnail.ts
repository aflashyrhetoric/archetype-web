export const getThumb = (url: string, size = "hd") => {
  if (!url) {
    return ""
  }

  const results = url.match("[\\?&]v=([^&#]*)")
  const video = results === null ? url : results[1]

  if (size === "hd") {
    return `https://img.youtube.com/vi/${video}/maxresdefault.jpg`
  }

  if (size === "small") {
    return "http://img.youtube.com/vi/" + video + "/2.jpg"
  }

  return "http://img.youtube.com/vi/" + video + "/0.jpg"
}

export const getStyleBlob = (youtube_video_url: string) => {
  return {
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url('${getThumb(youtube_video_url)}')`,
    aspectRatio: "16/9",
  }
}

//Example of usage:
// var thumb = Youtube.thumb("http://www.youtube.com/watch?v=F4rBAf1wbq4", "small")

// console.log(thumb)
