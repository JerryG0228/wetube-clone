import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log("error", error.value);
    return res.send("<h1>ERROR</h1>");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id); //DB에서 해당 ID와 일치하는 document를 찾아서 반환
  console.log(video);
  return res.render("Watch", { pageTitle: video.title, video });
};

export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing:` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload video" });
};

export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => (word[0] === "#" ? word : `#${word}`)),
    });
    return res.redirect(`/`);
  } catch (error) {
    console.log("You failed to upload a new video.");
    return res.render("upload", { pageTitle: "Upload video", errorMessage: error._message });
  }
};
