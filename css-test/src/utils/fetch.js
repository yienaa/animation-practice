export function fetchJson(url) {
  return fetch(url)
    .then((response) => response.json())
    .catch(function (err) {
      console.log('Failed to fetch page: ', err);
    });
}

export function fetchHtml(url) {
  return fetch(url)
    .then((response) => response.text())
    .then((html) => {
      // const parser = new DOMParser();
      // return parser.parseFromString(html, "text/html");
      return html;
    })
    .catch(function (err) {
      console.log('Failed to fetch page: ', err);
    });
}

