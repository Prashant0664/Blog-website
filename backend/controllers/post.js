const Post = require("../models/Post");
const User = require("../models/User");

exports.newPost = async (req, res) => {
  try {
    const newPost = await new Post(req.body).save();
    const datas = await User.findById(req.body.user);
    datas.posts.push(newPost._id)
    await datas.save();
    await newPost.populate("user", "name picture");
    res.json(newPost);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
exports.editPost = async (req, res) => {
  try {
    const newPost = await Post.findById(req.body.id);
    newPost.title = req.body.title;
    newPost.description = req.body.description;
    newPost.content = req.body.content;
    newPost.category = req.body.category;
    newPost.image = req.body.image;
    await newPost.save();
    return res.status(200).json(newPost);
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
exports.increaseView = async (req, res) => {
  try {
    const increaseView = await Post.findById(req.body.id);
    if (!increaseView) {
      return res.status(404).json({ message: "Post not found" });
    }
    increaseView.views += 1;
    await increaseView.save();
    res.json({ msg: "ok" });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
exports.getView = async (req, res) => {
  try {
    const increaseView = await Post.findById(req.body.id);
    res.json({ msg: "ok", view: increaseView.views });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
exports.getLikes = async (req, res) => {
  try {
    const getLikesView = await Post.findById(req.body.id);
    res.json({ msg: "ok", likes: getLikesView.likes });
  } catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
exports.increaseLike = async (req, res) => {
  try {

    const increaseLike = await Post.findById(req.body.id);

    increaseLike.likes += 1;
    await increaseLike.save();
    res.json({ msg: "ok" });
  }
  catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });
  }
}
exports.decreastLike = async (req, res) => {
  try {
    const increaseLike = await Post.findById(req.body.id);
    if (increaseLike) {
      increaseLike.likes -= 1;
      if (increaseLike.likes < 0) {
        increaseLike.likes = 0;
      }
      await increaseLike.save();
    }
    return res.json({ msg: "ok" });
  }
  catch (error) {
    // console.log(error)
    return res.status(500).json({ message: error.message });

  }
}
exports.postcomment = async (req, res) => {
  try {
    const { name,
      image,
      content,
      id1,
      id2 } = req.body;
    const user = await Post.findOne({ user: id2 });
    // var n = user.comment.size();
    const date = new Date();

    var ndata = {
      comment: content,
      image: image,
      commentBy: id1,
      commentAt: date,
      name: name
    }
    var datas = user.comments;
    datas.push(ndata)
    user.comments = datas;
    user.save();
    res.status(201).json({ msg: "ok" });
  } catch (error) {
    // console.log(error)
    res.status(401).json({ msg: "An Error Occurred" })
  }
}
exports.getallpostdata = async (req, res) => {
  try {
    const { id } = req.body;
    var data = await Post.findById(id);
    return res.status(200).json({ msg: data })
  } catch (error) {
    return res.status(400).json({ msg: "error" });
  }
}
exports.getarticle = async (req, res) => {
  try {
    const { id } = req.body;
    var data = await Post.findById(id);
    if (!data) {
      return res.status(404).json({ msg: "!article" });
    }
    const user = await User.findById(data.user).select("name picture about");
    if (!user) {
      return res.status(404).json({ msg: "!user" });
    }
    data.user = user;
    return res.status(200).json({ msg: data })
  } catch (error) {
    // console.log(error);
    return res.status(400).json({ msg: "error" });
  }
}
exports.getcomment = async (req, res) => {
  try {
    const { id } = req.body;
    const data = await Post.findOne({ user: id });
    const user = data.comments
    // console.log(user);
    res.status(201).json(user);
  } catch (error) {
    // console.log(error)
    res.status(400).json({ msg: "error" })
  }
}
exports.allPost = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const cat = req.body.mpost;
    if (!cat || cat == "" || cat == "all") {
      const skip = (page - 1) * size;
      const total = await Post.countDocuments();
      const posts = await Post.find().skip(skip).limit(size);
      await Promise.all(
        posts.map((post) => post.populate("user", "name picture about"))
      );

      res.status(201).send({
        posts,
        total,
        page,
        size,
      });
    }
    else {
      const skip = (page - 1) * size;
      const posts = await Post.find({ category: cat }).skip(skip).limit(size);
      const total = posts.length;
      await Promise.all(
        posts.map((post) => post.populate("user", "name picture about"))
      );

      res.status(201).send({
        posts,
        total,
        page,
        size,
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json(error);
  }
};
