import navbarFun from "./components/navbar.js";
let navbar = document.getElementById("navbar");
navbar.innerHTML = navbarFun();

console.log("navbar print");

// append the data to dom -------------

const get_post_data = async () => {
  const res = await fetch("http://localhost:3000/posts");
  const data = await res.json();
  console.log(data, "getting posted data");

  data.forEach((element) => {
    let our_post = document.getElementById("our-post");

    const post = document.createElement("div");
    const img = document.createElement("img");
    const caption = document.createElement("p");

    img.src = element.img_url;
    caption.innerText = element.caption;
    post.append(img, caption);
    our_post.append(post);
  });
};

get_post_data();
