if (document.getElementById('flash')) {
    let b = document.getElementById('close-flash')
    b.addEventListener("click", () => {
        document.getElementById('flash').style.display = 'none';
    })
}

// Generate featured post card and append it to a selector
createFeatured = (selector, id, post, hue) => {
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.backgroundImage = `url(/static/uploads/${id}/${post.cover})`;
    
    let container = document.createElement("div");
    container.setAttribute("class", "card-content");
    container.style.backgroundColor = `hsl(${hue}, 67%, 82%)`;

    let title = document.createElement("h2");
    title.append(document.createTextNode(post.title));

    let desc = document.createElement("p");
    desc.append(document.createTextNode(post.desc));

    container.appendChild(title);
    container.appendChild(desc);

    let ref = document.createElement("a");
    ref.setAttribute("href", `/posts/${id}`);
    ref.appendChild(container);

    card.appendChild(ref);

    selector.appendChild(card);
}

// Generate general post card and append it to a selector
createPost = (selector, id, post) => {
    let hue = Math.floor(Math.random() * 360);
    
    let card = document.createElement("div");
    card.setAttribute("class", "post");

    let cover = document.createElement("div");
    cover.setAttribute("class", "cover");
    cover.style.backgroundImage = `url(/static/uploads/${id}/${post.cover})`;
    cover.style.border = `solid 2px hsl(${hue}, 67%, 82%)`;
    card.appendChild(cover);

    let title = document.createElement("h2");
    title.append(document.createTextNode(post.title));
    title.style.color = `hsl(${hue}, 67%, 82%)`;
    card.appendChild(title);

    let ref = document.createElement("a");
    ref.setAttribute("href", `/posts/${id}`);
    ref.appendChild(card);

    selector.appendChild(ref);
}

// Get posts from API and generate views
async function fetchPosts() {
    let metaData = document.querySelector('meta[name="posts"]');
    let featuredSize = Number(metaData.getAttribute('featured'));
    let postSize = Number(metaData.getAttribute('posts'));
    
    var featured = document.getElementById('featured');
    var posts = document.getElementById('posts');
    
    let hue = Math.floor(Math.random() * 360)

    for (let i = postSize; i > postSize - featuredSize; i--) {
        await fetch(`/api/v1/post/${i}`)
            .then(response => response.json())
            .then(post => {
                createFeatured(featured, i, post, hue);
            })
        hue += 80;
    }

    for (let i = postSize - featuredSize; i > 0; i--) {
        await fetch(`/api/v1/post/${i}`)
            .then(response => response.json())
            .then(post => {
                createPost(posts, i, post);
            })
    }
}
    
    fetchPosts();



