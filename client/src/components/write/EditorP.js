import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import "./editor.css";
import { useSelector } from "react-redux";
import {
  createPost,
  dataURItoBlob,
  uplaodImages,
  editPost,
} from "../../helpers";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import dompurify from "dompurify";
import Footer from "../footer/Footer";

const EditpostP = ({ placeholder, prevdata, pflag, post }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const inputref = useRef(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [image, setimage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [cimage, setcimage] = useState(false);
  const [mflag, setmflag] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const categories = ["Tech", "Lifestyle", "Food", "Travelling"];
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [error]);

  useEffect(() => {
    if (post.user._id == user.id && pflag) {
      setmflag(true);
      setContent(post.content);
      setTitle(post.title);
      setDescription(post.description);
      setCategory(post.category);
      setimage(post.image);
    } else {
      navigate("/createpost");
    }
  }, []);

  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: placeholder || "",
      sanitize: dompurify.sanitize,
      extraStyles: `img {max-width: 100%}`,
    };
  }, [placeholder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSelect = (e) => {
    setCategory(e.target.value);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];

    if (file.size > 1024 * 1024) {
      setError(`${file.name} size is too large max 1mb allowed.`);
      return;
    }

    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.src = readerEvent.target.result;

      img.onload = function () {
        if (this.naturalWidth < 1000 || this.naturalHeight < 600) {
          setError(
            "Image resolution is too low, please select an image with a resolution of at least 1000x600."
          );
        } else {
          setimage(readerEvent.target.result);
          setError("");
        }
      };
    };
    setcimage(true);

    reader.readAsDataURL(file);
  };
  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      if (!title || !description || !content || !category || !image) {
        setError("All field are required with image of your post !");
        return;
      } else {
        setError("");
      }
      if (title.length < 10 || title.length > 90) {
        setError("Title must be between 10 to 90 characters !");
        return;
      } else {
        setError("");
      }
      if (description.length < 50 || description.length > 120) {
        setError("Description must be between 50 to 100 characters !");
        return;
      } else {
        setError("");
      }
      if (cimage) {
        setLoading(true);
        const path = `${user.name}/blog_images`;
        const img = dataURItoBlob(image);
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        const postImg = await uplaodImages(formData, user?.token);
      }
      const cleanHtml = dompurify.sanitize(content, { FORCE_BODY: true });
      // const cleanHtml = dompurify.sanitize(post.content, { FORCE_BODY: true });
      const posted = await editPost(
        title,
        description,
        image,
        category,
        user.id,
        user?.token,
        cleanHtml,
        post._id
      );
      if (posted) {
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      // console.log(error)
      // setError(error.response.data.message);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!title || !description || !content || !category || !image) {
        setError("All field are required with image of your post !");
        return;
      } else {
        setError("");
      }
      if (title.length < 10 || title.length > 90) {
        setError("Title must be between 10 to 90 characters !");
        return;
      } else {
        setError("");
      }
      if (description.length < 50 || description.length > 120) {
        setError("Description must be between 50 to 100 characters !");
        return;
      } else {
        setError("");
      }

      if (image !== "") {
        setLoading(true);
        const img = dataURItoBlob(image);
        const path = `${user.name}/blog_images`;
        let formData = new FormData();
        formData.append("path", path);
        formData.append("file", img);
        const postImg = await uplaodImages(formData, user?.token);
        const cleanHtml = dompurify.sanitize(content, { FORCE_BODY: true });
        // const cleanHtml = dompurify.sanitize(post.content, { FORCE_BODY: true });
        const post = await createPost(
          title,
          description,
          postImg[0].url,
          category,
          user.id,
          user?.token,
          cleanHtml
        );
        if (post) {
          // navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    // <>

    // </>

    <div className="editor_wrap">
      <div className="editor">
        <div className="form">
          <form method="post" encType="multipart/form-data">
            <div className="selectedImg">
              {image && <img src={image ? image : ""} alt="" />}
            </div>
            <p
              className="photoButton"
              onClick={() => {
                inputref.current.click();
              }}
            >
              Upload an Image
            </p>
            <input
              type="file"
              accept="image/*"
              hidden
              ref={inputref}
              onChange={handleImage}
            />
            <label htmlFor="title">Enter Title of Your Article</label>
            <input
              type="text"
              id="title"
              value={title}
              name="title"
              onChange={handleChange}
            />
            <label htmlFor="description">
              Enter Description of Your Article
            </label>
            <input
              type="text"
              id="description"
              value={description}
              name="description"
              onChange={handleChange}
            />
            <label htmlFor="category">Choose a category</label>
            <input
              type="text"
              placeholder="Search category..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <select id="category" value={category} onChange={handleSelect}>
              {filteredCategories.map((category, index) => (
                <option key={index} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
            <div className="editor_main">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => {
                  setContent(newContent);
                }}
              />
            </div>
            {error && (
              <div className="errorPopup" ref={scroll}>
                <span>{error}</span>
              </div>
            )}
            {!pflag ? (
              <>
                <button
                  type="submit"
                  value="submit"
                  disabled={loading}
                  onClick={handleSubmit}
                  className="btnsubt"
                >
                  {loading ? <PulseLoader color="#000" size={5} /> : "Submit"}
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  value="submit"
                  disabled={loading}
                  onClick={handleEdit}
                  className="btnsubt"
                >
                  {loading ? <PulseLoader color="#000" size={5} /> : "Edit"}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditpostP;
