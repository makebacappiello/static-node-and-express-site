# Portfolio Site

A portfolio website built with Node.js, Express, and Pug. It shows five of my projects, an about page, and custom error pages.

## How to run it

1. Run `npm install`
2. Run `npm start`
3. Open http://localhost:3000

## Style customizations (Exceeds Expectations)

All changes are in `public/css/styles.css`.

1. **Background color:** the sidebar background changed from black to deep purple (`#4a1d6b`) to match my profile photo.
2. **Box shadow:** every project thumbnail on the home page has a soft shadow.
3. **Transition and animation:** when you hover over a project thumbnail, it grows slightly and its shadow gets deeper, with a smooth 0.3 second transition.

I also made the home page thumbnails square (`aspect-ratio` and `object-fit`) so the project grid lines up in even rows.

## Other extras

- `npm start` runs the app.
- Custom `error.pug` and `page-not-found.pug` templates show the error's status and message.
