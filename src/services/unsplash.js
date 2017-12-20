const API = "//api.unsplash.com";

const API_GET_RANDOM_PHOTE = `${API}/photos/random`;
const API_SEARCH_PHOTES = `${API}/search/photos`;

const APPLICATION_ID =
  "d0b680e42627de69470fae7d01faf8449209869d6799198920c6ea90e1fccb92";

const headers = new Headers({
  Authorization: `Client-ID ${APPLICATION_ID}`
});

export async function getRandomPhoto() {
  try {
    const res = await fetch(API_GET_RANDOM_PHOTE, { headers });
    const json = await res.json();
    const regularUrl = json.urls.regular;

    return regularUrl;
  } catch (e) {
    throw e;
  }
}

export async function searchPhoto(query = "she") {
  try {
    const res = await fetch(`${API_SEARCH_PHOTES}?query=${query}&per_page=1`, {
      headers
    });
    const json = await res.json();
    const regularUrl = json.results[0].urls.regular;

    return regularUrl;
  } catch (e) {
    throw e;
  }
}
