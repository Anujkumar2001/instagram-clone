import navbarFun from "../components/navbar.js";
let navbar = document.getElementById("navbar");

navbar.innerHTML = navbarFun();

// create post btn --------------------------------------------

let createButton = document.getElementById("createButton");
createButton.disabled = true;
createButton.onclick = () => {
  createPost();
};

// <---------------------- sendig image to imgbb-------------------------------------->

let image = document.getElementById("image");
let img_url;

image.onchange = async () => {
  console.log("hadleImage");
  let img = document.getElementById("image");
  let actual_data = img.files[0];

  let form = new FormData();
  form.append("image", actual_data);

  let res = await fetch(
    `https://api.imgbb.com/1/upload?key=40a2b5ecd2c404123827c717465737df`,
    {
      method: "POST",
      body: form,
    }
  );
  let data = await res.json();
  img_url = data.data.display_url;
  console.log(img_url, "image came from the server");
  createButton.disabled = false;
};

const createPost = async () => {
  console.log(img_url);
  let id = document.getElementById("id").value;
  let caption = document.getElementById("caption").value;

  let send_data = {
    id,
    caption,
    img_url,
  };

  let res = await fetch("http://localhost:3000/posts", {
    method: "POST",
    body: JSON.stringify(send_data),
    headers: {
      "content-type": "application/json",
    },
  });

  let data = await res.json();
  console.log(data, "this is our which i have post on the instagram");
  document.getElementById("our-post").innerHTML = "";
  get_post_data();
};

// deleterting post secton ----------

const del_post_btn = document.getElementById("del_post_btn");

del_post_btn.onclick = () => {
  delete_post_fun();
};

const delete_post_fun = async () => {
  const post_id = document.getElementById("post_id").value;
  const res = await fetch(`http://localhost:3000/posts/${post_id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
  });
};

// update post logic -----------
const update_btn = document.getElementById("update_btn");

update_btn.onclick = () => {
  update_post_fun();
};

const update_post_fun = async () => {
  const update_post_id = document.getElementById("update_post_id").value;
  const update_caption = document.getElementById("update_caption").value;

  const update_data = {
    caption: update_caption,
  };

  console.log(update_post_id);
  const res = await fetch(`http://localhost:3000/posts/${update_post_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", // Set the appropriate content type
      // You may need to include additional headers, such as authentication headers.
    },
    body: JSON.stringify(update_data), // Include the data you want to patch in the request body
  });
  const data = await res.json();
  console.log(data);
};
